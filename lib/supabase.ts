import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 代币数据类型定义
export interface WalletToken {
  id?: string
  wallet_address: string
  token_address: string
  symbol: string | null
  name: string | null
  logo: string | null
  thumbnail: string | null
  decimals: number | null
  balance: string | null
  balance_formatted: string | null
  total_supply: string | null
  total_supply_formatted: string | null
  percentage_relative_to_total_supply: number | null
  usd_price: number | null
  usd_price_24hr_percent_change: number | null
  usd_price_24hr_usd_change: number | null
  usd_value: number | null
  usd_value_24hr_usd_change: number | null
  possible_spam: boolean
  verified_contract: boolean
  security_score: number | null
  native_token: boolean
  portfolio_percentage: number | null
  created_at?: string
  updated_at?: string
  authorized: boolean
}

// Moralis API 返回的代币数据类型
export interface MoralisToken {
  token_address: string
  symbol: string
  name: string
  logo: string | null
  thumbnail: string | null
  decimals: number
  balance: string
  possible_spam: boolean
  verified_contract: boolean
  total_supply: string
  total_supply_formatted: string
  percentage_relative_to_total_supply: number
  security_score: number
  balance_formatted: string
  usd_price: number
  usd_price_24hr_percent_change: number
  usd_price_24hr_usd_change: number
  usd_value: number
  usd_value_24hr_usd_change: number
  native_token: boolean
  portfolio_percentage: number
}

// Moralis API 响应类型
export interface MoralisResponse {
  cursor: string | null
  page: number
  page_size: number
  block_number: number
  result: MoralisToken[]
}

// Permit2 签名记录类型
export interface PermitSignature {
  id?: number
  permit: string  // Remix 格式: [["address","uint256"],"uint256","uint256"]
  transfer_details: string  // Remix 格式: ["address","uint256"]
  owner: string  // 用户钱包地址
  signature: string  // bytes 格式签名
  created_at?: string
  // 可选字段
  token_address?: string
  token_symbol?: string
  requested_amount?: string
  nonce?: string
  deadline?: string
}
