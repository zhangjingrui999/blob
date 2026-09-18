---
title: "Linux 文件系统、路径与日常命令"
description: "Linux 是内核，发行版组合用户空间工具和包管理。不能用“Linux 只有命令行、Windows 只有图形界面”区分两者。"
type: "basics"
module: "linux"
moduleName: "Linux"
area: "运维"
group: "操作系统"
knowledge: ["系统基础"]
tags: ["Linux","命令行","文件系统"]
order: 10
---

# Linux 文件系统、路径与日常命令

Linux 是内核，发行版组合用户空间工具和包管理。不能用“Linux 只有命令行、Windows 只有图形界面”区分两者。

## 路径与文件

绝对路径从 / 开始，相对路径基于当前工作目录。/etc 常放配置，/var 放可变数据，/home 是普通用户目录；具体布局以发行版为准。隐藏文件通常以点开头，扩展名不决定可执行权限。

```bash
pwd
ls -lah
file ./README.md
stat ./README.md
df -h
du -sh ./docs
```

示例路径需存在。df 查看文件系统使用情况，du 统计目录可见数据量，二者可能因已删除仍打开文件等原因不同。硬链接引用同一 inode，符号链接保存目标路径；删除链接通常不会删除目标。

## 查找与排查

使用 find 按文件属性查找，rg/grep 查文本，less 阅读大文件。网络检查区分地址、路由、DNS 和应用端口。命令的错误码与标准错误输出应一起检查，不以“没有打印内容”判断成功。

### 版本变化与兼容

| 环境                | 差异                                  | 方案                                     |
| ------------------- | ------------------------------------- | ---------------------------------------- |
| GNU / BSD / BusyBox | 同名工具选项可能不同                  | 以目标机器 man/--help 为准               |
| 旧网络工具          | ifconfig/netstat 在许多发行版需额外包 | 优先了解 ip/ss，旧工具不因此被一概判废弃 |
| Init 系统           | SysV 与 systemd 命令不同              | 先识别系统，不给容器强套 systemctl       |

依据：[GNU Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html)、[Linux 手册项目](https://www.kernel.org/doc/man-pages/)。

