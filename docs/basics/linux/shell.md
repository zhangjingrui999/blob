---
title: "Linux 包管理、归档与 Shell 引用"
description: "Shell 会先执行变量展开、通配符和命令替换，再运行命令。路径带空格或来自变量时，引用方式直接影响操作对象。"
type: "basics"
module: "linux"
moduleName: "Linux"
area: "运维"
group: "操作系统"
knowledge: ["系统管理"]
tags: ["Linux","软件包","Shell"]
order: 30
---

# Linux 包管理、归档与 Shell 引用

Shell 会先执行变量展开、通配符和命令替换，再运行命令。路径带空格或来自变量时，引用方式直接影响操作对象。

## 脚本与管道

```bash
#!/usr/bin/env bash
target_dir='./docs'
if [ -d "$target_dir" ]; then
  printf '%s\n' "$target_dir"
  find "$target_dir" -type f -name '*.md'
fi
```

单引号保留字面量，双引号仍允许变量和命令替换但阻止分词与通配展开。区分 stdout 与 stderr，管道默认只传 stdout。不要用解析 ls 输出的方式处理任意文件名；需要自动传递文件路径时考虑 NUL 分隔。

## 软件包与归档

Debian 系常用 apt，RPM 系常用 dnf/yum，命令不能跨发行版机械复用。RPM 单包安装不等于完整依赖解析。解压前先列出归档内容，确认目标目录和可能覆盖的路径。tar -czf 创建 gzip 归档，tar -tzf 查看，tar -xzf 解压。

### 版本变化与兼容

| 环境              | 差异                                           | 方案                               |
| ----------------- | ---------------------------------------------- | ---------------------------------- |
| sh / Bash         | 数组、[[ ]]、pipefail 等不能假定所有 sh 都支持 | 写明解释器或使用 POSIX 语法        |
| yum / dnf / dnf5  | 插件和子命令参数存在变化                       | 根据本机帮助选择仓库配置方式       |
| GNU / BusyBox tar | 压缩和额外选项支持不同                         | 检查版本与帮助，不依赖任意平台通用 |

依据：[Bash 手册](https://www.gnu.org/software/bash/manual/bash.html)、[GNU tar](https://www.gnu.org/software/tar/manual/tar.html)。

