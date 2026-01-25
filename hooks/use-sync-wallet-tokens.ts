import { useState, useCallback } from 'react'
import { useAccount } from 'wagmi'

export interface SyncStatus {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
  tokenCount: number | null
}

export function useSyncWalletTokens() {
  const { address, isConnected } = useAccount()
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    tokenCount: null,
  })

  const syncTokens = useCallback(async () => {
    if (!address || !isConnected) {
      setSyncStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: 'Wallet not connected',
        tokenCount: null,
      })
      return
    }

    setSyncStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      tokenCount: null,
    })

    try {
      // 步骤 1: 从 Moralis 获取代币数据
      console.log('Fetching tokens from Moralis for address:', address)
      const moralisResponse = await fetch('/api/moralis/get-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: address }),
      })

      if (!moralisResponse.ok) {
        const errorData = await moralisResponse.json()
        throw new Error(errorData.error || 'Failed to fetch tokens from Moralis')
      }

      const moralisData = await moralisResponse.json()
      const tokens = moralisData.data.result || []

      console.log(`Fetched ${tokens.length} tokens from Moralis`)

      if (tokens.length === 0) {
        setSyncStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: null,
          tokenCount: 0,
        })
        return
      }

      // 步骤 2: 保存到 Supabase
      console.log('Saving tokens to Supabase...')
      const supabaseResponse = await fetch('/api/supabase/save-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          tokens: tokens,
        }),
      })

      if (!supabaseResponse.ok) {
        const errorData = await supabaseResponse.json()
        throw new Error(errorData.error || 'Failed to save tokens to database')
      }

      const supabaseData = await supabaseResponse.json()
      console.log('Tokens saved successfully:', supabaseData)

      setSyncStatus({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        tokenCount: tokens.length,
      })

    } catch (error) {
      console.error('Error syncing tokens:', error)
      setSyncStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        tokenCount: null,
      })
    }
  }, [address, isConnected])

  const resetStatus = useCallback(() => {
    setSyncStatus({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      tokenCount: null,
    })
  }, [])

  return {
    syncTokens,
    resetStatus,
    syncStatus,
    address,
    isConnected,
  }
}
