---
title: "Redis Set 去重与集合运算"
description: "Set 保存唯一字符串成员，不保证返回顺序。适合标签、关系与精确去重，不能把迭代次序当作业务排序。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["数据类型","Set"]
tags: ["Redis","集合","去重","集合运算"]
order: 70
---

# Redis Set 去重与集合运算

Set 保存唯一字符串成员，不保证返回顺序。适合标签、关系与精确去重，不能把迭代次序当作业务排序。

## 成员和集合

```text
SADD tags:article:1 redis cache
SISMEMBER tags:article:1 redis
SCARD tags:article:1
SINTER tags:article:1 tags:article:2
SUNION tags:article:1 tags:article:2
SDIFF tags:article:1 tags:article:2
```

SADD 返回新加入数量。SPOP 随机移除成员，SRANDMEMBER 随机读取而不移除；使用 count 时要核对重复与返回类型。SMEMBERS 返回全部成员，大集合用 SSCAN；集合交并差成本受输入规模影响。

### 版本变化与兼容

| 版本 | 能力变化                    | 方案                                                         |
| ---- | --------------------------- | ------------------------------------------------------------ |
| 2.8  | SSCAN 游标遍历              | 去重处理结果，COUNT 只是工作量提示                           |
| 6.2  | SMISMEMBER 批量判断         | 旧环境逐项 SISMEMBER，可用 pipeline 降低往返但不增加事务语义 |
| 7.0  | SINTERCARD 直接计算交集基数 | 旧环境 SINTER 再计数成本更高；大集合避免拉全量               |

依据：[Set](https://redis.io/docs/latest/develop/data-types/sets/)、[SINTERCARD](https://redis.io/docs/latest/commands/sintercard/)、[SMISMEMBER](https://redis.io/docs/latest/commands/smismember/)。

