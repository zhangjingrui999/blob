---
title: "ThinkPHP 应用结构与 5 到 8 迁移"
description: "ThinkPHP 的目录、控制器基类和组件拆分随大版本变化。本文以官方 8.x 应用骨架为新代码参考，旧 5 风格仅用于版本对照。"
type: "basics"
module: "thinkphp"
moduleName: "ThinkPHP"
area: "后端"
group: "PHP 框架"
knowledge: ["框架基础","基础结构"]
tags: ["ThinkPHP","ThinkPHP 5","MVC","配置","过时","ThinkPHP 8"]
order: 10
---

# ThinkPHP 应用结构与 5 到 8 迁移

ThinkPHP 的目录、控制器基类和组件拆分随大版本变化。本文以官方 8.x 应用骨架为新代码参考，旧 5 风格仅用于版本对照。

## 当前结构

常见入口为 public/index.php，公开目录只放允许直接访问的文件。app 放应用类，config 放配置，route 放路由，runtime 放运行时数据，vendor 由 Composer 管理。多应用能力是否启用取决于额外组件与项目配置，不能默认存在旧模块层级。

依赖以 composer.json/lock 为准，环境配置不提交真实密码。启动排查从入口和自动加载开始，再看路由、控制器及日志。开发调试信息不应公开到生产页面。

### 版本变化与兼容

| 版本 | 变化                                        | 方案                                                |
| ---- | ------------------------------------------- | --------------------------------------------------- |
| 5.x  | 常见 application、模块/控制器/操作路径      | 保留历史项目约定，不与 8.x 文件混放                 |
| 6.x+ | app 结构和组件化演进                        | 按对应升级手册与骨架迁移                            |
| 8.x  | 官方骨架要求 PHP 8.0+，组件约束决定最终门槛 | 检查 Composer 平台要求和 ORM 版本，不仅看框架主版本 |

依据：[ThinkPHP 8 骨架](https://github.com/top-think/think/tree/8.x)、[依赖定义](https://raw.githubusercontent.com/top-think/think/8.x/composer.json)。

