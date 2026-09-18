---
title: "CentOS Docker 安装与旧环境迁移"
description: "CentOS Linux 8 已结束维护，旧版依赖冲突记录不能作为新服务器的安装步骤。先确定操作系统，再选择对应官方仓库。"
type: "experience"
module: "docker"
moduleName: "Docker"
area: "运维"
group: "容器"
knowledge: ["安装排错"]
tags: ["Docker","CentOS 8","安装","过时"]
order: 20
---

# CentOS Docker 安装与旧环境迁移

CentOS Linux 8 已结束维护，旧版依赖冲突记录不能作为新服务器的安装步骤。先确定操作系统，再选择对应官方仓库。

## 当前安装路径

官方 CentOS 安装页目前列出受维护的 CentOS Stream 9/10。先检查 /etc/os-release 与架构；确认冲突软件包和现有容器数据；按对应发行版配置 Docker 仓库，再安装 Engine、CLI、containerd、Buildx 与 Compose 插件。

```bash
cat /etc/os-release
uname -m
docker version
docker compose version
```

后两条用于安装后的验证。生产环境应选定版本并验证升级路径，安装成功不代表服务已经启动。

## 依赖冲突处理

查看冲突包来源与版本，修正仓库组合；不要在 CentOS 中随意安装 Fedora RPM，也不要删除数据目录来“解决依赖”。卸载软件包和删除镜像、卷是不同操作。rootful Docker 的 docker 组具有高权限，授权范围需要明确。

### 版本变化与兼容

| 环境               | 状态                     | 方案                                         |
| ------------------ | ------------------------ | -------------------------------------------- |
| CentOS Linux 8     | 2021-12-31 EOL           | 迁移到受维护系统并验证业务                   |
| CentOS Stream 9/10 | 当前官方安装页列出的平台 | 采用匹配发行版仓库，不复用 CentOS 8 依赖补丁 |
| Compose            | 从独立 V1 到插件命令     | 安装 compose 插件，用 docker compose 检查    |

依据：[CentOS EOL](https://www.centos.org/centos-linux-eol/)、[Docker 安装要求](https://docs.docker.com/engine/install/centos/)。

