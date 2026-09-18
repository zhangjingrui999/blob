---
title: "Redis 发布订阅与消息可靠性"
description: "Pub/Sub 将消息发送给当前在线订阅者。它不持久化消息，也不替离线客户端保留待消费内容。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["消息通信"]
tags: ["Redis","发布订阅","消息","Streams","消息队列"]
order: 100
---

# Redis 发布订阅与消息可靠性

Pub/Sub 将消息发送给当前在线订阅者。它不持久化消息，也不替离线客户端保留待消费内容。

## 发布与订阅

```text
SUBSCRIBE news
```

在另一个连接中执行：

```text
PUBLISH news "hello"
```

PSUBSCRIBE 按模式订阅，UNSUBSCRIBE/PUNSUBSCRIBE 取消订阅。订阅模式和频道可能同时命中，应用需理解重复接收。PUBLISH 的返回数不代表业务处理成功。

## 适用范围

通知、在线刷新等允许错过消息的场景适合 Pub/Sub。订单处理、补偿任务需要持久化、确认和重试，应评估 Stream 或专用消息系统。消费者还需幂等，持久消息本身也不等于恰好一次业务执行。

### 版本变化与兼容

| 版本或协议 | 变化                       | 方案                                                    |
| ---------- | -------------------------- | ------------------------------------------------------- |
| RESP2      | 订阅连接允许的其他命令受限 | 业务请求与订阅使用不同连接                              |
| RESP3      | 订阅状态下可执行其他命令   | 客户端仍应正确分发推送消息                              |
| 5.0 / 7.0  | Stream / 分片 Pub/Sub      | 分片订阅需对应 SSUBSCRIBE、SPUBLISH；不要与普通频道混用 |

依据：[Pub/Sub 语义](https://redis.io/docs/latest/develop/pubsub/)、[XREADGROUP](https://redis.io/docs/latest/commands/xreadgroup/)。

