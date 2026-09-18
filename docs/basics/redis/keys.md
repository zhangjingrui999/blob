---
title: "Redis 键扫描、过期、删除与迁移"
description: "键命名应表达业务域与实体，TTL 表达可失效时间，二者不能代替权限隔离和数据可靠性设计。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["命令参考","键管理"]
tags: ["Redis","键管理","过期","数据迁移"]
order: 90
---

# Redis 键扫描、过期、删除与迁移

键命名应表达业务域与实体，TTL 表达可失效时间，二者不能代替权限隔离和数据可靠性设计。

## 扫描与过期

```text
SCAN 0 MATCH cache:* COUNT 100
TYPE cache:profile:1
EXPIRE cache:profile:1 300
TTL cache:profile:1
PERSIST cache:profile:1
```

SCAN 从 0 开始，继续传返回的游标直到再次为 0；中途空结果不表示结束，也可能重复返回。COUNT 不是精确条数。KEYS 扫描整个数据库，不能当作生产请求的常规查询。

TTL/PTTL 分别返回秒/毫秒；-1 表示无过期，-2 表示不存在。EXPIRE 更新期限，PERSIST 移除期限。DUMP 序列化的内容不携带原 TTL，RESTORE 需单独指定。

## 删除与迁移

DEL 会同步处理删除，UNLINK 将主要内存释放工作放到后台。跨实例迁移要确认认证、网络、冲突覆盖和 TTL；Cluster 多键操作需满足同槽限制。TOUCH 更新访问统计，不会延长 TTL。

### 版本变化与兼容

| 版本 | 变化                           | 方案                                                 |
| ---- | ------------------------------ | ---------------------------------------------------- |
| 2.8  | SCAN、TTL 的不存在与无过期区分 | 老版本不能依赖相同返回码语义                         |
| 4.0  | UNLINK                         | 大键删除优先评估异步释放，仍需监测后台积压           |
| 7.0  | EXPIRE 支持 NX/XX/GT/LT        | 低版本条件更新用脚本，不用有竞态的读后写冒充原子操作 |

依据：[SCAN](https://redis.io/docs/latest/commands/scan/)、[EXPIRE](https://redis.io/docs/latest/commands/expire/)、[DUMP](https://redis.io/docs/latest/commands/dump/)。

