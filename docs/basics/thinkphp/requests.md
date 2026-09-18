---
title: "ThinkPHP 控制器、请求与输入校验"
description: "控制器把请求转换为业务操作和响应。输入过滤、业务验证、授权和输出转义应分别处理，不存在一个全局过滤器解决全部问题。"
type: "basics"
module: "thinkphp"
moduleName: "ThinkPHP"
area: "后端"
group: "PHP 框架"
knowledge: ["框架基础","请求处理"]
tags: ["ThinkPHP","ThinkPHP 5","控制器","请求","过时","ThinkPHP 8"]
order: 20
---

# ThinkPHP 控制器、请求与输入校验

控制器把请求转换为业务操作和响应。输入过滤、业务验证、授权和输出转义应分别处理，不存在一个全局过滤器解决全部问题。

## 请求读取

当前 8.x 骨架的 BaseController 持有应用和请求对象，并在构造时调用 initialize。控制器方法可按框架绑定规则读取参数；明确请求方法和字段类型，拒绝未预期的批量赋值字段。

```php
<?php
namespace app\controller;
use think\Request;
class Health {
    public function index(Request $request) {
        return json(['ok' => true, 'method' => $request->method()]);
    }
}
```

需在现有项目中配置对应路由。返回 JSON 或重定向时使用框架响应对象，状态码表达实际结果。HTTP 方法伪装不等于绕过权限，服务端仍需鉴权和 CSRF 策略。

### 版本变化与兼容

| 版本或知识点       | 变化                                        | 方案                           |
| ------------------ | ------------------------------------------- | ------------------------------ |
| 5 风格控制器       | 旧基类、_initialize、success/error 跳转示例 | 不假定 8.x 基类提供同名方法    |
| 8.x BaseController | 使用 initialize；请求由容器提供             | 对照实际基类签名               |
| 过滤               | htmlspecialchars 是输出编码，不是加密       | 参数验证后在具体输出上下文编码 |

依据：[8.x BaseController](https://raw.githubusercontent.com/top-think/think/8.x/app/BaseController.php)、[Request](https://github.com/top-think/framework/blob/8.x/src/think/Request.php)。

