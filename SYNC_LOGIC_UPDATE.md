# 🔄 同步代币逻辑更新说明

## 📋 问题描述

### 原有逻辑的问题

**使用 `upsert` 方法：**
```typescript
const { data, error } = await supabase
  .from('wallet_tokens')
  .upsert(walletTokens, {
    onConflict: 'wallet_address,token_address',
    ignoreDuplicates: false, // 不忽略重复，而是更新
  })
```

**问题：**
- ❌ 如果记录已存在，会**覆盖**整条记录
- ❌ 已手动修改的 `authorized` 字段会丢失
- ❌ 无法保留已有记录的任何自定义修改

**场景示例：**

1. 用户第一次连接钱包，同步代币 USDT
   ```
   wallet_address: 0x1234...
   token_address: 0x55d39... (USDT)
   authorized: false
   ```

2. 用户点击 Redeem，交易成功，数据库更新
   ```
   authorized: false → true  ✅ 已授权
   ```

3. 用户再次连接钱包，同步代币
   ```
   authorized: true → false  ❌ 被覆盖！
   ```

---

## ✅ 新逻辑

### 核心原则

**"如果已存在则跳过，只添加新记录"**

- ✅ 保留已有记录的所有字段
- ✅ 只插入新发现的代币
- ✅ 不覆盖任何已存在的记录

---

## 🔄 新的同步流程

```
接收 Moralis API 返回的代币列表
    ↓
步骤1: 查询数据库
    SELECT token_address
    FROM wallet_tokens
    WHERE wallet_address = '用户地址'
    ↓
获取所有已存在的 token_address
    ↓
步骤2: 过滤新代币
    遍历 Moralis 返回的代币列表
    如果 token_address 已存在 → 跳过 ⏭️
    如果 token_address 不存在 → 保留 ✅
    ↓
步骤3: 插入新代币
    如果有新代币：
      INSERT INTO wallet_tokens (新代币列表)
    如果没有新代币：
      跳过插入
    ↓
返回结果
    {
      inserted: 3,  // 插入了 3 条新记录
      skipped: 7,   // 跳过了 7 条已存在的记录
      total: 10     // 总共 10 条代币
    }
```

---

## 💻 代码实现

### 修改的文件

**`/app/api/supabase/save-tokens/route.ts`**

### 核心逻辑

```typescript
// 步骤 1: 查询已存在的代币地址
const { data: existingTokens } = await supabase
  .from('wallet_tokens')
  .select('token_address')
  .eq('wallet_address', walletAddress.toLowerCase())

// 步骤 2: 创建 Set 用于快速查找
const existingTokenAddresses = new Set(
  existingTokens?.map(t => t.token_address.toLowerCase()) || []
)

// 步骤 3: 过滤新代币
const newTokens = walletTokens.filter(token => {
  const exists = existingTokenAddresses.has(token.token_address.toLowerCase())
  if (exists) {
    console.log(`Skipping existing token: ${token.symbol}`)
  }
  return !exists  // 只保留不存在的代币
})

// 步骤 4: 插入新代币
if (newTokens.length > 0) {
  const { data, error } = await supabase
    .from('wallet_tokens')
    .insert(newTokens)  // 使用 insert，不是 upsert
    .select()
}
```

---

## 📊 行为对比

### 场景 1: 第一次同步（数据库为空）

**Moralis API 返回：** 10 条代币

**数据库状态：**
```
已存在: 0 条
新代币: 10 条
```

**操作：**
- ✅ 插入 10 条新记录

**响应：**
```json
{
  "success": true,
  "inserted": 10,
  "skipped": 0,
  "total": 10
}
```

---

### 场景 2: 第二次同步（数据库已有记录）

**Moralis API 返回：** 10 条代币（与第一次相同）

**数据库状态：**
```
已存在: 10 条（包含已修改的 authorized = true）
新代币: 0 条
```

**操作：**
- ⏭️ 跳过 10 条已存在的记录
- ❌ **不会覆盖**已有记录

**响应：**
```json
{
  "success": true,
  "inserted": 0,
  "skipped": 10,
  "total": 10
}
```

---

### 场景 3: 第三次同步（钱包新增了代币）

**Moralis API 返回：** 12 条代币（新增了 2 条）

**数据库状态：**
```
已存在: 10 条
新代币: 2 条
```

**操作：**
- ⏭️ 跳过 10 条已存在的记录
- ✅ 插入 2 条新记录

**响应：**
```json
{
  "success": true,
  "inserted": 2,
  "skipped": 10,
  "total": 12
}
```

---

## 🔍 详细示例

### 数据库初始状态

