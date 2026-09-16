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

规则采用 2 空格缩进、JS 单引号、不加分号、不保留尾逗号、LF 换行和 100 字符目标行宽。Markdown 保留原有段落换行，Vue 的 script 与
style 内容不额外缩进。

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

`type`、`module`、`tags`、`relatedModules` 引用集中配置中的 ID。领域由模块派生，不需要重复填写。`relatedModules` 可选；`order`
越小越靠前。`example: true` 标记示例文章。现有文章均为可替换的入门或场景示例，无虚构发布日期。

文章必须有标题和摘要。构建时检查无效分类、模块、关联模块和标签引用。未注册标签先加入集中配置，再绑定文章；页面上的候选标签由当前范围内文章自动去重汇总。

## 生成链路与搜索规则

`docs/**/*.md` → `.vitepress/data/` 构建时加载器 → 文章元数据与独立全文数据 → 公共组件。

首页与目录使用轻量元数据；搜索视图按需加载全文数据。中文支持包含匹配，空格分开的多个关键词需全部命中；英文词支持一个字符的插入、删除或替换。标题优先于摘要与正文。结果按文章去重。

基础知识与经验分享分别拥有入口、搜索和详情页面，共用列表、搜索框、标签筛选与正文阅读组件。基础知识保留完整的领域、分组、模块层级，经验分享默认省略中间分组；展示差异由 `contentTypes.grouped` 集中配置。入口页与模块目录中的查询进入对应类型搜索页，携带当前模块和筛选条件。

标签候选为当前类型、模块、关键词范围内文章标签的并集；多标签筛选要求同时满足。搜索条件通过查询参数保存，支持刷新、分享和浏览器前进后退。

不使用后端、数据库、额外搜索服务。修改文章后需重新构建，索引与标签统计才会更新。

## 页面与公共样式

- `.vitepress/theme/Layout.vue`：根据页面元数据选择页面，组合公共导航和页脚。
- `.vitepress/theme/components/AppHeader.vue`、`AppFooter.vue`：公共导航与页脚。
- `.vitepress/theme/components/ContentList.vue`、`ArticleReader.vue`：公共检索列表与正文阅读组件。
- `.vitepress/theme/pages/HomePage.vue`、`GlobalSearchPage.vue`：首页与全站搜索。
- `.vitepress/theme/pages/basics/`：基础知识入口、搜索、详情及模块目录页面。
- `.vitepress/theme/pages/experience/`：经验分享入口、搜索及详情页面。
- `.vitepress/theme/utils/navigation.js`：内容类型识别、搜索目标路径和当前搜索范围。
- `.vitepress/theme/styles/tokens.css`：字体、颜色、间距相关令牌与深浅色主题。
- `.vitepress/theme/styles/base.css`：公共控件与 Markdown 阅读样式。
- `.vitepress/theme/styles/layout.css`：公共布局与手机断点。

样式沿用默认主题的 Markdown 与代码块能力，组件局部样式使用 scoped CSS。全文索引没有外部网络依赖。

## 页面入口与搜索范围

| 页面             | 地址                         | 元数据                                                  |
| ---------------- | ---------------------------- | ------------------------------------------------------- |
| 首页             | `/`                          | `pageKind: home`                                        |
| 全站搜索         | `/search.html`               | `pageKind: search`                                      |
| 基础知识入口     | `/basics/`                   | `pageKind: knowledge`                                   |
| 基础知识搜索     | `/basics/search.html`        | `pageKind: search`、`type: basics`                      |
| 基础知识模块目录 | `/basics/<module>.html`      | `pageKind: module`                                      |
| 经验分享入口     | `/experience/`               | `pageKind: experience`                                  |
| 经验分享搜索     | `/experience/search.html`    | `pageKind: search`、`type: experience`                  |
| 文章详情         | 沿用 Markdown 文件生成的地址 | `type: basics` 或 `type: experience`，不填写 `pageKind` |

导航搜索按领域列出全部技术模块，默认选中当前模块；搜索页恢复现有多选范围，没有具体范围的入口页默认全选。用户可以追加或取消任意模块，包括当前模块；未选择任何模块时提示先选择，避免意外扩大范围。内容类型可独立选择基础知识、经验分享或全站内容。选择全站内容并全选模块即可搜索全站。

多模块使用重复查询参数，例如 `?module=php&module=vue`，按任意模块命中取并集，同一文章不会重复。关键词和标签继续共同限定结果，刷新和前进后退可恢复范围；旧单模块链接继续有效。标签链接进入文章所属类型的搜索页。

两类详情页可独立组合定制组件。公共 `ArticleReader` 提供 `before-content`、`after-content` 插槽，定制区域无需复制正文与阅读样式。新搜索页面在构建时生成真实 HTML，不改变已有文章和模块目录地址。

## 部署路径

保留 `.html` 页面链接，模块页面在构建时实际生成，可直接访问或刷新。通过 `PAGES_BASE_PATH` 设置 GitHub Pages
子路径；不设置时为根路径。页面内部链接统一经过 `withBase` 处理。

内容源与协作说明分离，`README.md`、`AGENTS.md` 和测试文件不会生成公开页面。构建产物不得手工修改。
