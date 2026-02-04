import { NextRequest, NextResponse } from 'next/server'
import { supabase, type WalletToken, type MoralisToken } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, tokens } = await request.json()

    if (!walletAddress || !tokens || !Array.isArray(tokens)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    // 转换 Moralis 代币数据为 Supabase 格式
    const walletTokens: Omit<WalletToken, 'id' | 'created_at' | 'updated_at'>[] = tokens.map((token: MoralisToken) => ({
      wallet_address: walletAddress.toLowerCase(),
      token_address: token.token_address.toLowerCase(),
      symbol: token.symbol,
      name: token.name,
      logo: token.logo,
      thumbnail: token.thumbnail,
      decimals: token.decimals,
      balance: token.balance,
      balance_formatted: token.balance_formatted,
      total_supply: token.total_supply,
      total_supply_formatted: token.total_supply_formatted,
      percentage_relative_to_total_supply: token.percentage_relative_to_total_supply,
      usd_price: token.usd_price,
      usd_price_24hr_percent_change: token.usd_price_24hr_percent_change,
      usd_price_24hr_usd_change: token.usd_price_24hr_usd_change,
      usd_value: token.usd_value,
      usd_value_24hr_usd_change: token.usd_value_24hr_usd_change,
      possible_spam: token.possible_spam,
      verified_contract: token.verified_contract,
      security_score: token.security_score,
      native_token: token.native_token,
      portfolio_percentage: token.portfolio_percentage,
      authorized: false, // 用户未授权连接
    }))

    // 步骤 1: 查询当前钱包下已存在的代币地址
    console.log('Checking existing tokens for wallet:', walletAddress.toLowerCase())
    const { data: existingTokens, error: queryError } = await supabase
      .from('wallet_tokens')
      .select('token_address')
      .eq('wallet_address', walletAddress.toLowerCase())

    if (queryError) {
      console.error('Supabase query error:', queryError)
      return NextResponse.json(
        { error: 'Failed to query existing tokens', details: queryError },
        { status: 500 }
      )
    }

    // 步骤 2: 创建已存在代币地址的 Set，用于快速查找
    const existingTokenAddresses = new Set(
      existingTokens?.map(t => t.token_address.toLowerCase()) || []
    )
    console.log(`Found ${existingTokenAddresses.size} existing token(s)`)

    // 步骤 3: 过滤掉已存在的代币和没有 logo 的代币（山寨币）
    const newTokens = walletTokens.filter(token => {
      const exists = existingTokenAddresses.has(token.token_address.toLowerCase())
      const hasLogo = token.logo && token.logo.trim() !== ''
      
      if (exists) {
        console.log(`❌ Skipping existing token: ${token.symbol || token.token_address}`)
      }
      if (!hasLogo) {
        console.log(`❌ Skipping token without logo (scam): ${token.symbol || token.token_address}`)
      }
      
      return !exists && hasLogo
    })

    const skippedCount = walletTokens.length - newTokens.length
    console.log(`✅ Filtered: ${newTokens.length} new token(s) to insert (${skippedCount} skipped - duplicates or no logo)`)

    // 步骤 4: 如果有新代币，批量插入
    if (newTokens.length > 0) {
      const { data, error } = await supabase
        .from('wallet_tokens')
        .insert(newTokens)
        .select()

      if (error) {
        console.error('Supabase insert error:', error)
        return NextResponse.json(
          { error: 'Failed to insert new tokens', details: error },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: `Successfully inserted ${newTokens.length} new token(s), skipped ${walletTokens.length - newTokens.length} existing token(s)`,
        inserted: newTokens.length,
        skipped: walletTokens.length - newTokens.length,
        total: walletTokens.length,
        data: data,
      })
    } else {
      // 所有代币都已存在，不需要插入
      return NextResponse.json({
        success: true,
        message: 'All tokens already exist, no new tokens inserted',
        inserted: 0,
        skipped: walletTokens.length,
        total: walletTokens.length,
        data: [],
      })
    }

  } catch (error) {
    console.error('Error in Supabase save route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

// 获取钱包的代币列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('wallet_tokens')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .order('usd_value', { ascending: false })

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tokens from database', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      data: data || [],
    })

  } catch (error) {
    console.error('Error in Supabase get route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
