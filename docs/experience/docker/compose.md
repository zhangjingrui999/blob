---
title: "Docker Compose 配置、启动与版本迁移"
description: "Compose 用声明式文件描述服务、网络和卷。CLI 版本与历史文件格式版本是两套编号，不能把 version: \"3\" 当成 Compose CLI 3。"
type: "experience"
module: "docker"
moduleName: "Docker"
area: "运维"
group: "容器"
knowledge: ["编排实践"]
tags: ["Docker","Compose","过时","废弃"]
order: 40
---

# Docker Compose 配置、启动与版本迁移

Compose 用声明式文件描述服务、网络和卷。CLI 版本与历史文件格式版本是两套编号，不能把 version: "3" 当成 Compose CLI 3。

## 最小配置与验证

以下 compose.yaml 用于本机静态页面开发，需存在 public 目录；镜像小版本或 digest 应按项目锁定。

```yaml
services:
  web:
    image: nginx:stable-alpine
    ports:
      - "127.0.0.1:8080:80"
    volumes:
      - ./public:/usr/share/nginx/html:ro
```

```bash
docker compose config
docker compose up -d
docker compose ps
docker compose logs --tail 100
```

config 检查解析结果；环境变量插值和容器环境变量不是同一层。depends_on 的简单形式只表达启动顺序，不保证数据库已可接收请求；配合 healthcheck 或应用重试。down 与 down -v 对卷的影响不同。

### 版本变化与兼容

| 版本 | 变化                                                   | 方案                                                 |
| ---- | ------------------------------------------------------ | ---------------------------------------------------- |
| V1   | Python 实现，docker-compose；已停止支持                | 迁移到 docker compose，检查脚本和生成的容器名        |
| V2   | Go 插件，按 Compose Specification 解析                 | 顶层 version 已过时，仅具提示性质，可删除            |
| V5   | 官方记录 2025 年发布，主要新增 Go SDK，CLI 功能延续 V2 | 同样使用 docker compose；具体新字段核对最低 CLI 版本 |

依据：[Compose 历史](https://docs.docker.com/compose/intro/history/)、[version 字段](https://docs.docker.com/reference/compose-file/version-and-name/)、[启动顺序](https://docs.docker.com/compose/how-tos/startup-order/)。

