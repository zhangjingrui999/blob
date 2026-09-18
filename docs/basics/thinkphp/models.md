---
title: "ThinkPHP 查询、模型、验证与事务"
description: "查询构造器描述数据访问，模型表达业务实体，验证器检查输入规则。不同职责分开后，更容易发现类型、权限和并发问题。"
type: "basics"
module: "thinkphp"
moduleName: "ThinkPHP"
area: "后端"
group: "PHP 框架"
knowledge: ["框架基础","数据访问"]
tags: ["ThinkPHP","ThinkPHP 5","ORM","验证","过时","ThinkPHP 8","事务"]
order: 40
---

# ThinkPHP 查询、模型、验证与事务

查询构造器描述数据访问，模型表达业务实体，验证器检查输入规则。不同职责分开后，更容易发现类型、权限和并发问题。

## 参数化查询

```php
<?php
use think\facade\Db;
$user = Db::name('users')->where('id', 1)->find();
```

示例需项目配置数据库和实际表；name 可能应用表前缀，table 用于完整表名，按当前 ORM 规则选择。用户输入放绑定值中，动态列名、排序和原始表达式必须白名单限定。

模型读写需确认主键、时间字段、类型转换和允许写入字段。验证不等于授权；账户归属和可操作状态应在业务层检查。多步修改放事务内，外部网络调用不要无期限占用事务。

### 版本变化与兼容

| 版本或组件 | 变化                                  | 方案                                          |
| ---------- | ------------------------------------- | --------------------------------------------- |
| 5.x        | 旧 Db 类、模型 save 返回值和验证流程  | 不与新版 facade 示例混用                      |
| 8.x 骨架   | 当前约束允许 think-orm 3 或 4 系列    | 依据锁文件核对方法返回类型与异常行为          |
| ORM 升级   | 获取器/修改器、事件、关联语义可能改变 | 为实际业务读写做回归，不能只确保 PHP 语法通过 |

依据：[8.x Composer](https://raw.githubusercontent.com/top-think/think/8.x/composer.json)、[Think ORM](https://github.com/top-think/think-orm)、[验证组件](https://github.com/top-think/think-validate)。

