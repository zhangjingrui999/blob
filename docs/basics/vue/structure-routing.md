---
title: "Vue 应用结构、组件与路由"
description: "Vue 管理组件和响应式视图，路由库管理普通 SPA 的页面导航。VitePress 使用自己的文件路由，不需要照搬 SPA 路由表。"
type: "basics"
module: "vue"
moduleName: "Vue"
area: "前端"
group: "应用框架"
knowledge: ["Vue 基础","项目结构"]
tags: ["Vue","Vue 2","路由","过时","Vue 3","Vite"]
order: 20
---

# Vue 应用结构、组件与路由

Vue 管理组件和响应式视图，路由库管理普通 SPA 的页面导航。VitePress 使用自己的文件路由，不需要照搬 SPA 路由表。

## 应用入口

```ts
import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');
```

需有 App.vue、页面挂载节点和构建入口。组件放 components，页面放 views 是常见组织方式，不是 Vue 强制目录。业务逻辑按领域拆分，派生状态用 computed，异步副作用用 watch 或生命周期管理。

## SPA 路由

Router 4 通过 createRouter 及 createWebHistory/createWebHashHistory 创建。路由组件懒加载使用 `() => import('./views/Home.vue')`。history 模式需要服务器回退到入口；hash 模式的片段不发给服务器。路由鉴权改善前端体验，真正授权仍由服务端执行。

### 版本变化与兼容

| 版本         | 变化                                             | 方案                                   |
| ------------ | ------------------------------------------------ | -------------------------------------- |
| Vue 2        | new Vue、Vue.use；2023-12-31 EOL                 | 维护期间锁定依赖，规划升级             |
| Vue 3        | createApp 与应用实例级插件配置                   | 按应用安装插件，不再依赖全局构造器配置 |
| Router 3 → 4 | new Router 改 createRouter，history 创建函数分离 | 升级 Vue 时同时核对路由库              |

依据：[Vue 快速开始](https://vuejs.org/guide/quick-start.html)、[迁移指南](https://v3-migration.vuejs.org/breaking-changes/)、[Router 4 迁移](https://router.vuejs.org/guide/migration/)、[Vue 2 EOL](https://v2.vuejs.org/eol/)。

