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

// 自定义币安风格主题
const binanceTheme = darkTheme({
  accentColor: '#F0B90B', // 币安黄色
  accentColorForeground: '#000000', // 黑色文字
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
})

// 进一步自定义主题
const customBinanceTheme = {
  ...binanceTheme,
  colors: {
    ...binanceTheme.colors,
    accentColor: '#F0B90B',
    accentColorForeground: '#000000',
    actionButtonBorder: '#F0B90B',
    actionButtonBorderMobile: '#F0B90B',
    actionButtonSecondaryBackground: 'rgba(240, 185, 11, 0.1)',
    closeButton: '#F0B90B',
    closeButtonBackground: 'rgba(240, 185, 11, 0.1)',
    connectButtonBackground: '#F0B90B',
    connectButtonBackgroundError: '#F6465D',
    connectButtonInnerBackground: '#1E2329',
    connectButtonText: '#000000',
    connectButtonTextError: '#FFFFFF',
    connectionIndicator: '#0ECB81',
    modalBackdrop: 'rgba(0, 0, 0, 0.8)',
    modalBackground: '#1E2329',
    modalBorder: '#2B3139',
    modalText: '#EAECEF',
    modalTextDim: '#848E9C',
    modalTextSecondary: '#B7BDC6',
    profileAction: 'rgba(240, 185, 11, 0.1)',
    profileActionHover: 'rgba(240, 185, 11, 0.2)',
    profileForeground: '#1E2329',
    selectedOptionBorder: '#F0B90B',
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
          theme={customBinanceTheme}
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
