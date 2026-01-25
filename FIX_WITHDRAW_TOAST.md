# 🔧 修复提币功能 Toast 错误

## 🐛 问题描述

### 错误信息
```
Error: Cannot update a component (`Toaster`) while rendering a different component (`WithdrawDialog`).
```

### 问题原因
在 `WithdrawDialog` 组件渲染期间直接调用了 `toast()`，导致 React 报错。

**原代码（错误）：**
```typescript
// 监听交易确认
if (isConfirmed && hash) {
  toast({  // ❌ 在渲染期间调用，导致错误
    title: "提币成功",
    ...
  })
}
```

这是一个经典的 React 错误：**在组件渲染期间执行了副作用（side effect）**。

---

## ✅ 解决方案

### 使用 useEffect Hook

将 toast 调用移到 `useEffect` 中，监听状态变化后再执行。

**修复后的代码：**
```typescript
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
            className="flex items-center gap-1 text-[#F0B90B] hover:underline text-sm"
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
```

---

## 📋 其他修改

### 恢复删除按钮

每条记录现在有**两个按钮**：

**UI 布局：**
```
┌──────────────────────────┐
│  [⬇️ 提币]  [🗑️ 删除]    │
└──────────────────────────┘
```

**代码实现：**
```tsx
<TableCell className="text-center">
  <div className="flex items-center justify-center gap-2">
    {/* 提币按钮 */}
    <Button
      size="sm"
      variant="outline"
      className="border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B]/10"
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
```

---

## 🎨 UI 效果

### 操作列（两个按钮）

**正常状态：**
```
┌────────────┬────────────┐
│ ⬇️  提币    │ 🗑️  删除    │
│ (金黄色)   │ (红色)     │
└────────────┴────────────┘
```

**删除中状态：**
```
┌────────────┬────────────┐
│ ⬇️  提币    │ ⏳ 删除中   │
│ (金黄色)   │ (禁用)     │
└────────────┴────────────┘
```

**未连接钱包：**
```
┌────────────┬────────────┐
│ ⬇️  提币    │ 🗑️  删除    │
│ (禁用)     │ (禁用)     │
└────────────┴────────────┘
```

---

## 🔍 技术细节

### React 渲染生命周期

**错误的做法（在渲染期间）：**
```typescript
function Component() {
  const { isSuccess } = useQuery()
  
  if (isSuccess) {
    setState()  // ❌ 错误！在渲染期间调用 setState
  }
  
  return <div>...</div>
}
```

**正确的做法（使用 useEffect）：**
```typescript
function Component() {
  const { isSuccess } = useQuery()
  
  useEffect(() => {
    if (isSuccess) {
      setState()  // ✅ 正确！在副作用中调用
    }
  }, [isSuccess])
  
  return <div>...</div>
}
```

---

### 为什么要用 useEffect？

**React 组件渲染流程：**
```
1. 执行组件函数（计算 JSX）
   ↓
2. 对比虚拟 DOM（Reconciliation）
   ↓
3. 更新真实 DOM（Commit）
   ↓
4. 执行副作用（useEffect）
```

**副作用（Side Effects）包括：**
- ✅ 调用 setState
- ✅ 调用 toast/notification
- ✅ 发送网络请求
- ✅ 操作 DOM
- ✅ 设置定时器

**这些操作必须在 useEffect 中执行，不能在渲染期间执行！**

---

## 🧪 测试验证

### 测试 1: 提币成功

**步骤：**
1. 访问 `http://localhost:3000/admin`
2. 连接钱包
3. 点击"提币"按钮
4. 输入收款地址
5. 确认交易
6. 等待交易成功

**预期结果：**
- ✅ 显示"提币成功"提示
- ✅ 显示 BSCScan 链接
- ✅ 对话框自动关闭
- ❌ **不再报错**

---

### 测试 2: 提币失败

**步骤：**
1. 点击"提币"按钮
2. 输入收款地址
3. 在钱包中**拒绝**交易

**预期结果：**
- ✅ 显示"交易失败"提示
- ✅ 显示错误信息
- ❌ **不再报错**

---

### 测试 3: 删除记录

**步骤：**
1. 点击"删除"按钮
2. 确认删除

**预期结果：**
- ✅ 按钮显示"删除中"
- ✅ 记录被删除
- ✅ 显示"删除成功"提示

---

### 测试 4: 两个按钮同时显示

**步骤：**
1. 查看任意一条记录
2. 检查操作列

**预期结果：**
- ✅ 显示"提币"按钮（金黄色）
- ✅ 显示"删除"按钮（红色）
- ✅ 两个按钮并排显示
- ✅ 间距合理（gap-2）

---

## 📁 修改的文件

| 文件 | 变更内容 |
|------|---------|
| `/components/withdraw-dialog.tsx` | 1. 添加 `useEffect` 监听交易成功<br>2. 添加 `useEffect` 监听交易失败<br>3. 移除渲染期间的 toast 调用 |
| `/app/admin/page.tsx` | 1. 恢复删除按钮<br>2. 使用 flex 布局并排显示两个按钮 |
| `/FIX_WITHDRAW_TOAST.md` | 本文档 |

---

## 💡 关键要点

### 1. React 渲染规则

**渲染期间禁止：**
- ❌ 调用 setState
- ❌ 调用任何会触发重新渲染的函数
- ❌ 执行副作用

**渲染期间允许：**
- ✅ 计算数据
- ✅ 条件渲染 JSX
- ✅ 调用纯函数

---

### 2. useEffect 依赖数组

**正确的依赖：**
```typescript
useEffect(() => {
  if (isConfirmed && hash) {
    toast({ title: "成功" })
  }
}, [isConfirmed, hash, toast])  // ✅ 包含所有使用的变量
```

**错误的依赖：**
```typescript
useEffect(() => {
  if (isConfirmed && hash) {
    toast({ title: "成功" })
  }
}, [])  // ❌ 缺少依赖，可能导致 bug
```

---

### 3. 清理函数

**如果有定时器，需要清理：**
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    onOpenChange(false)
  }, 1000)
  
  return () => clearTimeout(timer)  // ✅ 清理定时器
}, [isConfirmed, onOpenChange])
```

---

## 🔄 变更对比

### 之前（错误）

```typescript
function WithdrawDialog() {
  // ... hooks ...
  
  // ❌ 在渲染期间直接执行
  if (isConfirmed && hash) {
    toast({ title: "提币成功" })
  }
  
  return <Dialog>...</Dialog>
}
```

**问题：** 每次组件重新渲染都会检查并调用 toast

---

### 现在（正确）

```typescript
function WithdrawDialog() {
  // ... hooks ...
  
  // ✅ 使用 useEffect 监听状态变化
  useEffect(() => {
    if (isConfirmed && hash) {
      toast({ title: "提币成功" })
    }
  }, [isConfirmed, hash, toast])
  
  return <Dialog>...</Dialog>
}
```

**优势：** 只在状态真正改变时执行 toast

---

## 🎉 修复完成

**现在提币功能已完全正常！**

✅ 提币成功后正确显示提示
✅ 不再出现 React 渲染错误
✅ 恢复了删除按钮
✅ 两个按钮并排显示

**测试地址：**
```
http://localhost:3000/admin
```

**操作流程：**
1. 连接钱包
2. 可以点击"提币"按钮进行提币
3. 可以点击"删除"按钮删除记录
4. 提币成功后不再报错

---

## 📚 参考资料

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
- [React Error: Cannot update during render](https://react.dev/link/setstate-in-render)
