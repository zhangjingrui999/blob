---
title: "Hyperf 路由、依赖注入与协程上下文"
description: "Hyperf 服务运行在长生命周期进程中。依赖注入管理服务关系，协程上下文管理请求级数据，不能把当前用户写进共享服务属性。"
type: "basics"
module: "hyperf"
moduleName: "Hyperf"
area: "后端"
group: "PHP 框架"
knowledge: ["框架基础","请求处理"]
tags: ["Hyperf","Hyperf 2","路由","依赖注入","过时","废弃","Hyperf 3"]
order: 10
---

# Hyperf 路由、依赖注入与协程上下文

Hyperf 服务运行在长生命周期进程中。依赖注入管理服务关系，协程上下文管理请求级数据，不能把当前用户写进共享服务属性。

## 路由与服务

路由入口通常为 config/routes.php，可配置方法、路径与控制器。控制器只处理输入输出和编排，业务依赖通过构造器注入。接口到实现的映射放 config/autoload/dependencies.php。

```php
<?php
// config/autoload/dependencies.php；两个类型需由项目实现
return [
    App\Contract\UserRepository::class => App\Infrastructure\DbUserRepository::class,
];
```

容器 get 返回其管理的实例；不要假设每次请求都会重建。需要请求数据时从请求或 Context 获取。注入依赖的类应通过框架容器创建，手动 new 的行为不能简单等同于完整容器生命周期。

### 版本变化与兼容

| 版本 | 变化                                                                             | 方案                                                        |
| ---- | -------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 2.x  | 常见 Doctrine 注解和 Hyperf\Utils 辅助类                                         | 旧代码需按逐级升级指南迁移                                  |
| 3.0  | PHP 最低 8.0；移除 Doctrine 注解，改 PHP Attributes；Context 拆到 Hyperf\Context | 转换注解并核对 use 声明；不要只换包版本                     |
| 3.1  | PHP 最低 8.1                                                                     | 以 composer.json 及目标组件实际约束为准，构造器类型同步调整 |

依据：[依赖注入](https://github.com/hyperf/hyperf/blob/master/docs/zh-cn/di.md)、[3.0 升级](https://raw.githubusercontent.com/hyperf/hyperf/master/docs/zh-cn/upgrade/3.0.md)、[3.1 升级](https://raw.githubusercontent.com/hyperf/hyperf/master/docs/zh-cn/upgrade/3.1.md)。

