---
title: "Linux 用户、权限、umask 与 ACL"
description: "权限作用于用户身份和资源访问。目录上的 r/w/x 与普通文件含义不同，解决权限问题不应默认 chmod 777。"
type: "basics"
module: "linux"
moduleName: "Linux"
area: "运维"
group: "操作系统"
knowledge: ["系统管理"]
tags: ["Linux","用户","权限","ACL"]
order: 20
---

# Linux 用户、权限、umask 与 ACL

权限作用于用户身份和资源访问。目录上的 r/w/x 与普通文件含义不同，解决权限问题不应默认 chmod 777。

## 权限语义

| 权限 | 普通文件 | 目录                                 |
| ---- | -------- | ------------------------------------ |
| r    | 读取内容 | 列出目录项名称                       |
| w    | 修改内容 | 创建、删除或重命名目录项，通常还需 x |
| x    | 执行     | 遍历并访问已知路径                   |

文件能否删除主要取决于父目录权限和 sticky bit 等约束，不只是文件自身是否可写。权限位按 owner/group/others 分组，r=4、w=2、x=1。

```bash
id
umask
ls -ld ./docs
```

## 授权策略

umask 从程序请求的权限中去除位，不给普通新文件自动增加执行权限。共享目录可通过组、setgid 和默认 ACL 管理；ACL mask 也可能限制实际权限。sudo 按明确命令授权，用 visudo 检查配置。SELinux/AppArmor 和挂载选项可能在传统权限允许后继续拒绝访问。

### 版本变化与兼容

| 能力           | 差异                                         | 方案                                   |
| -------------- | -------------------------------------------- | -------------------------------------- |
| POSIX 权限     | 长期稳定，不依赖单一内核大版本               | 理解位语义，避免只背数字               |
| ACL / 安全模块 | 取决于文件系统、挂载和发行版                 | 检查 getfacl、审计日志及实际支持       |
| 容器用户       | UID 映射、rootless、用户命名空间影响宿主权限 | 对照宿主与容器 UID，不盲目递归修改权限 |

依据：[Linux inode 权限](https://man7.org/linux/man-pages/man7/inode.7.html)、[ACL](https://man7.org/linux/man-pages/man5/acl.5.html)、[umask](https://man7.org/linux/man-pages/man2/umask.2.html)。

