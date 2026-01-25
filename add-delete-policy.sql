-- ============================================
-- 添加 DELETE 策略到 wallet_tokens 表
-- ============================================

-- 说明：原表结构缺少 DELETE 权限的 RLS 策略
-- 执行此脚本后，将允许通过 API 删除记录

-- 创建策略：允许删除
CREATE POLICY "Allow public delete access" ON wallet_tokens
    FOR DELETE
    USING (true);

-- 验证策略是否创建成功
-- 执行完毕后，可以在 Supabase Dashboard 查看：
-- Settings -> Database -> Policies -> wallet_tokens 表应该有 4 个策略：
-- 1. Allow public read access (SELECT)
-- 2. Allow public insert access (INSERT)
-- 3. Allow public update access (UPDATE)
-- 4. Allow public delete access (DELETE) ← 新增
