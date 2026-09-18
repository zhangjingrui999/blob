---
title: "Vue 构建路径、刷新 404 与移动端返回"
description: "开发页面正常而部署失败，常见原因是资源基路径、路由回退或服务器返回类型不匹配。双击 dist/index.html 不等于实际 HTTP 部署。"
type: "experience"
module: "vue"
moduleName: "Vue"
area: "前端"
group: "应用框架"
knowledge: ["旧版项目排错"]
tags: ["Vue","Vue 2","构建","移动端","过时","Vite","部署"]
order: 80
---

# Vue 构建路径、刷新 404 与移动端返回

开发页面正常而部署失败，常见原因是资源基路径、路由回退或服务器返回类型不匹配。双击 dist/index.html 不等于实际 HTTP 部署。

## 构建与直达

先确认 package.json 的 build/preview 命令。Vite 子路径部署配置 base，Router history 使用一致基路径；生产服务将应用路由回退到入口，同时保留真实静态资源的 404，避免脚本请求被返回 HTML。

部署后检查首页、二级路由直达、刷新、动态导入和图片。路由模式选择需要结合宿主环境；hash 可以减少服务器回退配置，但改变 URL 形式。

## 移动端返回

浏览器后退、系统物理返回键和原生容器返回是不同事件来源。普通 Web 页面遵循浏览器历史；封装 App 应使用其宿主 SDK 的返回 API，明确根页面与退出行为。不能给所有 Vue 页面安装 MUI 就宣称解决返回问题。

### 版本变化与兼容

| 工具或环境                | 变化                                     | 方案                                       |
| ------------------------- | ---------------------------------------- | ------------------------------------------ |
| 旧 webpack 模板 / Vue CLI | assetsPublicPath / publicPath 等配置不同 | 看实际构建器，不复制其他代配置             |
| Vite                      | base 控制公开基路径                      | 同步路由基路径并用 HTTP 预览               |
| WebView / 原生壳          | 返回 API 取决于宿主版本                  | 按宿主文档接入，浏览器页面保留正常历史行为 |

依据：[Vite 部署](https://vite.dev/guide/static-deploy.html)、[Router history](https://router.vuejs.org/guide/essentials/history-mode.html)。

