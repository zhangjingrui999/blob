---
title: "Docker 镜像、容器、网络与数据卷"
description: "镜像是分层模板，容器是基于镜像运行的实例；容器可写层不适合保存唯一业务数据。持久数据应放入受管理的数据卷或明确的绑定挂载。"
type: "basics"
module: "docker"
moduleName: "Docker"
area: "运维"
group: "容器"
knowledge: ["容器基础"]
tags: ["Docker","镜像","容器","废弃","数据卷","BuildKit"]
order: 10
---

# Docker 镜像、容器、网络与数据卷

镜像是分层模板，容器是基于镜像运行的实例；容器可写层不适合保存唯一业务数据。持久数据应放入受管理的数据卷或明确的绑定挂载。

## 生命周期与诊断

```bash
docker version
docker info
docker image ls
docker container ls -a
docker logs --tail 100 web
docker inspect web
```

web 需替换为已有容器名。run 创建并启动新容器，start 启动已有容器，exec 在运行容器中执行进程。stop 请求正常终止，kill 强制发送信号；删除容器和删除镜像是不同操作。

## 构建与运行

Dockerfile 中 COPY 复制构建上下文文件，RUN 在构建时执行，CMD 指定默认启动命令。使用 .dockerignore 排除无关文件，分阶段构建减少运行镜像内容；镜像 tag 可变，需要可复现时固定 digest 并定期更新。

端口映射区分宿主和容器端口；容器内 localhost 指向自身。自定义网络可通过容器/服务名通信。数据卷要独立备份，不能把 docker export 当作卷备份。

### 版本变化与兼容

| 知识点 | 历史状态                       | 当前方案                                            |
| ------ | ------------------------------ | --------------------------------------------------- |
| --link | 旧容器链接是遗留能力           | 用户自定义网络与服务名解析                          |
| 构建   | 经典构建器与 BuildKit 能力不同 | 使用 buildx/BuildKit，并核对缓存、secret 和平台支持 |
| 清理   | prune 会删除符合条件的资源     | 先确认对象及卷，不能作为常规故障修复万能命令        |

依据：[Docker 概念](https://docs.docker.com/get-started/docker-concepts/)、[旧链接](https://docs.docker.com/engine/network/links/)、[数据卷](https://docs.docker.com/engine/storage/volumes/)。