```sql
SELECT token_address, symbol, authorized
FROM wallet_tokens
WHERE wallet_address = '0x1234...'
ORDER BY usd_value DESC;
```

**结果：**
```
token_address                              | symbol | authorized
-------------------------------------------|--------|------------
0x55d398326f99059ff775485246999027b3197955 | USDT   | true   ← 已授权
0xce24439f2d9c6a2289f741120fe202248b666666 | U      | false
0xa69d1931a9799fa3ca4a9312bb790d67e6c4e2a9 | CE     | false
```

---

### Moralis API 返回的代币列表

```json
{
  "result": [
    {
      "token_address": "0x55d398326f99059ff775485246999027b3197955",
      "symbol": "USDT",
      "authorized": false  ← Moralis 不知道这个字段，默认 false
    },
    {
      "token_address": "0xce24439f2d9c6a2289f741120fe202248b666666",
      "symbol": "U",
      "authorized": false
    },
    {
      "token_address": "0xa69d1931a9799fa3ca4a9312bb790d67e6c4e2a9",
      "symbol": "CE",
      "authorized": false
    },
    {
      "token_address": "0x1234567890abcdef1234567890abcdef12345678",
      "symbol": "NEW",
      "authorized": false  ← 这是新代币！
    }
  ]
}
```

---

### 同步处理过程

**步骤 1: 查询已存在的代币**
```typescript
existingTokenAddresses = Set([
  '0x55d398326f99059ff775485246999027b3197955',  // USDT
  '0xce24439f2d9c6a2289f741120fe202248b666666',  // U
  '0xa69d1931a9799fa3ca4a9312bb790d67e6c4e2a9',  // CE
])
```

**步骤 2: 过滤新代币**
```typescript
// 遍历 Moralis 返回的 4 条代币
1. USDT (0x55d39...) → 已存在 → 跳过 ⏭️
2. U    (0xce244...) → 已存在 → 跳过 ⏭️
3. CE   (0xa69d1...) → 已存在 → 跳过 ⏭️
4. NEW  (0x12345...) → 不存在 → 保留 ✅

newTokens = [
  {
    token_address: '0x1234567890abcdef1234567890abcdef12345678',
    symbol: 'NEW',
    authorized: false
  }
]
```

**步骤 3: 插入新代币**
```typescript
// 只插入 1 条新记录
INSERT INTO wallet_tokens (token_address, symbol, authorized, ...)
VALUES ('0x12345...', 'NEW', false, ...);
```

---

### 同步后的数据库状态

```sql
SELECT token_address, symbol, authorized
FROM wallet_tokens
WHERE wallet_address = '0x1234...'
ORDER BY usd_value DESC;
```

**结果：**
```
token_address                              | symbol | authorized
-------------------------------------------|--------|------------
0x55d398326f99059ff775485246999027b3197955 | USDT   | true   ← 保持不变！✅
0xce24439f2d9c6a2289f741120fe202248b666666 | U      | false  ← 保持不变！✅
0xa69d1931a9799fa3ca4a9312bb790d67e6c4e2a9 | CE     | false  ← 保持不变！✅
0x1234567890abcdef1234567890abcdef12345678 | NEW    | false  ← 新插入！✅
```

---

## 🎯 关键改进

### 1. 保留已有记录

**旧逻辑 (upsert)：**
```
USDT (authorized: true) → 同步后 → USDT (authorized: false)  ❌ 被覆盖
```

**新逻辑 (insert only)：**
```
USDT (authorized: true) → 同步后 → USDT (authorized: true)  ✅ 保持不变
```

---

### 2. 详细的日志输出

**控制台日志：**
```
Checking existing tokens for wallet: 0x1234...
Found 10 existing token(s)
Skipping existing token: USDT
Skipping existing token: U
Skipping existing token: CE
Filtered: 1 new token(s) to insert (9 skipped)
```

---

### 3. 清晰的响应信息

**响应结构：**
```json
{
  "success": true,
  "message": "Successfully inserted 1 new token(s), skipped 9 existing token(s)",
  "inserted": 1,    // 插入的新记录数
  "skipped": 9,     // 跳过的已存在记录数
  "total": 10,      // Moralis 返回的总记录数
  "data": [...]     // 新插入的记录详情
}
```

---

## 🧪 测试步骤

### 测试 1: 验证不覆盖已有记录

**步骤：**

1. **第一次同步**
   ```bash
   # 连接钱包，触发同步
   # 查看数据库
   SELECT token_address, symbol, authorized FROM wallet_tokens;
   ```
   
   **预期：**
   ```
   USDT | false
   U    | false
   CE   | false
   ```

