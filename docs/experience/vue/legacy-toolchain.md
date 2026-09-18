---
title: "Vue 旧工具链与插件迁移策略"
description: "升级 Vue 项目不是把依赖版本统一改成最大值。框架、构建工具、组件库和插件需要形成可工作的兼容组合。"
type: "experience"
module: "vue"
moduleName: "Vue"
area: "前端"
group: "应用框架"
knowledge: ["旧版项目实践"]
tags: ["Vue","Vue 2","Vue CLI","插件","过时","Vue 3","Vite"]
order: 10
---

# Vue 旧工具链与插件迁移策略

升级 Vue 项目不是把依赖版本统一改成最大值。框架、构建工具、组件库和插件需要形成可工作的兼容组合。

## 迁移顺序

先记录 package.json、锁文件、Node 版本和构建脚本；建立核心页面验证基线。逐一检查插件支持 Vue 2 还是 Vue 3，确认路由、状态库、UI 库和富文本编辑器的升级路径，再分阶段替换。

新项目可按官方 create-vue 创建 Vite 工程；已有项目保留 URL、环境变量含义和部署路径。Axios、Swiper、图标库都不是 Vue 必装组件。富文本输出仍需按可信边界处理，不能因编辑器来自插件就直接信任 HTML。

### 版本变化与兼容

| 范围    | 历史情况                                   | 当前方案                                            |
| ------- | ------------------------------------------ | --------------------------------------------------- |
| Vue 2   | 已 EOL                                     | 升级 Vue 3；短期维护需明确风险和支持来源            |
| Vue CLI | 维护模式，旧 vue init webpack 属更早工具链 | 新项目使用 create-vue；旧项目按其脚本维护到迁移完成 |
| 插件    | Vue.use 与 app.use、实例 API 不同          | 选择明确支持目标 Vue 的版本，不能直接复用全部插件   |

依据：[工具链](https://vuejs.org/guide/scaling-up/tooling.html)、[Vue CLI 状态](https://cli.vuejs.org/)、[迁移构建](https://v3-migration.vuejs.org/migration-build.html)。

