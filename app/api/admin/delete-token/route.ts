import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    // 验证输入
    if (!id) {
      return NextResponse.json(
        { success: false, error: '缺少记录 ID' },
        { status: 400 }
      )
    }

    console.log(`删除记录: ID=${id}`)

    // 从数据库删除记录
    const { data, error } = await supabase
      .from('wallet_tokens')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      console.error('删除记录失败:', error)
      return NextResponse.json(
        {
          success: false,
          error: '删除记录失败',
          details: error.message
        },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: '记录不存在或已被删除' },
        { status: 404 }
      )
    }

    console.log('记录删除成功:', data[0])

    return NextResponse.json({
      success: true,
      message: '记录已删除',
      data: data[0]
    })

  } catch (error) {
    console.error('删除记录失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '删除记录失败',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