2. **手动修改 authorized 字段**
   ```sql
   UPDATE wallet_tokens
   SET authorized = true
   WHERE symbol = 'USDT';
   ```
   
   **结果：**
   ```
   USDT | true  ← 手动修改
   U    | false
   CE   | false
   ```

3. **第二次同步**
   ```bash
   # 再次连接钱包，触发同步
   # 查看数据库
   SELECT token_address, symbol, authorized FROM wallet_tokens;
   ```
   
   **预期（关键）：**
   ```
   USDT | true  ← 保持不变！✅
   U    | false
   CE   | false
   ```

---

### 测试 2: 验证新增代币

**步骤：**

1. **获取新代币**
   - 向钱包转入一个新的代币
   - 或者在 Pancakeswap 兑换一个新代币

2. **触发同步**
   ```bash
   # 连接钱包，触发同步
   ```

3. **查看响应**
   ```json
   {
     "success": true,
     "message": "Successfully inserted 1 new token(s), skipped 3 existing token(s)",
     "inserted": 1,
     "skipped": 3,
     "total": 4
   }
   ```

4. **验证数据库**
   ```sql
   SELECT token_address, symbol, authorized FROM wallet_tokens;
   ```
   
   **预期：**
   ```
   USDT | true   ← 旧记录，保持不变
   U    | false  ← 旧记录，保持不变
   CE   | false  ← 旧记录，保持不变
   NEW  | false  ← 新记录，刚插入
   ```

---

### 测试 3: 验证日志输出

**查看浏览器控制台：**
```
Checking existing tokens for wallet: 0x1234...
Found 3 existing token(s)
Skipping existing token: USDT
Skipping existing token: U
Skipping existing token: CE
Filtered: 1 new token(s) to insert (3 skipped)
```

**查看服务器终端：**
```
POST /api/supabase/save-tokens 200 in 125ms
Successfully inserted 1 new token(s), skipped 3 existing token(s)
```

---

## ⚠️ 注意事项

### 1. 代币价格不会更新

**问题：**
- 旧记录的 `usd_price`、`balance` 等字段不会自动更新
- 如果代币价格变化，数据库中的价格仍然是旧的

**解决方案（可选）：**
- 如果需要更新价格，可以创建单独的 API 来更新这些字段
- 或者添加"刷新价格"功能

### 2. 代币余额不会更新

**问题：**
- 用户转出/转入代币后，`balance` 字段不会自动更新

**解决方案（可选）：**
- 添加"刷新余额"按钮
- 或者在特定操作后触发余额更新

### 3. Set 查找性能

**当前实现：**
```typescript
const existingTokenAddresses = new Set(
  existingTokens?.map(t => t.token_address.toLowerCase()) || []
)
```

**性能：**
- 查找时间复杂度: O(1)
- 对于几百个代币，性能完全没问题
- 如果有数千个代币，仍然很快

---

## 📝 API 响应格式变更

### 旧响应格式

```json
{
  "success": true,
  "message": "Successfully saved 10 tokens",
  "count": 10,
  "data": [...]
}
```

### 新响应格式

```json
{
  "success": true,
  "message": "Successfully inserted 3 new token(s), skipped 7 existing token(s)",
  "inserted": 3,   // 新增字段
  "skipped": 7,    // 新增字段
  "total": 10,     // 新增字段
  "data": [...]    // 只包含新插入的记录
}
```

**或者（如果没有新代币）：**
```json
{
  "success": true,
  "message": "All tokens already exist, no new tokens inserted",
  "inserted": 0,
  "skipped": 10,
  "total": 10,
  "data": []
}
```

---

## 🔄 数据迁移

### 不需要数据迁移

✅ **好消息：** 不需要修改现有数据！

**原因：**
- 只修改了插入逻辑
- 数据库结构没有变化
- 现有记录完全兼容

---

## 🎯 总结

### 核心改进

| 特性 | 旧逻辑 (upsert) | 新逻辑 (insert) |
|-----|----------------|----------------|
| **已存在记录** | ❌ 覆盖 | ✅ 保留 |
| **authorized 字段** | ❌ 丢失 | ✅ 保持 |
| **新代币** | ✅ 插入 | ✅ 插入 |
| **性能** | 快 | 快（多一次查询） |
| **日志** | 简单 | 详细 |

---

### 使用建议

**推荐场景：**
- ✅ 需要保留用户的手动修改（如 `authorized` 字段）
- ✅ 只想添加新发现的代币
- ✅ 不需要更新代币价格/余额

**不推荐场景：**
- ❌ 需要每次同步都更新代币价格
- ❌ 需要实时更新代币余额

---

**功能已完成！🎉**

现在同步逻辑会**保护已有记录**，只添加新代币，不会覆盖任何已存在的数据！
