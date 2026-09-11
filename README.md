# Code Blog

基于 VitePress 1.6.4 与 Vue 3 的技术知识库，使用 npm，公开内容位于 `docs/`。

## 本地开发与验证

```sh
npm run dev
npm run build
npm run preview
npm test
npm run check:build
```

`build` 生成 `.vitepress/dist/`，不执行发布。现有 GitHub Actions 工作流在默认分支推送后构建并发布 GitHub Pages。

## 代码格式化

Prettier 作为固定版本的开发依赖安装，配置入口为 `.prettierrc.json`，忽略规则为 `.prettierignore`。

规则采用 2 空格缩进、JS 单引号、不加分号、不保留尾逗号、LF 换行和 100 字符目标行宽。Markdown 保留原有段落换行，Vue 的 script 与 style 内容不额外缩进。

```sh
# 检查项目格式，不修改文件
npm run format:check

# 按配置格式化项目（会修改文件）
npm run format

# 仅处理指定文件
npm exec -- prettier --write .vitepress/config.mjs
```

依赖、构建产物、锁文件和本地协作资料不参与格式化。

## 集中管理分类与标签

唯一入口为 `.vitepress/content.config.js`：

- `contentTypes`：基础知识、经验的显示名称与说明。
- `categories`：共用分类树，包括领域、可选分组和技术模块。
- `tags`：标签 ID 与显示名称。
- `modules`、`allCategories`：从分类树派生，不单独维护。

添加模块后，首页入口、筛选、知识模块页面会自动生成。修改显示名称不会改变 URL；修改 ID 则需要同步文章引用并处理旧链接。

## 新增文章

基础文章放在 `docs/basics/<模块>/`，经验文章放在 `docs/experience/<模块>/`。元数据示例：

```yaml
---
title: 文章标题
description: 一句话摘要
type: experience
module: php
relatedModules: [redis]
tags: [缓存, 性能优化]
order: 10
---
```

`type`、`module`、`tags`、`relatedModules` 引用集中配置中的 ID。领域由模块派生，不需要重复填写。`relatedModules` 可选；`order` 越小越靠前。`example: true` 标记示例文章。现有文章均为可替换的入门或场景示例，无虚构发布日期。

文章必须有标题和摘要。构建时检查无效分类、模块、关联模块和标签引用。未注册标签先加入集中配置，再绑定文章；页面上的候选标签由当前范围内文章自动去重汇总。

## 生成链路与搜索规则

`docs/**/*.md` → `.vitepress/data/` 构建时加载器 → 文章元数据与独立全文数据 → 公共组件。

首页与目录使用轻量元数据；搜索视图按需加载全文数据。中文支持包含匹配，空格分开的多个关键词需全部命中；英文词支持一个字符的插入、删除或替换。标题优先于摘要与正文。结果按文章去重。

标签候选为当前类型、模块、关键词范围内经验文章标签的并集；多标签筛选要求同时满足。搜索条件通过查询参数保存，支持刷新、分享和浏览器前进后退。

不使用后端、数据库、额外搜索服务。修改文章后需重新构建，索引与标签统计才会更新。

## 页面与公共样式

- `.vitepress/theme/Layout.vue`：公共页面框架、页头、页脚。
- `.vitepress/theme/components/`：导航、搜索框、分类网格、筛选与文章列表。
- `.vitepress/theme/pages/`：首页、目录、模块、搜索与阅读页面。
- `.vitepress/theme/styles/tokens.css`：字体、颜色、间距相关令牌与深浅色主题。
- `.vitepress/theme/styles/base.css`：公共控件与 Markdown 阅读样式。
- `.vitepress/theme/styles/layout.css`：公共布局与手机断点。

样式沿用默认主题的 Markdown 与代码块能力，组件局部样式使用 scoped CSS。全文索引没有外部网络依赖。

## 部署路径

保留 `.html` 页面链接，模块页面在构建时实际生成，可直接访问或刷新。通过 `PAGES_BASE_PATH` 设置 GitHub Pages 子路径；不设置时为根路径。页面内部链接统一经过 `withBase` 处理。

内容源与协作说明分离，`README.md`、`AGENTS.md` 和测试文件不会生成公开页面。构建产物不得手工修改。
