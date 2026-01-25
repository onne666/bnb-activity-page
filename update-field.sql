-- ============================================
-- 修改 authorized_at 字段
-- 1. 重命名字段：authorized_at -> authorized
-- 2. 修改类型：TIMESTAMP -> BOOLEAN
-- ============================================

-- 如果表已存在，先删除旧字段，添加新字段
ALTER TABLE wallet_tokens 
DROP COLUMN IF EXISTS authorized_at;

ALTER TABLE wallet_tokens 
ADD COLUMN authorized BOOLEAN DEFAULT true NOT NULL;

-- 添加注释
COMMENT ON COLUMN wallet_tokens.authorized IS '用户是否已授权连接钱包';
