# 🎯 代币同步功能使用指南

## 功能概述

本项目实现了自动同步用户钱包代币到 Supabase 数据库的功能。当用户连接钱包后，系统会自动：

1. 调用 Moralis API 获取用户在 BSC 链上的所有代币
2. 将代币数据保存到 Supabase 数据库
3. 显示同步状态和结果通知

---

## 📋 前置准备

### 1. 创建 Supabase 数据表

**必须先执行此步骤！** 否则数据无法保存。

详细步骤请参考 `SUPABASE_SETUP.md` 文档。

**快速步骤：**

1. 登录 Supabase Dashboard: https://supabase.com/dashboard
2. 选择项目 `fuzmjhjuasnyoqosgtkb`
3. 打开 SQL Editor
4. 复制并执行 `supabase-schema.sql` 中的所有 SQL 代码
5. 验证 `wallet_tokens` 表已创建

### 2. 确认环境变量

确保 `.env.local` 文件存在并包含以下配置：

```env
# Moralis API
NEXT_PUBLIC_MORALIS_API_KEY=eyJhbGc...

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=8dbdb265...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://fuzmjhjuasnyoqosgtkb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. 重启开发服务器

环境变量配置后需要重启：

```bash
# 停止当前服务器 (Ctrl + C 或 Command + C)
npm run dev
```

---

## 🚀 使用流程

### 第一步：访问页面

```
http://localhost:3000
```

### 第二步：连接钱包

1. 点击页面右上角的 **"连接钱包"** 按钮
   - 或者滚动到兑换板块，点击 **"连接钱包"** 按钮

2. 在 RainbowKit 弹窗中选择你的钱包：
   - **MetaMask** (推荐)
   - **Trust Wallet**
   - **Binance Wallet**
   - 其他 WalletConnect 兼容钱包

3. 在钱包中授权连接

### 第三步：自动同步代币

**连接成功后，系统会自动触发代币同步：**

1. **加载状态**
   - 兑换按钮变为 **"同步代币中..."**
   - 显示加载动画（旋转图标）

2. **同步过程**
   ```
   前端 → Moralis API → 获取代币列表
          ↓
   前端 → Supabase API → 保存到数据库
   ```

3. **完成通知**
   - ✅ 成功：显示 **"代币同步成功"** 通知
   - ❌ 失败：显示 **"同步失败"** 错误提示

### 第四步：查看数据

#### 在 Supabase 中查看

1. 打开 Supabase Dashboard
2. 进入 **Table Editor**
3. 选择 `wallet_tokens` 表
4. 查看同步的代币数据

#### 数据示例

| wallet_address | token_address | symbol | balance_formatted | usd_value |
|----------------|---------------|--------|-------------------|-----------|
| 0x1234...5678  | 0x5543...9955 | USDT   | 16491989.845      | 16491989  |
| 0x1234...5678  | 0xce24...6666 | U      | 4540725.229       | 4537278   |

---

## 🔄 工作原理

### 架构流程图

```
用户连接钱包
    ↓
获取钱包地址 (wagmi useAccount)
    ↓
触发 useSyncWalletTokens Hook
    ↓
调用 /api/moralis/get-tokens
    ↓
Moralis API 返回代币列表
    ↓
调用 /api/supabase/save-tokens
    ↓
Supabase upsert 保存数据
    ↓
显示成功/失败通知
```

### 代码文件结构

```
bnb-activity-page/
├── .env.local                          # 环境变量配置
├── supabase-schema.sql                 # 数据库表结构
│
├── lib/
│   └── supabase.ts                     # Supabase 客户端和类型定义
│
├── app/api/
│   ├── moralis/get-tokens/
│   │   └── route.ts                    # Moralis API 代理
│   └── supabase/save-tokens/
│       └── route.ts                    # Supabase 数据保存
│
├── hooks/
│   └── use-sync-wallet-tokens.ts       # 同步逻辑 Hook
│
└── components/
    └── redemption-card.tsx             # 集成同步功能的组件
```

---

## 🎨 用户体验

### 按钮状态变化

1. **未连接状态**
   ```
   [💰 连接钱包]
   ```

2. **同步中状态**
   ```
   [⟳ 同步代币中...]  (禁用，显示加载动画)
   ```

3. **同步完成状态**
   ```
   [兑换 NFT 获得 0.5 BNB]
   ```

### Toast 通知

**成功通知：**
```
✅ 代币同步成功
   已同步 25 个代币到数据库
```

**失败通知：**
```
❌ 同步失败
   Failed to fetch tokens from Moralis
```

---

## 🔍 技术细节

### API 端点

#### 1. Moralis API (获取代币)

**端点：** `POST /api/moralis/get-tokens`

**请求：**
```json
{
  "walletAddress": "0x1234567890abcdef..."
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "result": [
      {
        "token_address": "0x55d398326f99059ff775485246999027b3197955",
        "symbol": "USDT",
        "name": "Tether USD",
        "balance_formatted": "16491989.845",
        "usd_value": 16491989.845,
        ...
      }
    ]
  }
}
```

#### 2. Supabase API (保存代币)

**端点：** `POST /api/supabase/save-tokens`

**请求：**
```json
{
  "walletAddress": "0x1234567890abcdef...",
  "tokens": [...]
}
```

**响应：**
```json
{
  "success": true,
  "message": "Successfully saved 25 tokens",
  "count": 25
}
```

### Hook 使用方法

```typescript
import { useSyncWalletTokens } from '@/hooks/use-sync-wallet-tokens'

