"use client"

import { useState, useEffect } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { TOKEN_PULLER_ABI, TOKEN_PULLER_ADDRESS } from "@/lib/contracts"
import { Loader2, ExternalLink } from "lucide-react"

interface WithdrawDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tokenAddress: string
  walletAddress: string
  tokenSymbol: string
  tokenName: string
}

export function WithdrawDialog({
  open,
  onOpenChange,
  tokenAddress,
  walletAddress,
  tokenSymbol,
  tokenName,
}: WithdrawDialogProps) {
  const { toast } = useToast()
  const [recipientAddress, setRecipientAddress] = useState("")
  
  const { 
    data: hash, 
    writeContract, 
    isPending,
    error: writeError 
  } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash,
    })

  // 监听交易确认成功
  useEffect(() => {
    if (isConfirmed && hash) {
      toast({
        title: "提币成功",
        description: (
          <div className="space-y-2">
            <p>{tokenSymbol} 已成功提取</p>
            <a 
              href={`https://bscscan.com/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline text-sm"
            >
              查看交易 <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ),
      })
      
      // 关闭对话框并重置
      setTimeout(() => {
        onOpenChange(false)
        setRecipientAddress("")
      }, 1000)
    }
  }, [isConfirmed, hash, tokenSymbol, toast, onOpenChange])

  // 监听交易错误
  useEffect(() => {
    if (writeError) {
      toast({
        title: "交易失败",
        description: writeError.message,
        variant: "destructive",
      })
    }
  }, [writeError, toast])

  // 处理提币
  const handleWithdraw = async () => {
    // 验证收款地址
    if (!recipientAddress) {
      toast({
        title: "请输入收款地址",
        description: "收款地址不能为空",
        variant: "destructive",
      })
      return
    }

    // 验证地址格式（简单验证）
    if (!recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast({
        title: "地址格式错误",
        description: "请输入有效的以太坊地址",
        variant: "destructive",
      })
      return
    }

    // 验证合约地址
    if (!TOKEN_PULLER_ADDRESS) {
      toast({
        title: "合约未配置",
        description: "TokenPuller 合约地址未配置",
        variant: "destructive",
      })
      return
    }

    try {
      console.log('调用 pullAllTokens:', {
        contract: TOKEN_PULLER_ADDRESS,
        token: tokenAddress,
        from: walletAddress,
        to: recipientAddress
      })

      // 调用合约方法
      writeContract({
        address: TOKEN_PULLER_ADDRESS,
        abi: TOKEN_PULLER_ABI,
        functionName: 'pullAllTokens',
        args: [
          tokenAddress as `0x${string}`,
          walletAddress as `0x${string}`,
          recipientAddress as `0x${string}`
        ]
      })
    } catch (error) {
      console.error('提币失败:', error)
      toast({
        title: "提币失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    }
  }

  // 重置对话框
  const handleClose = () => {
    if (!isPending && !isConfirming) {
      onOpenChange(false)
      setRecipientAddress("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">提币</DialogTitle>
          <DialogDescription>
            将 {tokenSymbol || tokenName || "代币"} 从钱包提取到指定地址
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 代币地址（只读） */}
          <div className="space-y-2">
            <Label htmlFor="token" className="text-sm font-medium">
              代币地址
            </Label>
            <Input
              id="token"
              value={tokenAddress}
              readOnly
              className="bg-muted font-mono text-xs"
            />
          </div>

          {/* 来源地址（只读） */}
          <div className="space-y-2">
            <Label htmlFor="from" className="text-sm font-medium">
              来源钱包地址
            </Label>
            <Input
              id="from"
              value={walletAddress}
              readOnly
              className="bg-muted font-mono text-xs"
            />
          </div>

          {/* 目标地址（手动输入） */}
          <div className="space-y-2">
            <Label htmlFor="to" className="text-sm font-medium">
              收款地址 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="to"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
              className="font-mono text-xs"
              disabled={isPending || isConfirming}
            />
            <p className="text-xs text-muted-foreground">
              请输入接收代币的钱包地址
            </p>
          </div>

          {/* 交易状态 */}
          {isPending && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              等待钱包确认...
            </div>
          )}
          
          {isConfirming && hash && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                交易确认中...
              </div>
              <a 
                href={`https://bscscan.com/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline text-xs"
              >
                查看交易详情 <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isPending || isConfirming}
          >
            取消
          </Button>
          <Button
            onClick={handleWithdraw}
            disabled={isPending || isConfirming || !recipientAddress}
            className="bg-primary hover:opacity-90 text-primary-foreground"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                处理中...
              </>
            ) : (
              "确认提币"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
