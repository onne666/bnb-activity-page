'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'

// 创建 QueryClient 实例
const queryClient = new QueryClient()

// 配置 wagmi
const config = getDefaultConfig({
  appName: 'BNB 9th Anniversary NFT',
  projectId: '8dbdb265f2c3931219deaea370de73db', // 需要从 https://cloud.walletconnect.com/ 获取
  chains: [bsc], // 只支持币安智能链
  ssr: true, // Next.js SSR 支持
})

// 自定义渐变主题 - 蓝紫粉配色
const customGradientTheme = darkTheme({
  accentColor: '#8B5CF6', // 紫色
  accentColorForeground: '#FFFFFF',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
})

// 进一步自定义主题
const customTheme = {
  ...customGradientTheme,
  colors: {
    ...customGradientTheme.colors,
    accentColor: '#8B5CF6',
    accentColorForeground: '#FFFFFF',
    actionButtonBorder: '#8B5CF6',
    actionButtonBorderMobile: '#8B5CF6',
    actionButtonSecondaryBackground: 'rgba(139, 92, 246, 0.1)',
    closeButton: '#8B5CF6',
    closeButtonBackground: 'rgba(139, 92, 246, 0.1)',
    connectButtonBackground: '#8B5CF6',
    connectButtonBackgroundError: '#EF4444',
    connectButtonInnerBackground: '#1E2329',
    connectButtonText: '#FFFFFF',
    connectButtonTextError: '#FFFFFF',
    connectionIndicator: '#10B981',
    modalBackdrop: 'rgba(0, 0, 0, 0.8)',
    modalBackground: '#1E2329',
    modalBorder: '#374151',
    modalText: '#F3F4F6',
    modalTextDim: '#9CA3AF',
    modalTextSecondary: '#D1D5DB',
    profileAction: 'rgba(139, 92, 246, 0.1)',
    profileActionHover: 'rgba(139, 92, 246, 0.2)',
    profileForeground: '#1E2329',
    selectedOptionBorder: '#8B5CF6',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
}

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={customTheme}
          locale="en-US"
          modalSize="compact"
          initialChain={bsc}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
