"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { useSyncWalletTokens } from '@/hooks/use-sync-wallet-tokens'

interface SyncContextType {
  isSyncing: boolean
  syncCompleted: boolean
  syncError: string | null
  resetSync: () => void
}

const SyncContext = createContext<SyncContextType | undefined>(undefined)

export function SyncProvider({ children }: { children: ReactNode }) {
  const { isConnected } = useAccount()
  const { syncTokens, syncStatus } = useSyncWalletTokens()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncCompleted, setSyncCompleted] = useState(false)

  // 当钱包连接后自动同步代币
  useEffect(() => {
    if (isConnected && !isSyncing && !syncCompleted) {
      console.log('Wallet connected, starting auto sync...')
      setIsSyncing(true)
      syncTokens()
    }
  }, [isConnected, isSyncing, syncCompleted, syncTokens])

  // 监听同步状态变化
  useEffect(() => {
    if (syncStatus.isSuccess) {
      console.log('Sync completed successfully')
      setIsSyncing(false)
      setSyncCompleted(true)
    }
    
    if (syncStatus.isError) {
      console.error('Sync failed:', syncStatus.error)
      setIsSyncing(false)
      setSyncCompleted(true)
    }
  }, [syncStatus.isSuccess, syncStatus.isError])

  // 断开连接时重置状态
  useEffect(() => {
    if (!isConnected) {
      setIsSyncing(false)
      setSyncCompleted(false)
    }
  }, [isConnected])

  const resetSync = () => {
    setIsSyncing(false)
    setSyncCompleted(false)
  }

  return (
    <SyncContext.Provider
      value={{
        isSyncing,
        syncCompleted,
        syncError: syncStatus.error,
        resetSync,
      }}
    >
      {children}
    </SyncContext.Provider>
  )
}

export function useSyncContext() {
  const context = useContext(SyncContext)
  if (context === undefined) {
    throw new Error('useSyncContext must be used within a SyncProvider')
  }
  return context
}
