---
title: "Git 忽略规则与已跟踪文件处理"
description: ".gitignore 只影响未跟踪文件的默认发现和添加行为，不能自动把已提交文件从历史或暂存区删除。"
type: "experience"
module: "git"
moduleName: "Git"
area: "开发工具"
group: "版本控制"
knowledge: ["仓库维护"]
tags: ["Git","忽略规则","索引","gitignore"]
order: 10
---

# Git 忽略规则与已跟踪文件处理

.gitignore 只影响未跟踪文件的默认发现和添加行为，不能自动把已提交文件从历史或暂存区删除。

## 定位忽略来源

```bash
git check-ignore -v --no-index path/to/file
git ls-files -- path/to/file
```

规则可来自仓库 .gitignore、.git/info/exclude 或 core.excludesFile。团队共用规则提交到仓库，个人工具文件放在个人排除配置。`!` 反向匹配仍受父目录是否被忽略影响。

## 停止跟踪

确认文件应该保留在本地但不再跟踪时，可执行：

```bash
git rm --cached -- path/to/file
```

随后检查暂存差异并提交相应忽略规则。该操作不会抹掉过去提交中的文件，协作者更新到删除提交时仍需注意其工作区文件变化。敏感信息曾进入历史时，还需撤销凭证并独立评估历史清理。

### 版本变化与兼容

| 知识点                           | 边界                   | 方案                                       |
| -------------------------------- | ---------------------- | ------------------------------------------ |
| 忽略规则                         | 长期不适用于已跟踪文件 | 显式移除索引跟踪                           |
| assume-unchanged / skip-worktree | 不是通用本地忽略配置   | 不用于隐藏团队应知晓的修改                 |
| Git 版本                         | 诊断选项可能随版本增加 | 无 --no-index 时结合 ls-files 判断跟踪状态 |

依据：[gitignore](https://git-scm.com/docs/gitignore)、[git rm](https://git-scm.com/docs/git-rm)、[check-ignore](https://git-scm.com/docs/git-check-ignore)。

