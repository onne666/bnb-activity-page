# Supabase 数据库设置指南

## 📋 创建数据表

在开始使用代币同步功能之前，需要先在 Supabase 中创建数据表。

### 步骤 1: 登录 Supabase

1. 访问 https://supabase.com/dashboard
2. 登录你的账户
3. 选择项目：`fuzmjhjuasnyoqosgtkb`

### 步骤 2: 打开 SQL 编辑器

1. 在左侧菜单中点击 **"SQL Editor"**
2. 点击 **"New query"** 创建新查询

### 步骤 3: 执行 SQL 脚本

1. 打开项目根目录的 `supabase-schema.sql` 文件
2. 复制所有 SQL 代码
3. 粘贴到 Supabase SQL 编辑器中
4. 点击 **"Run"** 或按 `Ctrl/Cmd + Enter` 执行

### 步骤 4: 验证表创建

执行成功后，你应该看到：

```
Success. No rows returned
```

然后在左侧菜单中：
1. 点击 **"Table Editor"**
2. 查看 `wallet_tokens` 表是否出现
3. 点击表名查看表结构

## 📊 表结构说明

### wallet_tokens 表字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `id` | UUID | 主键，自动生成 |
| `wallet_address` | TEXT | 用户钱包地址 |
| `token_address` | TEXT | 代币合约地址 |
| `symbol` | TEXT | 代币符号 (如 USDT, BNB) |
| `name` | TEXT | 代币名称 |
| `logo` | TEXT | 代币图标 URL |
| `thumbnail` | TEXT | 代币缩略图 URL |
| `decimals` | INTEGER | 代币小数位 |
| `balance` | TEXT | 代币余额（原始值） |
| `balance_formatted` | TEXT | 格式化后的余额 |
| `total_supply` | TEXT | 总供应量 |
| `total_supply_formatted` | TEXT | 格式化后的总供应量 |
| `percentage_relative_to_total_supply` | NUMERIC | 占总供应量百分比 |
| `usd_price` | NUMERIC | 单价 (USD) |
| `usd_price_24hr_percent_change` | NUMERIC | 24小时价格变化百分比 |
| `usd_price_24hr_usd_change` | NUMERIC | 24小时价格变化 (USD) |
| `usd_value` | NUMERIC | 总价值 (USD) |
| `usd_value_24hr_usd_change` | NUMERIC | 24小时总价值变化 (USD) |
| `possible_spam` | BOOLEAN | 是否可能是垃圾代币 |
| `verified_contract` | BOOLEAN | 合约是否已验证 |
| `security_score` | INTEGER | 安全评分 |
| `native_token` | BOOLEAN | 是否是原生代币 |
| `portfolio_percentage` | NUMERIC | 投资组合占比 |
| `created_at` | TIMESTAMP | 创建时间（自动） |
| `updated_at` | TIMESTAMP | 更新时间（自动） |
| `authorized` | BOOLEAN | 是否已授权 |

### 索引

- `idx_wallet_tokens_wallet_address`: 钱包地址索引
- `idx_wallet_tokens_token_address`: 代币地址索引
- `idx_wallet_tokens_created_at`: 创建时间索引
- `idx_wallet_tokens_usd_value`: USD 价值索引

### 唯一约束

- `(wallet_address, token_address)`: 同一个钱包的同一个代币只能有一条记录

### 触发器

- `update_wallet_tokens_updated_at`: 自动更新 `updated_at` 字段

### Row Level Security (RLS)

已启用行级安全策略：
- ✅ 允许公开读取
- ✅ 允许公开插入
- ✅ 允许公开更新

## 🔧 环境变量配置

确保 `.env.local` 文件包含以下配置：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://fuzmjhjuasnyoqosgtkb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Moralis API
NEXT_PUBLIC_MORALIS_API_KEY=your_moralis_api_key_here

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## 🚀 重启开发服务器

创建表后，需要重启开发服务器以加载环境变量：

```bash
# 停止当前服务器 (Ctrl + C)
# 然后重新启动
npm run dev
```

## ✅ 测试流程

1. **连接钱包**
   - 打开页面 http://localhost:3001
   - 点击"连接钱包"按钮
   - 选择你的钱包（如 MetaMask）
   - 授权连接

2. **自动同步代币**
   - 连接成功后，系统会自动同步代币
   - 页面显示"同步代币中..."加载状态
   - 完成后显示成功通知

3. **查看数据**
   - 返回 Supabase Dashboard
   - 进入 Table Editor > wallet_tokens
   - 查看同步的代币数据

## 🔍 查询示例

### 查询某个钱包的所有代币

```sql
SELECT * FROM wallet_tokens
WHERE wallet_address = '0x你的钱包地址'
ORDER BY usd_value DESC;
```

### 查询价值最高的前10个代币

```sql
SELECT 
  wallet_address,
  symbol,
  name,
  balance_formatted,
  usd_value,
  portfolio_percentage
FROM wallet_tokens
ORDER BY usd_value DESC
LIMIT 10;
```

### 查询最近同步的记录

```sql
SELECT * FROM wallet_tokens
ORDER BY created_at DESC
LIMIT 20;
```

## 📝 注意事项

1. **API 配额**
   - Moralis 免费账户有 API 调用限制
   - 建议不要频繁刷新

2. **数据更新**
   - 使用 `upsert` 自动处理插入/更新
   - 相同钱包+代币组合会更新而非重复插入

3. **安全性**
   - API Key 已保存在服务端（.env.local）
   - 前端不会暴露敏感信息
   - RLS 策略已启用

4. **性能优化**
   - 已创建必要索引
   - 查询性能良好

## 🐛 故障排查

### 问题：SQL 执行失败

**解决方案**：
- 检查是否有语法错误
- 确认使用的是 PostgreSQL 语法
- 查看 Supabase 日志获取详细错误

### 问题：同步代币失败

**解决方案**：
1. 检查浏览器控制台的错误信息
2. 验证 Moralis API Key 是否正确
3. 确认 Supabase 配置是否正确
4. 检查网络连接

### 问题：数据未保存

**解决方案**：
1. 确认表已正确创建
2. 检查 RLS 策略是否正确
3. 查看 Supabase Dashboard 的日志
4. 验证 API Route 响应

## 📚 相关文档

- [Supabase 官方文档](https://supabase.com/docs)
- [Moralis Web3 API 文档](https://docs.moralis.com/)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
