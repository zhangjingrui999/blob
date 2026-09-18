---
title: "PHP PDO 参数化查询、事务与异常"
description: "PDO 提供统一的数据库访问接口，但驱动的事务、占位符和返回值仍有差异。参数化查询把数据与 SQL 结构分开，不是简单的字符串转义。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["数据库访问"]
tags: ["PHP","PDO","预处理","异常","PHP 8","SQL注入","事务"]
order: 80
---

# PHP PDO 参数化查询、事务与异常

PDO 提供统一的数据库访问接口，但驱动的事务、占位符和返回值仍有差异。参数化查询把数据与 SQL 结构分开，不是简单的字符串转义。

## 连接与查询

```php
<?php
$pdo = new PDO(
    'mysql:host=127.0.0.1;dbname=app;charset=utf8mb4',
    getenv('DB_USER'), getenv('DB_PASSWORD'),
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
     PDO::ATTR_EMULATE_PREPARES => false]
);
$stmt = $pdo->prepare('SELECT id, name FROM users WHERE id = :id');
$stmt->execute(['id' => 1]);
$user = $stmt->fetch(); // 下一行；无数据为 false
```

需先提供数据库账号、表结构及 pdo_mysql 扩展。表名、列名、排序方向不能用值占位符替代，应通过白名单生成。rowCount 不应被当作跨驱动 SELECT 总行数；用 COUNT 查询。

## 事务与异常

beginTransaction 后执行相关修改，成功 commit；捕获 Throwable 后仅在 inTransaction 为真时 rollBack，再交给统一错误处理。MySQL 的某些 DDL 隐式提交，不能按普通 DML 回滚。日志记录可定位信息但不输出凭证和完整堆栈给用户。

### 版本变化与兼容

| 版本或驱动 | 变化                                     | 方案                                             |
| ---------- | ---------------------------------------- | ------------------------------------------------ |
| PHP 8.0    | PDO 默认错误模式从静默改为异常           | 显式设置错误模式，避免依赖默认值                 |
| MySQL 驱动 | 原生与模拟预处理行为不同                 | 显式选择并测试；不要重复使用同名占位符           |
| 所有版本   | exec / prepare / lastInsertId 是不同方法 | 按返回值语义处理，SELECT 使用 Statement 获取数据 |

依据：[PDO 错误处理](https://www.php.net/manual/en/pdo.error-handling.php)、[prepare](https://www.php.net/manual/en/pdo.prepare.php)、[事务](https://www.php.net/manual/en/pdo.transactions.php)。

