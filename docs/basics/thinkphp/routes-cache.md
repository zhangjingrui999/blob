---
title: "ThinkPHP 路由、中间件与缓存"
description: "路由把方法和路径映射到处理器，中间件组织横切逻辑，缓存保存可重建数据。它们的配置作用域和执行顺序应明确。"
type: "basics"
module: "thinkphp"
moduleName: "ThinkPHP"
area: "后端"
group: "PHP 框架"
knowledge: ["框架基础","路由"]
tags: ["ThinkPHP","ThinkPHP 5","路由","缓存","过时","ThinkPHP 8"]
order: 50
---

# ThinkPHP 路由、中间件与缓存

路由把方法和路径映射到处理器，中间件组织横切逻辑，缓存保存可重建数据。它们的配置作用域和执行顺序应明确。

## 路由与缓存片段

```php
<?php
use think\facade\Route;
Route::get('health', 'Health/index');
```

放在项目加载的路由文件中，需存在对应控制器。显式限制 HTTP 方法，参数规则不能代替用户权限校验。分组中间件处理认证、日志等事项，核对实际执行顺序与异常返回。

缓存使用独立键命名空间与 TTL；数据库更新后按策略失效。清理缓存要明确驱动和范围，不假定 Cache::clear 只影响当前模块。路由缓存与业务数据缓存也不是同一份内容。

### 版本变化与兼容

| 版本         | 差异                           | 方案                               |
| ------------ | ------------------------------ | ---------------------------------- |
| 5.x          | 旧路由定义、模块路径和入口参数 | 在旧项目内维护，不机械搬到新目录   |
| 6–8          | facade 与中间件、配置结构演进  | 对照当前骨架 route 目录和门面 API  |
| 缓存驱动版本 | 序列化、过期和标签实现有差异   | 升级后验证读取旧数据与批量失效语义 |

依据：[8.x Route](https://github.com/top-think/framework/blob/8.x/src/think/facade/Route.php)、[Cache](https://github.com/top-think/framework/blob/8.x/src/think/facade/Cache.php)。

