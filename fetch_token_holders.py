#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从Moralis API获取ERC20代币持有者数据并保存到SQLite数据库
只保存非合约地址（is_contract为false）
每次请求后立即保存，减少内存开销
"""

import requests
import sqlite3
import time
from datetime import datetime
from typing import List, Dict, Optional

# 配置参数
MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjQzMTliOWI1LTZhNDktNDY3Mi05MzFhLTk0ZmZkZDg0MGYwYyIsIm9yZ0lkIjoiNDk2ODkwIiwidXNlcklkIjoiNTExMzAxIiwidHlwZUlkIjoiMjA4MDc5ZWYtYWIzOS00NGVkLWJjNGUtNWMzMDQ3ZjhhN2VhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Njk0MDY0MTYsImV4cCI6NDkyNTE2NjQxNn0.qR9pJqVNKsSq7lFbFQIxG2c8dtIndr59k0dhK01cUT4"
TOKEN_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"  # WBNB
CHAIN = "bsc"
LIMIT = 100  # 每页获取100条记录
ORDER = "DESC"
API_URL = f"https://deep-index.moralis.io/api/v2.2/erc20/{TOKEN_ADDRESS}/owners"

# 性能优化参数
REQUEST_DELAY = 0.0  # 请求间隔（秒），0表示不延迟，全速请求
RETRY_TIMES = 3  # 请求失败重试次数
RETRY_DELAY = 1  # 重试间隔（秒）
BATCH_SIZE = 50  # 批量提交数据库的记录数

# 数据库表结构
TABLE_SCHEMA = """
CREATE TABLE IF NOT EXISTS token_holders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_address TEXT NOT NULL UNIQUE,
    owner_address_label TEXT,
    balance TEXT NOT NULL,
    balance_formatted TEXT NOT NULL,
    is_contract INTEGER NOT NULL,
    entity TEXT,
    entity_logo TEXT,
    usd_value TEXT,
    percentage_relative_to_total_supply REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""


