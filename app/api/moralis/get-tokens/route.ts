import { NextRequest, NextResponse } from 'next/server'

const MORALIS_API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY!
const MORALIS_BASE_URL = 'https://deep-index.moralis.io/api/v2.2'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // 验证钱包地址格式
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      )
    }

    // 调用 Moralis API
    const url = `${MORALIS_BASE_URL}/wallets/${walletAddress}/tokens?chain=bsc&exclude_native=true&limit=100`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': MORALIS_API_KEY,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Moralis API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to fetch tokens from Moralis', details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data: data,
    })

  } catch (error) {
    console.error('Error in Moralis API route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
