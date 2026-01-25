import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // 获取筛选参数
    const wallet_address = searchParams.get('wallet_address')
    const token_address = searchParams.get('token_address')
    const authorized = searchParams.get('authorized') // 'all' | 'true' | 'false'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // 构建查询
    let query = supabase
      .from('wallet_tokens')
      .select('*', { count: 'exact' })

    // 钱包地址筛选（模糊搜索）
    if (wallet_address && wallet_address.trim()) {
      query = query.ilike('wallet_address', `%${wallet_address.trim()}%`)
    }

    // 代币地址筛选（模糊搜索）
    if (token_address && token_address.trim()) {
      query = query.ilike('token_address', `%${token_address.trim()}%`)
    }

    // 授权状态筛选
    if (authorized && authorized !== 'all') {
      query = query.eq('authorized', authorized === 'true')
    }

    // 排序：按 usd_value 从大到小
    query = query.order('usd_value', { ascending: false, nullsFirst: false })

    // 分页
    const start = (page - 1) * limit
    const end = start + limit - 1
    query = query.range(start, end)

    // 执行查询
    const { data, count, error } = await query

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tokens', details: error },
        { status: 500 }
      )
    }

    const totalPages = count ? Math.ceil(count / limit) : 0

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages,
    })

  } catch (error) {
    console.error('Error in admin get-tokens route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
