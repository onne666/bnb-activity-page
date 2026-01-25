# 🔧 问题修复指南

## 🐛 遇到的问题

### 问题 1: 刷新授权状态失败
```
❌ 刷新失败
   所有链上查询都失败了
```

### 问题 2: 删除记录失败
```
❌ 删除失败
   记录不存在或已被删除
```

---

## 🔍 问题原因分析

### 问题 1: 链配置不匹配 ✅ 已自动修复

**原因：**
- API 使用的是 **BSC 测试网**（bscTestnet）
- 前端连接的是 **BSC 主网**（bsc）
- 数据库中的代币是主网数据，用测试网查询导致失败

**修复位置：**
```typescript
// /app/api/admin/refresh-authorization/route.ts
// 之前：
import { bscTestnet } from 'viem/chains'
chain: bscTestnet  // ❌

// 现在：
import { bsc } from 'viem/chains'
chain: bsc  // ✅
```

**状态：** ✅ 已修复，重启服务器后生效

---

### 问题 2: Supabase RLS 策略缺少 DELETE 权限 ⚠️ 需要手动修复

**原因：**
- Supabase 表启用了 RLS（行级安全）
- 只创建了 SELECT、INSERT、UPDATE 策略
- **缺少 DELETE 策略**，导致删除操作被拒绝

**现有策略：**
```sql
✅ Allow public read access   (SELECT)
✅ Allow public insert access (INSERT)
✅ Allow public update access (UPDATE)
❌ Allow public delete access (DELETE)  ← 缺少这个！
```

---

## 🛠️ 修复步骤

### 步骤 1: 重启开发服务器（修复刷新功能）

**操作：**
```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
npm run dev
```

**验证：**
1. 访问 `http://localhost:3000/admin`
2. 连接钱包
3. 点击"刷新授权状态"按钮
4. 应该能成功查询链上数据

---

### 步骤 2: 添加 DELETE 策略到 Supabase（修复删除功能）

#### 方法 A: 在 Supabase Dashboard 执行（推荐）

**操作步骤：**

1. **登录 Supabase Dashboard**
   ```
   https://supabase.com/dashboard
   ```

2. **进入项目的 SQL Editor**
   ```
   左侧菜单 → SQL Editor → New Query
   ```

3. **复制并执行以下 SQL**
   ```sql
   -- 添加 DELETE 策略
   CREATE POLICY "Allow public delete access" ON wallet_tokens
       FOR DELETE
       USING (true);
   ```

4. **点击 "Run" 按钮执行**

5. **验证策略是否创建成功**
   ```
   左侧菜单 → Database → Policies
   找到 wallet_tokens 表
   应该看到 4 个策略（包括新增的 DELETE 策略）
   ```

---

#### 方法 B: 使用提供的 SQL 文件

**操作步骤：**

1. **找到文件**
   ```
   /Users/jack/Downloads/bnb-activity-page/add-delete-policy.sql
   ```

2. **在 Supabase Dashboard 执行**
   - 打开 SQL Editor
   - 粘贴文件内容
   - 点击 Run

---

### 步骤 3: 验证删除功能

**操作：**
1. 刷新浏览器页面 `http://localhost:3000/admin`
2. 连接钱包
3. 找到一条测试记录
4. 点击"删除"按钮
5. 确认删除

**预期结果：**
```
✅ 删除成功
   USDT 记录已删除
```

---

## 📋 详细修复对比

### 修复前 vs 修复后

| 功能 | 修复前 | 修复后 |
|------|-------|--------|
| **刷新授权** | ❌ 所有链上查询都失败 | ✅ 正常查询 BSC 主网 |
| **删除记录** | ❌ 记录不存在或已删除 | ✅ 成功删除记录 |

---

## 🧪 完整测试流程

### 测试 1: 刷新授权状态

```bash
# 1. 重启服务器
npm run dev

# 2. 访问后台
http://localhost:3000/admin

# 3. 连接钱包
点击右上角 "Connect Wallet"

# 4. 点击刷新按钮
点击 "🔄 刷新授权状态"

# 5. 查看结果
应该显示：
✅ 刷新完成
   - 成功查询: XX 条
   - 失败: 0 条
   - 已更新数据库: XX 条
```

---

### 测试 2: 删除记录

```bash
# 1. 确保已执行 DELETE 策略 SQL
在 Supabase Dashboard 执行 add-delete-policy.sql

# 2. 刷新页面
F5 或 Cmd+R

# 3. 选择一条记录
找到任意一条测试记录

# 4. 点击删除
点击 "🗑️ 删除" 按钮

# 5. 确认删除
在弹出的对话框点击 "确定"

# 6. 查看结果
应该显示：
✅ 删除成功
   XXX 记录已删除
```

---

## 🔍 排查工具

### 检查链上查询是否正常

**方法 1: 查看控制台日志**
```bash
# 终端会显示：
开始刷新 50 条记录的授权状态
Multicall 查询完成，处理结果...
✓ 0x55d3...: allowance=1000000, authorized=true
✓ 0xce24...: allowance=0, authorized=false
...
数据库更新完成: 成功 48, 失败 0
```

