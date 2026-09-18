---
title: "Redis String、计数与条件写入"
description: "String 可保存文本、二进制数据和数字表示。SET 会覆盖键值并通常清除已有 TTL，不能假定更新后自动保留过期时间。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["数据类型","String"]
tags: ["Redis","字符串","位运算","废弃","原子操作"]
order: 40
---

# Redis String、计数与条件写入

String 可保存文本、二进制数据和数字表示。SET 会覆盖键值并通常清除已有 TTL，不能假定更新后自动保留过期时间。

## 常用操作

```text
SET cache:profile:1 "Ada" EX 300
GET cache:profile:1
SET job:1:lock "unique-owner-token" NX PX 30000
INCR page:views
MGET cache:profile:1 cache:profile:2
```

NX 仅不存在时写入，XX 仅存在时写入。INCR 是单命令原子计数，但 INCR 后 EXPIRE 两条命令不自动构成整体原子操作；需要脚本或事务设计。MGET/MSET 在 Cluster 中有同槽约束。

## 字符串与位操作

APPEND 追加，STRLEN 返回字节长度；GETRANGE 使用闭区间索引。位图是字符串上的位操作，偏移量决定内存增长，不能把巨大稀疏用户 id 直接当位偏移。

### 版本变化与兼容

| 版本      | 变化                                 | 方案                                                        |
| --------- | ------------------------------------ | ----------------------------------------------------------- |
| 2.6.12    | SET 支持 EX/PX/NX/XX，SETEX 标为弃用 | 用单条 SET 同时写入及设置 TTL                               |
| 6.0 / 6.2 | KEEPTTL / GET、EXAT、PXAT            | 保留 TTL 显式使用 KEEPTTL；GETSET 用 SET GET 替代           |
| 8.4       | SET 新增 IFEQ/IFNE 等条件选项        | 按服务器和客户端支持检测；旧版本条件更新用脚本或 WATCH 重试 |

依据：[SET 及命令历史](https://redis.io/docs/latest/commands/set/)、[SETEX](https://redis.io/docs/latest/commands/setex/)、[GETSET](https://redis.io/docs/latest/commands/getset/)。

