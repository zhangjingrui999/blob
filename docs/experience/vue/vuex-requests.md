---
title: "Vue 共享状态与异步请求迁移"
description: "共享状态保存跨组件的业务状态，局部表单状态留在组件。请求代码需要加载、成功、失败和取消路径，不能只展示一次成功回调。"
type: "experience"
module: "vue"
moduleName: "Vue"
area: "前端"
group: "应用框架"
knowledge: ["旧版项目排错"]
tags: ["Vue","Vue 2","Vuex","JSONP","过时","Vue 3","Pinia"]
order: 70
---

# Vue 共享状态与异步请求迁移

共享状态保存跨组件的业务状态，局部表单状态留在组件。请求代码需要加载、成功、失败和取消路径，不能只展示一次成功回调。

## 当前状态管理

Pinia 是 Vue 官方推荐的状态管理方案。选项式 store 包含 state、getters、actions，组合式 store 可返回状态和操作；actions 可以异步。组件读取 state/getters 时若需要解构响应式数据，使用 storeToRefs；action 可以直接解构。

Vuex 维护项目中 mutations 应同步，异步流程放 actions，再 commit 状态变化。模块命名空间与根 state 的路径要一致。不要把代码片段中的赋值语句写进对象字面量来代替属性声明。

## 请求与状态边界

普通 JSON 请求用 fetch 或已安装的 HTTP 客户端。检查 HTTP 状态，快速切换参数时取消旧请求或验证响应对应的请求标识。不要把访问令牌硬编码在文档、公共配置或 store 初始值中。SSR 需要按请求隔离 store，避免用户状态串用。

### 版本变化与兼容

| 版本或工具         | 变化                              | 方案                                             |
| ------------------ | --------------------------------- | ------------------------------------------------ |
| Vuex 3 / 4         | 分别对应 Vue 2 / Vue 3 的常见版本 | 先建立兼容组合，不能只升级 Vue                   |
| Pinia              | 官方默认推荐的新项目方案          | 可按模块迁移；Vuex 未因推荐变化被整体判定移除    |
| vue-resource JSONP | 历史跨域方案，执行远端脚本        | CORS API 或受控后端代理，不依赖 JSONP 传敏感数据 |

依据：[Pinia](https://pinia.vuejs.org/introduction.html)、[迁移 Vuex](https://pinia.vuejs.org/cookbook/migration-vuex.html)、[Vuex actions](https://vuex.vuejs.org/guide/actions.html)。

