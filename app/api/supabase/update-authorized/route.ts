import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, tokenAddress } = await request.json()

    // 验证参数
    if (!walletAddress || !tokenAddress) {
      return NextResponse.json(
        { error: 'Wallet address and token address are required' },
        { status: 400 }
      )
    }

    console.log('Updating authorized status:', {
      walletAddress: walletAddress.toLowerCase(),
      tokenAddress: tokenAddress.toLowerCase(),
    })

    // 更新数据库：将 authorized 设置为 true
    const { data, error } = await supabase
      .from('wallet_tokens')
      .update({ authorized: true })
      .eq('wallet_address', walletAddress.toLowerCase())
      .eq('token_address', tokenAddress.toLowerCase())
      .select()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json(
        { error: 'Failed to update token authorization', details: error },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { 
          error: 'No token found to update',
          message: '未找到要更新的代币记录'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Token authorization updated successfully',
      data: data[0],
    })

  } catch (error) {
    console.error('Error in update-authorized route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
