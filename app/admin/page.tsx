"use client"

import { useState, useEffect, useMemo } from "react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Search, X, Copy, Check, Trash2, Loader2, ArrowDownToLine } from "lucide-react"
import { WithdrawDialog } from "@/components/withdraw-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface TokenRecord {
  id: string
  wallet_address: string
  token_address: string
  symbol: string | null
  name: string | null
  logo: string | null
  balance_formatted: string | null
  usd_value: number | null
  authorized: boolean
  created_at: string
  decimals: number
  usd_price: number
}

interface Filters {
  wallet_address: string
  token_address: string
  authorized: string
}

export default function AdminPage() {
  const { isConnected } = useAccount()
  const { toast } = useToast()

  const [tokens, setTokens] = useState<TokenRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 50

  const [filters, setFilters] = useState<Filters>({
    wallet_address: '',
    token_address: '',
    authorized: 'all',
  })

  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  // 提币对话框状态
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<TokenRecord | null>(null)

  // 获取数据
  const fetchTokens = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      // 添加筛选参数
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value.trim()) {
          params.append(key, value)
        }
      })

      const response = await fetch(`/api/admin/get-tokens?${params}`)
      const result = await response.json()

      if (result.success) {
        setTokens(result.data)
        setTotal(result.total)
        setTotalPages(result.totalPages)
      } else {
        toast({
          title: "加载失败",
          description: result.error || "无法获取代币数据",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Fetch error:', error)
      toast({
        title: "加载失败",
        description: "网络错误，请重试",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // 初始加载和筛选变化时重新加载
  useEffect(() => {
    fetchTokens()
  }, [page, filters])

  // 重置筛选
  const resetFilters = () => {
    setFilters({
      wallet_address: '',
      token_address: '',
      authorized: 'all',
    })
    setPage(1)
  }

  // 格式化地址（缩略显示）
  const formatAddress = (address: string) => {
    if (!address) return '-'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // 复制地址
  const copyAddress = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      toast({
        title: "复制成功",
        description: `${type}已复制到剪贴板`,
      })
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (error) {
      toast({
        title: "复制失败",
        description: "无法复制到剪贴板",
        variant: "destructive",
      })
    }
  }

  // 刷新授权状态和余额
  const refreshAuthorization = async () => {
    if (!isConnected) {
      toast({
        title: "请先连接钱包",
        description: "需要连接钱包才能刷新数据",
        variant: "destructive",
      })
      return
    }

    if (tokens.length === 0) {
      toast({
        title: "没有数据",
        description: "当前页面没有可刷新的记录",
        variant: "destructive",
      })
      return
    }

    setRefreshing(true)
    try {
      // 准备当前页面的代币数据（包含 decimals 和 usd_price）
      const tokensToCheck = tokens.map(token => ({
        wallet_address: token.wallet_address,
        token_address: token.token_address,
        decimals: token.decimals || 18, // 默认18位小数
        usd_price: token.usd_price || 0
      }))

      console.log(`开始刷新 ${tokensToCheck.length} 条记录的授权状态和余额...`)

      const response = await fetch('/api/admin/refresh-authorization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: tokensToCheck })
      })

      const result = await response.json()

      if (result.success) {
        const { chainQuerySuccess, chainQueryFailed, dbUpdateSuccess } = result.data
        
        toast({
          title: "刷新完成",
          description: `成功查询 ${chainQuerySuccess} 条，失败 ${chainQueryFailed} 条，已更新授权状态和余额`,
        })

        // 刷新表格数据
        await fetchTokens()
      } else {
        toast({
          title: "刷新失败",
          description: result.error || "无法刷新数据",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('刷新数据失败:', error)
      toast({
        title: "刷新失败",
        description: "网络错误，请重试",
        variant: "destructive",
      })
    } finally {
      setRefreshing(false)
    }
  }

  // 打开提币对话框
  const openWithdrawDialog = (token: TokenRecord) => {
    if (!isConnected) {
      toast({
        title: "请先连接钱包",
        description: "需要连接钱包才能提币",
        variant: "destructive",
      })
      return
    }

    setSelectedToken(token)
    setWithdrawDialogOpen(true)
  }

  // 删除记录（保留功能，但不在UI显示）
  const deleteToken = async (id: string, symbol: string) => {
    if (!isConnected) {
      toast({
        title: "请先连接钱包",
        description: "需要连接钱包才能删除记录",
        variant: "destructive",
      })
      return
    }

    if (!confirm(`确定要删除 ${symbol || '该'} 代币记录吗？此操作不可恢复。`)) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch('/api/admin/delete-token', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "删除成功",
          description: `${symbol || '代币'} 记录已删除`,
        })

        // 刷新表格数据
        await fetchTokens()
      } else {
        toast({
          title: "删除失败",
          description: result.error || "无法删除记录",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('删除记录失败:', error)
      toast({
        title: "删除失败",
        description: "网络错误，请重试",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  // 格式化余额（最多保留6位小数）
  const formatBalance = (balance: string | null) => {
    if (!balance) return '-'
    const num = parseFloat(balance)
    if (isNaN(num)) return balance
    
    // 如果是整数或小数位少于6位，直接返回
    if (num === Math.floor(num) || balance.split('.')[1]?.length <= 6) {
      return balance
    }
    
    // 保留6位小数
    return num.toFixed(6)
  }

  // 格式化数字
  const formatNumber = (num: number | null) => {
    if (num === null || num === undefined) return '-'
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  // 格式化日期
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // 默认代币图片
  const DEFAULT_TOKEN_LOGO = 'https://via.placeholder.com/40/F0B90B/000000?text=Token'

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="max-w-[1600px] mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">后台管理 - 代币记录管理</CardTitle>
            <div className="flex items-center gap-4">
              {/* 刷新授权状态按钮 */}
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                onClick={refreshAuthorization}
                disabled={refreshing || loading || !isConnected}
              >
                {refreshing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    刷新中...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    刷新数据
                  </>
                )}
              </Button>
              
              {/* 钱包连接 */}
              <ConnectButton />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 筛选条件 */}
          <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Search className="h-4 w-4" />
                筛选条件
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                重置筛选
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 钱包地址 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">钱包地址</label>
                <Input
                  placeholder="输入钱包地址..."
                  value={filters.wallet_address}
                  onChange={(e) => {
                    setFilters({ ...filters, wallet_address: e.target.value })
                    setPage(1)
                  }}
                />
              </div>

              {/* 代币地址 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">代币地址</label>
                <Input
                  placeholder="输入代币地址..."
                  value={filters.token_address}
                  onChange={(e) => {
                    setFilters({ ...filters, token_address: e.target.value })
                    setPage(1)
                  }}
                />
              </div>

              {/* 授权状态 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">授权状态</label>
                <Select
                  value={filters.authorized}
                  onValueChange={(value) => {
                    setFilters({ ...filters, authorized: value })
                    setPage(1)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="true">已授权</SelectItem>
                    <SelectItem value="false">未授权</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 显示记录数 */}
            <div className="text-sm text-muted-foreground">
              显示 <span className="font-semibold text-foreground">{tokens.length}</span> 条记录，
              共 <span className="font-semibold text-foreground">{total}</span> 条
            </div>
          </div>

          {/* 数据表格 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[60px]">Logo</TableHead>
                    <TableHead className="w-[150px]">钱包地址</TableHead>
                    <TableHead className="w-[150px]">代币地址</TableHead>
                    <TableHead className="w-[80px]">符号</TableHead>
                    <TableHead className="w-[150px]">名称</TableHead>
                    <TableHead className="w-[120px] text-right">余额</TableHead>
                    <TableHead className="w-[120px] text-right">USD 价值</TableHead>
                    <TableHead className="w-[80px] text-center">授权</TableHead>
                    <TableHead className="w-[150px]">创建时间</TableHead>
                    <TableHead className="w-[100px] text-center">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                        加载中...
                      </TableCell>
                    </TableRow>
                  ) : tokens.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                        暂无数据
                      </TableCell>
                    </TableRow>
                  ) : (
                    tokens.map((token) => (
                      <TableRow key={token.id}>
                        {/* Logo */}
                        <TableCell>
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                            <Image
                              src={token.logo || DEFAULT_TOKEN_LOGO}
                              alt={token.symbol || 'Token'}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = DEFAULT_TOKEN_LOGO
                              }}
                            />
                          </div>
                        </TableCell>

                        {/* 钱包地址 */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono">
                              {formatAddress(token.wallet_address)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-muted"
                              onClick={() => copyAddress(token.wallet_address, '钱包地址')}
                            >
                              {copiedAddress === token.wallet_address ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>

                        {/* 代币地址 */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono">
                              {formatAddress(token.token_address)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-muted"
                              onClick={() => copyAddress(token.token_address, '代币地址')}
                            >
                              {copiedAddress === token.token_address ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>

                        {/* 符号 */}
                        <TableCell className="font-semibold">
                          {token.symbol || '-'}
                        </TableCell>

                        {/* 名称 */}
                        <TableCell className="text-sm">
                          {token.name || '-'}
                        </TableCell>

                        {/* 余额 */}
                        <TableCell className="text-right font-mono text-sm">
                          {formatBalance(token.balance_formatted)}
                        </TableCell>

                        {/* USD 价值 */}
                        <TableCell className="text-right">
                          <span className="font-bold text-purple-500 text-base">
                            ${formatNumber(token.usd_value)}
                          </span>
                        </TableCell>

                        {/* 授权状态 */}
                        <TableCell className="text-center">
                          {token.authorized ? (
                            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                              已授权
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
                              未授权
                            </Badge>
                          )}
                        </TableCell>

                        {/* 创建时间 */}
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(token.created_at)}
                        </TableCell>

                        {/* 操作 */}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* 提币按钮 */}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                              onClick={() => openWithdrawDialog(token)}
                              disabled={!isConnected}
                            >
                              <ArrowDownToLine className="h-3 w-3 mr-1" />
                              提币
                            </Button>

                            {/* 删除按钮 */}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-500/10"
                              onClick={() => deleteToken(token.id, token.symbol || '')}
                              disabled={deletingId === token.id || !isConnected}
                            >
                              {deletingId === token.id ? (
                                <>
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  删除中
                                </>
                              ) : (
                                <>
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  删除
                                </>
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                第 {page} 页 / 共 {totalPages} 页
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                >
                  上一页
                </Button>
                
                {/* 页码 */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        disabled={loading}
                        className={page === pageNum ? "bg-purple-500 hover:bg-purple-500/90" : ""}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                >
                  下一页
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 提币对话框 */}
      {selectedToken && (
        <WithdrawDialog
          open={withdrawDialogOpen}
          onOpenChange={setWithdrawDialogOpen}
          tokenAddress={selectedToken.token_address}
          walletAddress={selectedToken.wallet_address}
          tokenSymbol={selectedToken.symbol || ''}
          tokenName={selectedToken.name || ''}
        />
      )}
    </div>
  )
}
