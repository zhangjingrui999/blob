---
title: "Redis 安装、版本确认与 PHP 客户端"
description: "服务器 Redis、命令行 redis-cli 和 PHP 扩展 phpredis 是不同组件。连接失败时分别检查它们，而不是只看扩展是否启用。"
type: "experience"
module: "redis"
moduleName: "Redis"
area: "数据库"
group: "缓存"
knowledge: ["安装实践"]
tags: ["Redis","安装","PHP","过时"]
order: 20
---

# Redis 安装、版本确认与 PHP 客户端

服务器 Redis、命令行 redis-cli 和 PHP 扩展 phpredis 是不同组件。连接失败时分别检查它们，而不是只看扩展是否启用。

## 安装与排查

1. 从官方安装指引选择目标平台和受支持版本，固定软件源或容器镜像版本。
2. 限制监听地址和网络访问，配置认证及持久化目录。
3. 使用 redis-cli 的 PING 和 INFO server 确认服务及版本。
4. PHP 侧用 php --ri redis 检查扩展；FPM/Apache 可能与 CLI 加载不同配置。
5. 设置连接和读超时，验证序列化选项，确认键的 TTL 和数据类型。

PHP 的 Redis 类来自 phpredis 扩展；Predis 是另一种 Composer 客户端，API 与部署方式不能混用。不要直接把旧 Windows DLL 复制到任意 PHP：版本、架构、线程安全与 ABI 需匹配。

### 版本变化与兼容

| 环境                          | 历史状态                 | 当前方案                                                   |
| ----------------------------- | ------------------------ | ---------------------------------------------------------- |
| MicrosoftArchive Windows 移植 | 仓库归档，属于历史实现   | 按官方 Windows 指引选择 WSL 等环境；不当作当前原生官方构建 |
| Redis 新命令                  | 服务端与客户端版本不同步 | 同时核对服务器支持和客户端方法                             |
| PHP 扩展                      | 随 PHP ABI 演进          | 使用匹配运行时的受维护扩展包                               |

依据：[Windows 安装](https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-on-windows/)、[phpredis](https://github.com/phpredis/phpredis)、[历史移植](https://github.com/microsoftarchive/redis)。