def init_database(db_path: str) -> sqlite3.Connection:
    """
    初始化SQLite数据库
    
    Args:
        db_path: 数据库文件路径
        
    Returns:
        数据库连接对象
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(TABLE_SCHEMA)
    
    # 创建索引以提高查询性能
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_owner_address 
        ON token_holders(owner_address)
    """)
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_balance_formatted 
        ON token_holders(balance_formatted DESC)
    """)
    
    conn.commit()
    return conn


def fetch_token_holders(cursor: Optional[str] = None, retry_count: int = 0) -> Optional[Dict]:
    """
    从Moralis API获取代币持有者数据（带重试机制）
    
    Args:
        cursor: 分页游标，用于获取下一页数据
        retry_count: 当前重试次数
        
    Returns:
        API响应的JSON数据，失败返回None
    """
    headers = {
        "Accept": "application/json",
        "X-API-Key": MORALIS_API_KEY
    }
    
    params = {
        "chain": CHAIN,
        "limit": LIMIT,
        "order": ORDER
    }
    
    if cursor:
        params["cursor"] = cursor
    
    try:
        response = requests.get(API_URL, headers=headers, params=params, timeout=30)
        
        # 处理限流
        if response.status_code == 429:
            if retry_count < RETRY_TIMES:
                wait_time = RETRY_DELAY * (retry_count + 1)
                print(f"⚠️  遇到限流，{wait_time}秒后重试 (第{retry_count + 1}次)")
                time.sleep(wait_time)
                return fetch_token_holders(cursor, retry_count + 1)
            else:
                print(f"❌ 达到最大重试次数，跳过此请求")
                return None
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.Timeout:
        if retry_count < RETRY_TIMES:
            print(f"⚠️  请求超时，{RETRY_DELAY}秒后重试 (第{retry_count + 1}次)")
            time.sleep(RETRY_DELAY)
            return fetch_token_holders(cursor, retry_count + 1)
        else:
            print(f"❌ 请求超时，达到最大重试次数")
            return None
            
    except requests.exceptions.RequestException as e:
        if retry_count < RETRY_TIMES:
            print(f"⚠️  请求失败: {e}，{RETRY_DELAY}秒后重试 (第{retry_count + 1}次)")
            time.sleep(RETRY_DELAY)
            return fetch_token_holders(cursor, retry_count + 1)
        else:
            print(f"❌ API请求失败: {e}")
            return None


def filter_non_contract_addresses(holders: List[Dict]) -> List[Dict]:
    """
    过滤出非合约地址（is_contract为false）
    
    Args:
        holders: 持有者列表
        
    Returns:
        过滤后的持有者列表
    """
    return [holder for holder in holders if not holder.get("is_contract", True)]


def save_to_database(conn: sqlite3.Connection, holders: List[Dict]) -> int:
    """
    将持有者数据批量保存到SQLite数据库（优化版）
    使用INSERT OR REPLACE避免重复数据
    
    Args:
        conn: 数据库连接对象
        holders: 持有者列表
        
    Returns:
        成功插入的记录数
    """
    if not holders:
        return 0
        
    cursor = conn.cursor()
    
    # 准备批量插入的数据
    data_to_insert = []
    for holder in holders:
        data_to_insert.append((
            holder.get("owner_address", ""),
            holder.get("owner_address_label"),
            holder.get("balance", ""),
            holder.get("balance_formatted", ""),
            1 if holder.get("is_contract", False) else 0,
            holder.get("entity"),
            holder.get("entity_logo"),
            holder.get("usd_value"),
            holder.get("percentage_relative_to_total_supply")
        ))
    
    try:
        # 批量插入
        cursor.executemany("""
            INSERT OR REPLACE INTO token_holders (
                owner_address,
                owner_address_label,
                balance,
                balance_formatted,
                is_contract,
                entity,
                entity_logo,
                usd_value,
                percentage_relative_to_total_supply
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, data_to_insert)
        
        conn.commit()
        return len(data_to_insert)
    except sqlite3.Error as e:
        print(f"⚠️  批量保存失败: {e}")
        return 0


def get_database_stats(conn: sqlite3.Connection) -> Dict:
    """
    获取数据库统计信息
    
    Args:
        conn: 数据库连接对象
        
    Returns:
        统计信息字典
    """
    cursor = conn.cursor()
    
    # 总记录数
    cursor.execute("SELECT COUNT(*) FROM token_holders")
    total_count = cursor.fetchone()[0]
    
    # 非合约地址数量
    cursor.execute("SELECT COUNT(*) FROM token_holders WHERE is_contract = 0")
    non_contract_count = cursor.fetchone()[0]
    
    # 合约地址数量
    cursor.execute("SELECT COUNT(*) FROM token_holders WHERE is_contract = 1")
    contract_count = cursor.fetchone()[0]
    
    # 最大持有量
    cursor.execute("SELECT MAX(CAST(balance_formatted AS REAL)) FROM token_holders WHERE is_contract = 0")
    max_balance = cursor.fetchone()[0]
    
    return {
        "total": total_count,
        "non_contract": non_contract_count,
        "contract": contract_count,
        "max_balance": max_balance or 0
    }


