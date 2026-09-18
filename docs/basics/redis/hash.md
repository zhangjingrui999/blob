---
title: "Redis Hash 字段读写与过期"
description: "Hash 适合保存同一实体的多个字段。字段值仍是字符串语义；需要复杂嵌套结构时应明确序列化或选择其他数据模型。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["数据类型","Hash"]
tags: ["Redis","哈希","废弃","字段过期"]
order: 50
---

# Redis Hash 字段读写与过期

Hash 适合保存同一实体的多个字段。字段值仍是字符串语义；需要复杂嵌套结构时应明确序列化或选择其他数据模型。

## 读写与计数

```text
HSET user:1 name Ada score 10
HGET user:1 name
HMGET user:1 name score
HEXISTS user:1 name
HINCRBY user:1 score 2
HDEL user:1 score
```

HSET 返回新增字段数量，不是成功更新的字段总数；更新已有字段可能返回 0。HGETALL 一次读取全部字段，超大 Hash 应使用 HSCAN 或拆分。键 TTL 与字段 TTL 是两层概念。

### 版本变化与兼容

| 版本       | 变化                        | 方案                                               |
| ---------- | --------------------------- | -------------------------------------------------- |
| 4.0        | HSET 支持多字段；HMSET 弃用 | 多字段写入统一 HSET，调整返回值判断                |
| 7.4        | HEXPIRE 等字段过期命令      | 低版本可拆独立键，不能用 EXPIRE 假装只过期一个字段 |
| 客户端版本 | 封装可能落后服务端          | 升级客户端或使用受支持的原始命令接口，验证响应类型 |

依据：[HSET](https://redis.io/docs/latest/commands/hset/)、[HEXPIRE](https://redis.io/docs/latest/commands/hexpire/)、[Hash](https://redis.io/docs/latest/develop/data-types/hashes/)。

