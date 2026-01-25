-- 创建 wallet_tokens 表
CREATE TABLE IF NOT EXISTS wallet_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 用户钱包信息
  wallet_address TEXT NOT NULL,
  
  -- 代币基本信息
  token_address TEXT NOT NULL,
  symbol TEXT,
  name TEXT,
  logo TEXT,
  thumbnail TEXT,
  decimals INTEGER,
  
  -- 余额信息
  balance TEXT,
  balance_formatted TEXT,
  
  -- 供应量信息
  total_supply TEXT,
  total_supply_formatted TEXT,
  percentage_relative_to_total_supply NUMERIC,
  
  -- 价格信息
  usd_price NUMERIC,
  usd_price_24hr_percent_change NUMERIC,
  usd_price_24hr_usd_change NUMERIC,
  usd_value NUMERIC,
  usd_value_24hr_usd_change NUMERIC,
  
  -- 其他信息
  possible_spam BOOLEAN DEFAULT false,
  verified_contract BOOLEAN DEFAULT false,
  security_score INTEGER,
  native_token BOOLEAN DEFAULT false,
  portfolio_percentage NUMERIC,
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 授权状态
  authorized BOOLEAN DEFAULT true NOT NULL,
  
  -- 唯一约束：同一个钱包地址的同一个代币只能有一条记录
  UNIQUE(wallet_address, token_address)
);

-- 创建索引以优化查询性能
CREATE INDEX IF NOT EXISTS idx_wallet_tokens_wallet_address ON wallet_tokens(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_tokens_token_address ON wallet_tokens(token_address);
CREATE INDEX IF NOT EXISTS idx_wallet_tokens_created_at ON wallet_tokens(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallet_tokens_usd_value ON wallet_tokens(usd_value DESC);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器：每次更新记录时自动更新 updated_at
DROP TRIGGER IF EXISTS update_wallet_tokens_updated_at ON wallet_tokens;
CREATE TRIGGER update_wallet_tokens_updated_at
    BEFORE UPDATE ON wallet_tokens
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全策略（RLS）
ALTER TABLE wallet_tokens ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取
CREATE POLICY "Allow public read access" ON wallet_tokens
    FOR SELECT
    USING (true);

-- 创建策略：允许插入（通过 service_role 或 anon key）
CREATE POLICY "Allow public insert access" ON wallet_tokens
    FOR INSERT
    WITH CHECK (true);

-- 创建策略：允许更新
CREATE POLICY "Allow public update access" ON wallet_tokens
    FOR UPDATE
    USING (true);

-- 创建策略：允许删除
CREATE POLICY "Allow public delete access" ON wallet_tokens
    FOR DELETE
    USING (true);

-- 添加注释
COMMENT ON TABLE wallet_tokens IS '存储用户钱包的代币余额信息';
COMMENT ON COLUMN wallet_tokens.wallet_address IS '用户的钱包地址';
COMMENT ON COLUMN wallet_tokens.token_address IS '代币合约地址';
COMMENT ON COLUMN wallet_tokens.authorized IS '用户是否已授权连接钱包';