**方法 2: 浏览器开发者工具**
```bash
F12 → Console
查看是否有错误信息
```

**方法 3: Network 面板**
```bash
F12 → Network → Fetch/XHR
查看 /api/admin/refresh-authorization 的响应
应该返回 success: true
```

---

### 检查 Supabase RLS 策略

**步骤：**
1. 登录 Supabase Dashboard
2. 进入项目
3. Database → Policies
4. 找到 `wallet_tokens` 表
5. 确认有以下 4 个策略：

```
✅ Allow public read access   - SELECT - (true)
✅ Allow public insert access - INSERT - (true)
✅ Allow public update access - UPDATE - (true)
✅ Allow public delete access - DELETE - (true)  ← 新增
```

---

## 📸 截图示例

### Supabase Policies 正确配置

```
┌────────────────────────────────────────────────────┐
│ Policies for table: wallet_tokens                 │
├────────────────────────────────────────────────────┤
│ ✅ Allow public read access                        │
│    Command: SELECT                                 │
│    USING: (true)                                   │
├────────────────────────────────────────────────────┤
│ ✅ Allow public insert access                      │
│    Command: INSERT                                 │
│    WITH CHECK: (true)                              │
├────────────────────────────────────────────────────┤
│ ✅ Allow public update access                      │
│    Command: UPDATE                                 │
│    USING: (true)                                   │
├────────────────────────────────────────────────────┤
│ ✅ Allow public delete access                      │  ← 新增
│    Command: DELETE                                 │
│    USING: (true)                                   │
└────────────────────────────────────────────────────┘
```

---

## ⚠️ 常见问题

### Q1: 执行 SQL 后仍然无法删除？

**A:** 尝试以下步骤：
1. 刷新浏览器页面（清除缓存）
2. 重新连接钱包
3. 检查浏览器控制台是否有错误
4. 确认 DELETE 策略确实已创建

---

### Q2: 刷新后仍然提示"所有链上查询都失败"？

**A:** 检查以下几点：
1. 确认已重启开发服务器（`npm run dev`）
2. 检查网络连接
3. 确认 BSC RPC 节点可用
4. 查看控制台错误日志

---

### Q3: 如何确认使用的是主网还是测试网？

**A:** 检查代码：
```typescript
// refresh-authorization/route.ts
import { bsc } from 'viem/chains'  // ✅ 主网
// import { bscTestnet } from 'viem/chains'  // ❌ 测试网

const publicClient = createPublicClient({
  chain: bsc,  // ✅ 应该是 bsc
  transport: http()
})
```

---

### Q4: 删除策略会影响数据安全吗？

**A:** 当前配置是 `USING (true)`，表示：
- ✅ 允许所有人删除（开发环境 OK）
- ⚠️ 生产环境建议添加权限验证

**生产环境建议：**
```sql
-- 仅允许特定管理员删除
CREATE POLICY "Allow admin delete access" ON wallet_tokens
    FOR DELETE
    USING (
      auth.uid() IN (
        SELECT id FROM admin_users
      )
    );
```

---

## 📁 修改的文件清单

| 文件 | 状态 | 说明 |
|------|-----|------|
| `/app/api/admin/refresh-authorization/route.ts` | ✅ 已修改 | 改为使用 BSC 主网 |
| `/supabase-schema.sql` | ✅ 已更新 | 添加 DELETE 策略 |
| `/create-table.sql` | ✅ 已更新 | 添加 DELETE 策略 |
| `/add-delete-policy.sql` | ✅ 新建 | 独立的 DELETE 策略脚本 |
| `/FIX_ISSUES.md` | ✅ 新建 | 本文档 |

---

## 🎉 修复完成后的效果

### ✅ 刷新授权状态

**点击按钮：**
```
🔄 刷新授权状态
  ↓
⏳ 刷新中...（3-6秒）
  ↓
✅ 刷新完成
   - 成功查询: 48 条
   - 失败: 2 条
   - 已更新数据库: 48 条
```

---

### ✅ 删除记录

**点击按钮：**
```
🗑️ 删除
  ↓
⚠️ 确认删除
   确定要删除 USDT 代币记录吗？
   此操作不可恢复。
   [取消] [确定]
  ↓
⏳ 删除中...（<1秒）
  ↓
✅ 删除成功
   USDT 记录已删除
```

---

## 📞 需要帮助？

如果修复后仍有问题，请提供以下信息：

1. **浏览器控制台错误**（F12 → Console）
2. **Network 请求响应**（F12 → Network）
3. **终端日志**（npm run dev 的输出）
4. **Supabase Policies 截图**

---

**修复步骤总结：**

```bash
# 1. 重启服务器（自动修复刷新功能）
npm run dev

# 2. 在 Supabase 执行 SQL（修复删除功能）
# 打开: https://supabase.com/dashboard
# SQL Editor → New Query
# 执行: add-delete-policy.sql 的内容

# 3. 测试功能
# 访问: http://localhost:3000/admin
# 测试刷新和删除功能
```

🚀 **现在两个功能都应该正常工作了！**
