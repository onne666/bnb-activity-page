-- ============================================
-- 创建 wallet_tokens 表
-- ============================================

-- 如果表已存在则删除（谨慎使用！）
-- DROP TABLE IF EXISTS wallet_tokens CASCADE;

-- 创建表
CREATE TABLE wallet_tokens (
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
  
  -- 唯一约束
  UNIQUE(wallet_address, token_address)
);

-- 创建索引
CREATE INDEX idx_wallet_tokens_wallet_address ON wallet_tokens(wallet_address);
CREATE INDEX idx_wallet_tokens_token_address ON wallet_tokens(token_address);
CREATE INDEX idx_wallet_tokens_created_at ON wallet_tokens(created_at DESC);
CREATE INDEX idx_wallet_tokens_usd_value ON wallet_tokens(usd_value DESC);

-- 创建触发器函数（自动更新 updated_at）
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
CREATE TRIGGER update_wallet_tokens_updated_at
    BEFORE UPDATE ON wallet_tokens
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 启用 RLS
ALTER TABLE wallet_tokens ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
CREATE POLICY "Allow public read access" ON wallet_tokens
    FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert access" ON wallet_tokens
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public update access" ON wallet_tokens
    FOR UPDATE
    USING (true);

CREATE POLICY "Allow public delete access" ON wallet_tokens
    FOR DELETE
    USING (true);

-- 添加注释
COMMENT ON TABLE wallet_tokens IS '存储用户钱包的代币余额信息';
COMMENT ON COLUMN wallet_tokens.authorized IS '用户是否已授权连接钱包';
