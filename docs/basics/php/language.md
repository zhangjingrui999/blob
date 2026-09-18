---
title: "PHP 类型、作用域、函数与运行环境"
description: "PHP 示例以 PHP 8 系列为主。部署时选择仍受支持的分支，并分别核对 CLI、FPM 或 Apache 模块实际加载的 php.ini 与扩展。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["语言基础"]
tags: ["PHP","变量","函数","流程控制","PHP 8","过时"]
order: 10
---

# PHP 类型、作用域、函数与运行环境

PHP 示例以 PHP 8 系列为主。部署时选择仍受支持的分支，并分别核对 CLI、FPM 或 Apache 模块实际加载的 php.ini 与扩展。

## 变量、类型与运算

单引号字符串基本按字面量解释；双引号支持变量插值和转义。变量以 `$` 开头。`isset` 判断存在且非 null；`array_key_exists` 可以识别值为 null 的键。`empty('0')` 为 true，不能代替所有业务判空。

```php
<?php
declare(strict_types=1);
function sum(int ...$values): int {
    return array_sum($values);
}
echo sum(1, 2, 3); // 6
```

布尔转换产生 bool，不是整数。比较优先明确类型并使用 `===`；复杂表达式加括号，不背诵不完整的优先级表。魔术常量写作 `__FILE__`、`__DIR__`、`__LINE__`，不是普通变量。

## 函数与生命周期

参数默认按值传递，引用需显式声明。回调可以是闭包、可调用对象或有效函数引用。闭包用 use 捕获，箭头函数自动按值捕获。递归要有终止条件，递归调用传入明确减小的新值；大量线性求和直接用循环或数组函数。require_once 适合加载必要的启动文件，业务类交给自动加载。

### 版本变化与兼容

| 版本 | 变化                                          | 兼容方案                                                  |
| ---- | --------------------------------------------- | --------------------------------------------------------- |
| 7.4  | 箭头函数、类型化属性                          | 旧代码可保留闭包；旧分支不应作为新部署目标                |
| 8.0  | 联合类型、命名参数、match；部分弱比较规则变化 | 跨版本代码避免依赖隐式比较和未稳定的参数名                |
| 8.5  | 新增管道运算符 `\|>`                          | 兼容更低 8.x 时继续普通嵌套调用；不要复制新语法到旧运行时 |

依据：[PHP 类型](https://www.php.net/manual/en/language.types.php)、[8.0 迁移](https://www.php.net/manual/en/migration80.incompatible.php)、[8.5 新特性](https://www.php.net/manual/en/migration85.new-features.php)、[支持周期](https://www.php.net/supported-versions.php)。