function MyComponent() {
  const { syncTokens, syncStatus, address, isConnected } = useSyncWalletTokens()
  
  // 手动触发同步
  const handleSync = async () => {
    await syncTokens()
  }
  
  // 监听状态
  useEffect(() => {
    if (syncStatus.isSuccess) {
      console.log(`同步了 ${syncStatus.tokenCount} 个代币`)
    }
  }, [syncStatus])
  
  return (
    <div>
      {syncStatus.isLoading && <p>同步中...</p>}
      {syncStatus.isError && <p>错误: {syncStatus.error}</p>}
      <button onClick={handleSync}>手动同步</button>
    </div>
  )
}
```

---

## 🛠️ 故障排查

### 问题 1: 点击连接钱包后没有反应

**可能原因：**
- WalletConnect Project ID 未配置
- 浏览器钱包插件未安装

**解决方案：**
1. 检查 `.env.local` 中的 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
2. 安装 MetaMask 或其他钱包插件
3. 刷新页面重试

### 问题 2: 连接成功但同步失败

**可能原因：**
- Moralis API Key 无效
- Supabase 表未创建
- 网络问题

**解决方案：**

1. **检查浏览器控制台错误**
   ```bash
   F12 → Console → 查看错误信息
   ```

2. **验证 Moralis API Key**
   - 访问 https://admin.moralis.io/
   - 检查 API Key 是否有效
   - 查看 API 调用配额

3. **确认 Supabase 表存在**
   - 登录 Supabase Dashboard
   - Table Editor → 查找 `wallet_tokens` 表
   - 如果不存在，执行 `supabase-schema.sql`

4. **测试 API 端点**
   ```bash
   # 测试 Moralis API
   curl -X POST http://localhost:3000/api/moralis/get-tokens \
     -H "Content-Type: application/json" \
     -d '{"walletAddress":"0xYourAddress"}'
   ```

### 问题 3: 数据保存失败

**错误信息：**
```
Failed to save tokens to database
```

**解决方案：**

1. **检查 Supabase RLS 策略**
   ```sql
   -- 在 Supabase SQL Editor 中执行
   SELECT * FROM pg_policies WHERE tablename = 'wallet_tokens';
   ```

2. **验证 Anon Key**
   - 检查 `.env.local` 中的密钥是否正确
   - 重启开发服务器

3. **查看 Supabase 日志**
   - Dashboard → Logs → 查看错误详情

### 问题 4: 重复同步

**现象：**
- 每次刷新页面都会重新同步

**解决方案：**
- 这是正常行为（设计为首次连接自动同步）
- 如需避免，可以在 Hook 中添加防抖逻辑

---

## 📊 数据统计

### 查询示例

#### 查询某个钱包的代币总价值

```sql
SELECT 
  wallet_address,
  SUM(usd_value) as total_usd_value,
  COUNT(*) as token_count
FROM wallet_tokens
WHERE wallet_address = '0x你的地址'
GROUP BY wallet_address;
```

#### 查找高价值代币

```sql
SELECT 
  symbol,
  name,
  balance_formatted,
  usd_value,
  security_score
FROM wallet_tokens
WHERE usd_value > 1000
ORDER BY usd_value DESC;
```

#### 查找可能的垃圾代币

```sql
SELECT 
  symbol,
  name,
  balance_formatted,
  possible_spam,
  security_score
FROM wallet_tokens
WHERE possible_spam = true
   OR security_score < 50
ORDER BY security_score ASC;
```

---

## 🚀 性能优化建议

### 1. 缓存策略

当前每次连接都会同步，建议添加时间戳检查：

```typescript
// 伪代码
if (lastSyncTime && Date.now() - lastSyncTime < 5 * 60 * 1000) {
  // 5分钟内不重复同步
  return
}
```

### 2. 分页处理

对于代币数量很多的钱包，建议分页处理：

```typescript
// Moralis API 支持分页
const url = `${MORALIS_BASE_URL}/wallets/${address}/tokens?chain=bsc&limit=100&cursor=${nextCursor}`
```

### 3. 错误重试

添加自动重试机制：

```typescript
const maxRetries = 3
for (let i = 0; i < maxRetries; i++) {
  try {
    await syncTokens()
    break
  } catch (error) {
    if (i === maxRetries - 1) throw error
    await sleep(1000 * (i + 1)) // 指数退避
  }
}
```

---

## 🔒 安全注意事项

1. ✅ **API Key 保护**
   - Moralis API Key 保存在服务端
   - 使用 Next.js API Routes 作为代理
   - 前端不直接暴露密钥

2. ✅ **数据验证**
   - 验证钱包地址格式
   - 检查 API 响应有效性
   - 使用 TypeScript 类型安全

3. ✅ **RLS 策略**
   - Supabase 行级安全已启用
   - 公开读取权限
   - 控制写入权限

4. ⚠️ **隐私考虑**
   - 钱包地址和代币信息会保存到数据库
   - 建议添加用户同意条款
   - 考虑数据保留期限

---

## 📚 相关资源

- [Moralis Web3 API 文档](https://docs.moralis.com/web3-data-api)
- [Supabase 文档](https://supabase.com/docs)
- [wagmi 文档](https://wagmi.sh/)
- [RainbowKit 文档](https://www.rainbowkit.com/)

---

## ✅ 测试清单

- [ ] 环境变量已配置
- [ ] Supabase 表已创建
- [ ] 开发服务器已重启
- [ ] 钱包可以正常连接
- [ ] 代币同步显示加载状态
- [ ] 同步成功显示通知
- [ ] 数据保存到 Supabase
- [ ] 可以在 Dashboard 中查看数据
- [ ] 错误情况显示友好提示
- [ ] 网络断开时有适当处理

---

**开发完成！🎉**

现在你可以连接钱包测试完整的代币同步功能了！
