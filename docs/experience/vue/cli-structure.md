---
title: "Vue 工程入口、目录与依赖排查"
description: "目录结构由构建工具和项目约定决定。找不到页面时先确认入口、导入路径和路由，不通过重复安装所有插件碰运气。"
type: "experience"
module: "vue"
moduleName: "Vue"
area: "前端"
group: "应用框架"
knowledge: ["旧版项目排错"]
tags: ["Vue","Vue 2","Vue CLI","过时","Vue 3","Vite"]
order: 50
---

# Vue 工程入口、目录与依赖排查

目录结构由构建工具和项目约定决定。找不到页面时先确认入口、导入路径和路由，不通过重复安装所有插件碰运气。

## 结构与定位

Vite 工程通常有根 index.html、src/main.ts、App.vue、vite.config.ts 和 public。src 内导入资源参与构建，public 资源按公开路径访问。路径别名必须由工具配置支持，不能仅在编辑器里能跳转就认为构建可用。

排错依次检查：脚本实际命令、Node 要求、锁文件、模块导入大小写、插件版本和报错首个有效栈帧。保留单一包管理器；依赖存在不代表浏览器端已正确注册组件。

### 版本变化与兼容

| 工具链            | 变化                               | 对应检查                                      |
| ----------------- | ---------------------------------- | --------------------------------------------- |
| vue-cli 2         | 常见 build/config/static 目录      | 只用于理解旧项目                              |
| Vue CLI 3–5       | @vue/cli-service、vue.config.js    | 环境变量和 publicPath 按 CLI 规则             |
| create-vue + Vite | vite.config、import.meta.env、base | 不直接复制 webpack loader 或 process.env 配置 |

这些目录不是 Vue 组件语法本身的版本限制。迁移时分别验证开发、生产构建、直达刷新和资源加载。

依据：[Vue 工具链](https://vuejs.org/guide/scaling-up/tooling.html)、[Vite 环境变量](https://vite.dev/guide/env-and-mode.html)、[静态资源](https://vite.dev/guide/assets.html)。

