---
title: "ThinkPHP 视图、模板与输出安全"
description: "模板负责展示数据，不承担数据库操作和核心业务判断。ThinkPHP 的视图门面与模板驱动需要按项目依赖配套。"
type: "basics"
module: "thinkphp"
moduleName: "ThinkPHP"
area: "后端"
group: "PHP 框架"
knowledge: ["框架基础","视图"]
tags: ["ThinkPHP","ThinkPHP 5","模板","过时","ThinkPHP 8"]
order: 30
---

# ThinkPHP 视图、模板与输出安全

模板负责展示数据，不承担数据库操作和核心业务判断。ThinkPHP 的视图门面与模板驱动需要按项目依赖配套。

## 数据与模板

在安装并配置相应模板驱动的项目中，可通过 View::fetch 渲染并传入数据：

```php
<?php
use think\facade\View;
return View::fetch('index', ['name' => 'Ada']);
```

该片段放在控制器方法内，需要存在可解析的 index 模板。模板路径、后缀、布局和缓存目录以驱动配置为准。循环和条件仅做展示，输出用户内容时确认默认转义规则；HTML、属性、URL 与脚本字符串需要不同处理。

## 排查

找不到模板先检查实际驱动、文件大小写、应用路径和后缀；缓存问题按配置清理，不删除未知目录。公共资源走公开 URL，不拼接服务器文件系统路径。

### 版本变化与兼容

| 版本       | 差异                                 | 方案                                                 |
| ---------- | ------------------------------------ | ---------------------------------------------------- |
| 5.x        | 常见控制器 assign/fetch 与旧配置常量 | 仅在对应基类和模板引擎中使用                         |
| 6–8 组件化 | 视图/模板驱动可能独立安装            | 先确认 Composer 依赖，不假定框架本体内置全部模板语法 |
| 当前 8.x   | View 门面转发到配置的视图服务        | 以驱动文档和测试确定过滤器及标签行为                 |

依据：[View 门面](https://github.com/top-think/framework/blob/8.x/src/think/facade/View.php)、[Think Template](https://github.com/top-think/think-template)。

