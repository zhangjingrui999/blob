---
title: "Redis List 与可恢复队列"
description: "List 是有序字符串序列，两端推入和弹出适合简单队列。原子弹出不会自动提供任务完成确认。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["数据类型","List"]
tags: ["Redis","列表","队列","废弃","消息队列"]
order: 60
---

# Redis List 与可恢复队列

List 是有序字符串序列，两端推入和弹出适合简单队列。原子弹出不会自动提供任务完成确认。

## 队列与范围

```text
LPUSH jobs "job-1"
BRPOP jobs 5
LRANGE jobs 0 9
LLEN jobs
```

LPUSH 与 RPOP/BRPOP 组合可按先进先出消费；LRANGE 的结束下标包含在范围内。LREM 按方向和数量删除匹配值；大范围操作成本随数据量增长。

## 可靠处理

消费者取出后崩溃可能丢失任务。可使用 BLMOVE 将任务原子移入 processing 列表，完成后删除，并设计超时回收与幂等处理。不要仅靠一次阻塞弹出宣称“消息不丢”。需要消费者组与待确认跟踪时评估 Stream。

### 版本变化与兼容

| 版本 | 变化                                    | 方案                                           |
| ---- | --------------------------------------- | ---------------------------------------------- |
| 5.0  | 引入 Stream                             | 复杂消费语义可从列表方案迁移                   |
| 6.2  | LMOVE/BLMOVE；RPOPLPUSH/BRPOPLPUSH 弃用 | 旧方向等价于 RIGHT → LEFT，阻塞版本还需传超时  |
| 7.0  | LMPOP/BLMPOP                            | 旧服务器使用对应单键弹出或循环，注意原子性差别 |

依据：[LMOVE](https://redis.io/docs/latest/commands/lmove/)、[BLMOVE](https://redis.io/docs/latest/commands/blmove/)、[BLMPOP](https://redis.io/docs/latest/commands/blmpop/)。

