---
title: "Redis 基数统计、GEO、事务与复制"
description: "高级功能的关键是理解误差、原子性与故障语义。近似统计不是精确集合，事务不提供 SQL 式回滚，异步复制不保证副本立即一致。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["高级应用"]
tags: ["Redis","GEO","事务","主从复制","废弃","一致性"]
order: 120
---

# Redis 基数统计、GEO、事务与复制

高级功能的关键是理解误差、原子性与故障语义。近似统计不是精确集合，事务不提供 SQL 式回滚，异步复制不保证副本立即一致。

## HyperLogLog 与 GEO

PFADD/PFCOUNT 用于近似去重计数，标准误差约 0.81%；最大密集表示约 12KB，加上键和对象开销，不能理解为总内存始终恰好 12KB。它不保留可枚举的原成员。

```text
GEOADD places 116.4 39.9 beijing
GEOSEARCH places FROMMEMBER beijing BYRADIUS 10 km WITHDIST
```

经度在前、纬度在后；GEO 不是完整地理信息系统，坐标系应保持一致。

### 版本变化与兼容：数据结构

| 版本        | 变化               | 方案                                             |
| ----------- | ------------------ | ------------------------------------------------ |
| 2.8.9 / 3.2 | HyperLogLog / GEO  | 更低版本需要其他实现                             |
| 6.2         | GEORADIUS 系列弃用 | GEOSEARCH / GEOSEARCHSTORE；旧服务器按原命令调用 |

依据：[HyperLogLog](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/)、[GEOSEARCH](https://redis.io/docs/latest/commands/geosearch/)。

## 事务与复制

MULTI 将命令入队，EXEC 连续执行；入队阶段错误与执行期错误不同。执行期某条命令失败不会撤销其他已执行命令。WATCH 用于乐观并发检查，失败后由客户端重试。脚本可提供组合原子操作，但长脚本会阻塞其他工作。

复制通常异步；全量同步涉及资源开销，不能概括为永不阻塞。副本读可能滞后，故障切换可能丢失未复制写入。WAIT 提高复制确认程度，不把系统变成强一致数据库。

### 版本变化与兼容：复制

| 版本  | 变化                          | 方案                                 |
| ----- | ----------------------------- | ------------------------------------ |
| 5.0   | SLAVEOF 弃用                  | 使用 REPLICAOF，核对配置同义项       |
| 6.0.9 | 被 WATCH 的键过期也会中止事务 | 旧版本不能假定完全相同的冲突检测行为 |

依据：[事务](https://redis.io/docs/latest/develop/using-commands/transactions/)、[复制](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)、[SLAVEOF](https://redis.io/docs/latest/commands/slaveof/)。

