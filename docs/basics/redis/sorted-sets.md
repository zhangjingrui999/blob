---
title: "Redis Sorted Set 排行榜与范围查询"
description: "Sorted Set 为唯一成员关联浮点分数，按分数排序；同分成员按字节字典序排列。更新分数不会新增相同成员。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["数据类型","Sorted Set"]
tags: ["Redis","有序集合","排行榜","废弃"]
order: 80
---

# Redis Sorted Set 排行榜与范围查询

Sorted Set 为唯一成员关联浮点分数，按分数排序；同分成员按字节字典序排列。更新分数不会新增相同成员。

## 排行榜

```text
ZADD ranking 100 alice 90 bob
ZINCRBY ranking 15 bob
ZRANGE ranking 0 9 REV WITHSCORES
ZRANGE ranking 90 120 BYSCORE WITHSCORES
ZRANK ranking alice
```

前两条范围查询分别按排名与分数，示例范围选项需要 Redis 6.2+。排名从 0 开始；分数区间默认包含端点，开区间使用括号前缀。REV 的分数范围参数顺序为高到低。BYLEX 只适用于需要字典序且分数相同的集合设计。

## 设计边界

精确大整数可能超过双精度分数的精确表示范围，不要把任意大 id 当分数。分页要考虑写入导致名次变化；复合排序可以使用明确的同分成员编码，但需定义稳定规则。

### 版本变化与兼容

| 版本 | 变化                                          | 方案                                                    |
| ---- | --------------------------------------------- | ------------------------------------------------------- |
| 6.2  | ZRANGE 统一 BYSCORE/BYLEX/REV，旧范围命令弃用 | 旧服务用 ZREVRANGE/ZRANGEBYSCORE 等，迁移时调整参数顺序 |
| 7.2  | ZRANK/ZREVRANK 增加 WITHSCORE                 | 更低版本另查 ZSCORE，注意两次读取间可能更新             |

依据：[ZRANGE](https://redis.io/docs/latest/commands/zrange/)、[ZRANK](https://redis.io/docs/latest/commands/zrank/)。

