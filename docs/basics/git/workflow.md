---
title: "Git 工作区、提交、分支与协作"
description: "Git 的工作区、暂存区和提交历史是三个层次。提交记录暂存内容，不会自动收录所有工作区修改。"
type: "basics"
module: "git"
moduleName: "Git"
area: "开发工具"
group: "版本控制"
knowledge: ["版本控制基础"]
tags: ["Git","分支","提交","远程仓库","Git 2.23","协作"]
order: 20
---

# Git 工作区、提交、分支与协作

Git 的工作区、暂存区和提交历史是三个层次。提交记录暂存内容，不会自动收录所有工作区修改。

## 本地流程

```bash
git status --short
git diff
git add path/to/file
git diff --cached
git commit -m "说明本次变化"
```

这些是供读者按实际仓库执行的示例。分支是指向提交的可移动引用；HEAD 通常指向当前分支。fetch 获取远端信息，不自动合并到工作区；pull 会按配置进行合并或变基。

## 协作与恢复

开始修改前确认当前分支及本地改动。合并冲突应理解两侧意图并验证结果。revert 生成反向提交，适合撤销已共享提交；reset 可以移动分支或改变暂存区/工作区，模式影响不同。reflog 可辅助定位近期引用变动，但不是永久备份。

### 版本变化与兼容

| 版本或行为 | 变化                                              | 方案                                        |
| ---------- | ------------------------------------------------- | ------------------------------------------- |
| Git 2.23   | switch / restore 将 checkout 的分支和文件职责拆开 | 旧版可用 checkout 对应形式；checkout 未废弃 |
| 默认分支   | 不同配置可能为 main/master 或其他名称             | 查实际远端 HEAD，不硬编码                   |
| 共享历史   | rebase/amend 重写提交身份                         | 团队协商后使用；撤销共享变更通常用 revert   |

依据：[Git 概念](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)、[switch](https://git-scm.com/docs/git-switch)、[restore](https://git-scm.com/docs/git-restore)。

