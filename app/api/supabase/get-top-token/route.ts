import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // 查询条件：wallet_address = 用户地址 AND authorized = false
    // 排序：usd_value DESC
    // 返回最高价值的一条
    const { data, error } = await supabase
      .from('wallet_tokens')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .eq('authorized', false)
      .order('usd_value', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      // 如果没有找到符合条件的记录
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { 
            error: 'No eligible tokens found',
            message: '未找到符合条件的代币（authorized = false）'
          },
          { status: 404 }
        )
      }
      
      console.error('Supabase query error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch token from database', details: error },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { 
          error: 'No tokens found',
          message: '未找到任何代币记录'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data,
    })

  } catch (error) {
    console.error('Error in get-top-token route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
