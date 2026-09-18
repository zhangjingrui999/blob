---
title: "Redis 连接、权限与运行诊断"
description: "Redis 管理命令和业务命令应使用不同权限。连接成功只说明网络可达，还需确认目标实例、身份和配置。"
type: "basics"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["命令参考","服务器"]
tags: ["Redis","连接","服务管理","ACL","运维"]
order: 30
---

# Redis 连接、权限与运行诊断

Redis 管理命令和业务命令应使用不同权限。连接成功只说明网络可达，还需确认目标实例、身份和配置。

## 只读检查

```text
PING
INFO server
INFO memory
INFO replication
CLIENT INFO
SLOWLOG GET 10
```

INFO server 可查看 redis_version。AUTH 在 ACL 环境可携带用户名，凭证应来自受控配置。SELECT 用于逻辑数据库，但 Redis Cluster 只支持数据库 0；逻辑数据库不是安全隔离边界。

## 配置与诊断

CONFIG SET 是否立即生效、是否能持久化由具体参数及部署方式决定。受托管服务限制的命令不能照搬自建实例教程。MONITOR 会持续输出大量请求并可能暴露业务数据，不作为默认长期监控。FLUSHDB/FLUSHALL 是清空操作，不能作为例行“优化”。

### 版本变化与兼容

| 版本          | 变化                                | 兼容方案                               |
| ------------- | ----------------------------------- | -------------------------------------- |
| 6.0           | ACL 支持用户、命令和键范围权限      | 旧 requirepass 思路不能代替细粒度授权  |
| RESP2 / RESP3 | 返回值类型和订阅交互有差异          | 升级客户端时检查反序列化与协议配置     |
| 不同部署      | Cluster、Sentinel、托管服务入口不同 | 使用相应客户端模式，不硬编码单节点假设 |

依据：[ACL](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/)、[INFO](https://redis.io/docs/latest/commands/info/)、[SELECT](https://redis.io/docs/latest/commands/select/)。

