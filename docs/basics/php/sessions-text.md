---
title: "PHP Cookie、Session 与多行文本"
description: "Cookie 保存在客户端并按作用域发送；Session 通常在服务端保存数据，通过会话标识关联请求。共享 Session 存储不会自动完成跨域登录。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["Web 基础"]
tags: ["PHP","Cookie","Session","字符串","会话安全"]
order: 90
---

# PHP Cookie、Session 与多行文本

Cookie 保存在客户端并按作用域发送；Session 通常在服务端保存数据，通过会话标识关联请求。共享 Session 存储不会自动完成跨域登录。

## 会话配置

```php
<?php
session_start([
    'use_strict_mode' => 1,
    'cookie_httponly' => true,
    'cookie_secure' => true,
    'cookie_samesite' => 'Lax',
]);
$_SESSION['theme'] = 'dark';
session_write_close();
```

示例面向 HTTPS，必须在输出前执行。登录或权限变化时更新会话标识；退出时清理服务端状态及同作用域 Cookie。默认文件 Session 锁可能串行化同一用户请求，不再写入后尽早关闭。SameSite 不能单独替代完整 CSRF 防护。

## 多行文本

heredoc 类似双引号字符串，支持插值；nowdoc 类似单引号，不插值。文本中的变量是否需要转义取决于输出上下文。

```php
$template = <<<'TEXT'
这里的 $name 按字面量保留。
TEXT;
```

### 版本变化与兼容

| 版本       | 变化                                                            | 兼容方案                                                         |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------------------------- |
| 7.3        | Cookie options 支持 SameSite；heredoc/nowdoc 结束标识缩进更灵活 | 旧文本把结束标识放行首；Cookie 升级运行时后使用结构化选项        |
| 浏览器政策 | 跨站 Cookie 规则独立于 PHP 版本演进                             | 测试实际浏览器及 HTTPS、域名、路径，不依赖第三方 Cookie 永久可用 |

依据：[session_start](https://www.php.net/manual/en/function.session-start.php)、[Cookie](https://www.php.net/manual/en/function.setcookie.php)、[字符串语法](https://www.php.net/manual/en/language.types.string.php)。