def main():
    """主函数（优化版：全速请求模式）"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    db_filename = f"wbnb_holders_{timestamp}.db"
    
    print("=" * 70)
    print("🚀 开始获取WBNB代币持有者数据（全速模式）")
    print(f"📊 代币地址: {TOKEN_ADDRESS}")
    print(f"🔗 链: {CHAIN.upper()}")
    print(f"💾 数据库文件: {db_filename}")
    print(f"⚡ 请求间隔: {REQUEST_DELAY}秒 (0=全速)")
    print("=" * 70)
    print()
    
    # 初始化数据库
    print("📦 正在初始化数据库...")
    conn = init_database(db_filename)
    print("✅ 数据库初始化完成")
    print()
    
    start_time = time.time()
    cursor_value = None
    page = 0
    total_fetched = 0
    total_saved = 0
    last_print_time = start_time
    
    try:
        while True:
            page += 1
            
            # 获取数据
            data = fetch_token_holders(cursor_value)
            
            if not data:
                print("❌ 请求失败，停止获取")
                break
            
            # 提取结果
            holders = data.get("result", [])
            total_fetched += len(holders)
            
            if not holders:
                print("\n✅ 没有更多数据了")
                break
            
            # 过滤非合约地址
            non_contract_holders = filter_non_contract_addresses(holders)
            
            # 立即保存到数据库
            if non_contract_holders:
                saved_count = save_to_database(conn, non_contract_holders)
                total_saved += saved_count
            else:
                saved_count = 0
            
            # 显示进度（每秒最多更新一次，避免刷屏）
            current_time = time.time()
            elapsed = current_time - start_time
            
            if current_time - last_print_time >= 1.0 or page == 1:
                rate = page / elapsed if elapsed > 0 else 0
                eta_seconds = (elapsed / page * (total_fetched / LIMIT)) if page > 0 else 0
                eta_minutes = eta_seconds / 60
                
                print(f"✅ 第 {page:5d} 页 | "
                      f"获取: {len(holders):3d} | "
                      f"保存: {saved_count:3d} | "
                      f"累计: {total_saved:7d} | "
                      f"速度: {rate:.1f}页/秒 | "
                      f"耗时: {elapsed:.1f}秒", end='\r')
                last_print_time = current_time
            
            # 显示总供应量（第一页时）
            if page == 1 and "totalSupply" in data:
                print(f"\n   💰 代币总供应量: {data['totalSupply']}")
            
            # 检查是否有下一页
            cursor_value = data.get("cursor")
            if not cursor_value:
                print("\n✅ 已获取所有数据")
                break
            
            # 控制请求速度（如果设置了延迟）
            if REQUEST_DELAY > 0:
                time.sleep(REQUEST_DELAY)
        
        elapsed_time = time.time() - start_time
        
        # 获取最终数据库统计
        stats = get_database_stats(conn)
        
        print()
        print("=" * 70)
        print("📊 最终数据统计:")
        print(f"   ├─ 总页数: {page} 页")
        print(f"   ├─ API获取总数: {total_fetched} 条记录")
        print(f"   ├─ 数据库总记录: {stats['total']} 条")
        print(f"   ├─ 非合约地址: {stats['non_contract']} 条")
        print(f"   ├─ 合约地址: {stats['contract']} 条（已过滤）")
        print(f"   ├─ 最大持有量: {stats['max_balance']:.4f} WBNB")
        print(f"   ├─ 总耗时: {elapsed_time/60:.2f} 分钟 ({elapsed_time:.1f}秒)")
        print(f"   └─ 平均速度: {page/elapsed_time:.2f} 页/秒")
        print("=" * 70)
        print()
        print(f"✅ 数据已保存到数据库: {db_filename}")
        print(f"📂 数据库位置: {db_filename}")
        print()
        print("💡 查询示例:")
        print(f"   sqlite3 {db_filename}")
        print("   SELECT * FROM token_holders WHERE is_contract=0 ORDER BY CAST(balance_formatted AS REAL) DESC LIMIT 10;")
        print()
        print("🎉 任务完成！")
        
    except KeyboardInterrupt:
        print("\n\n⚠️  用户中断，正在保存已获取的数据...")
        stats = get_database_stats(conn)
        elapsed = time.time() - start_time
        print(f"✅ 已保存 {stats['non_contract']} 条非合约地址记录")
        print(f"⏱️  已运行 {elapsed/60:.2f} 分钟")
        return 1
    except Exception as e:
        print(f"\n❌ 发生错误: {e}")
        import traceback
        traceback.print_exc()
        return 1
    finally:
        # 关闭数据库连接
        conn.close()
    
    return 0


if __name__ == "__main__":
    exit(main())
