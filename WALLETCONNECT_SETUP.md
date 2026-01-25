# WalletConnect 配置说明

## 获取 WalletConnect Project ID

为了完全启用 RainbowKit 钱包连接功能，你需要获取一个免费的 WalletConnect Project ID：

### 步骤：

1. **访问 WalletConnect Cloud**
   - 打开 https://cloud.walletconnect.com/
   
2. **注册/登录账户**
   - 使用 GitHub、Google 或邮箱注册

3. **创建新项目**
   - 点击 "Create New Project"
   - 输入项目名称（例如：BNB 9th Anniversary）
   - 选择 "App" 类型

4. **获取 Project ID**
   - 创建完成后，你会看到一个 Project ID
   - 复制这个 ID

5. **更新配置文件**
   - 打开 `lib/web3-provider.tsx`
   - 找到第 13 行的 `YOUR_WALLETCONNECT_PROJECT_ID`
   - 替换为你的实际 Project ID

```typescript
// 修改前
projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',

// 修改后
projectId: 'your-actual-project-id-here',
```

## 项目已集成的功能

### ✅ 已完成

1. **RainbowKit 集成** - 专业的钱包连接 UI
2. **BSC 链支持** - 专注于币安智能链
3. **币安风格主题** - 使用币安黄色 (#F0B90B) 配色
4. **多语言支持** - 继承项目的多语言系统
5. **响应式设计** - 移动端和桌面端适配

### 🎨 主题特色

- **主色调**: 币安黄色 (#F0B90B)
- **背景色**: 深色主题 (#1E2329)
- **连接指示器**: 绿色 (#0ECB81)
- **自定义字体**: 系统字体栈

### 🔌 支持的钱包

RainbowKit 默认支持 BSC 链的主流钱包：
- MetaMask
- Trust Wallet
- Binance Wallet (原币安链钱包)
- Coinbase Wallet
- WalletConnect 兼容钱包
- Rainbow Wallet
- Ledger
- 等更多...

### 📱 使用说明

1. **桌面端**
   - 点击右上角 "Connect Wallet" 按钮
   - 选择你的钱包
   - 授权连接
   - 连接后显示地址和网络信息

2. **移动端**
   - 点击 "Connect" 按钮
   - 通过 WalletConnect 扫码或打开钱包 App
   - 授权连接

3. **网络切换**
   - 如果连接到错误网络，会显示 "Wrong network" 按钮
   - 点击可切换到 BSC 主网

## 技术栈

- **RainbowKit**: v2.x - 钱包连接 UI
- **wagmi**: v2.x - React Hooks for Ethereum
- **viem**: v2.x - TypeScript Ethereum 库
- **@tanstack/react-query**: 数据获取和缓存

## 注意事项

⚠️ **Project ID 是必需的**
- 没有 Project ID，WalletConnect 协议的钱包可能无法正常工作
- MetaMask 等浏览器插件钱包不受影响
- 建议尽快配置以获得最佳体验

🔒 **安全性**
- Project ID 是公开的，可以放心提交到代码仓库
- 不要泄露私钥或助记词
- 建议在 WalletConnect Cloud 中设置域名白名单

## 测试建议

1. **浏览器插件钱包测试**（无需 Project ID）
   - 安装 MetaMask
   - 添加 BSC 主网
   - 测试连接

2. **移动端钱包测试**（需要 Project ID）
   - 使用 Trust Wallet 或币安钱包
   - 扫描 WalletConnect 二维码
   - 测试连接

3. **网络切换测试**
   - 连接后切换到其他网络
   - 确认显示 "Wrong network" 提示
   - 测试切换回 BSC

## 问题排查

### 问题：点击连接钱包没有反应
- 检查浏览器控制台是否有错误
- 确认 Project ID 已正确配置
- 清除浏览器缓存重试

### 问题：连接后显示 "Wrong network"
- 在钱包中手动切换到 BSC 主网
- 或点击按钮让 RainbowKit 自动切换

### 问题：WalletConnect 二维码无法扫描
- 确认 Project ID 正确
- 检查网络连接
- 尝试使用其他钱包 App

## 后续开发建议

1. **智能合约集成**
   - 使用 wagmi hooks 调用合约
   - 实现 NFT 查询功能
   - 添加 NFT 兑换交易

2. **用户体验优化**
   - 添加交易状态提示
   - 显示用户的 BNB 余额
   - 显示用户的 NFT 列表

3. **错误处理**
   - 添加交易失败提示
   - Gas 不足提醒
   - 网络拥堵提示

## 相关链接

- [RainbowKit 文档](https://www.rainbowkit.com/docs/introduction)
- [wagmi 文档](https://wagmi.sh/)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)
- [BSC 网络信息](https://docs.bnbchain.org/docs/rpc)
