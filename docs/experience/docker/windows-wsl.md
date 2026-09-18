---
title: "Docker Desktop、WSL 2 与数据迁移"
description: "Windows 上的 Docker Desktop 应在受支持系统与虚拟化环境中安装。修改注册表伪装系统版本不会建立受支持的运行环境。"
type: "experience"
module: "docker"
moduleName: "Docker"
area: "运维"
group: "容器"
knowledge: ["安装排错"]
tags: ["Docker","Windows","WSL","过时"]
order: 30
---

# Docker Desktop、WSL 2 与数据迁移

Windows 上的 Docker Desktop 应在受支持系统与虚拟化环境中安装。修改注册表伪装系统版本不会建立受支持的运行环境。

## 环境检查

```powershell
wsl --version
wsl --status
wsl --list --verbose
docker version
```

检查硬件虚拟化、WSL 版本、Docker Desktop 后端和发行版集成。不要同时在同一 WSL 环境混装多个互相竞争的 Docker Engine。文件位于 Linux 文件系统与 Windows 挂载目录时，权限和性能也可能不同。

## 数据迁移

先确认当前 Desktop 的数据布局，停止写入并验证备份。优先通过 Settings 中的磁盘镜像位置设置迁移，完成后验证镜像、容器和卷内容。不要把 wsl --unregister 当作普通移动命令：它会删除发行版数据。

网络错误要看实际诊断日志、代理和 DNS，不能把 winsock reset 作为所有安装失败的通用修复。

### 版本变化与兼容

| 版本或环境                  | 变化                                                        | 方案                                             |
| --------------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| Desktop 4.30 之前的常见布局 | docker-desktop-data 保存数据                                | 先检查实际存在的发行版                           |
| Desktop 4.30+ 全新安装      | 不再必然创建 docker-desktop-data，改由 Desktop 管理虚拟磁盘 | 使用当前设置与备份流程；升级安装可能仍保留旧布局 |
| Windows/WSL                 | 支持门槛随 Desktop 更新                                     | 查当前要求，不依赖“所有 Win10 都支持”的结论      |

依据：[WSL 后端](https://docs.docker.com/desktop/features/wsl/)、[Windows 安装](https://docs.docker.com/desktop/setup/install/windows-install/)。

