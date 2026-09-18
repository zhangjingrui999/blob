---
title: "PHP 日期时间、时区与错误处理"
description: "时间点、当地日期和持续时长是不同概念。明确存储和显示时区，避免依赖服务器默认配置。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["标准库"]
tags: ["PHP","日期时间","错误处理","废弃","PHP 8"]
order: 40
---

# PHP 日期时间、时区与错误处理

时间点、当地日期和持续时长是不同概念。明确存储和显示时区，避免依赖服务器默认配置。

## 日期与时间

```php
<?php
$instant = new DateTimeImmutable('2026-09-16T08:00:00+00:00');
$local = $instant->setTimezone(new DateTimeZone('Asia/Shanghai'));
echo $local->format(DateTimeInterface::ATOM);
```

time 返回秒级 Unix 时间戳；与 JavaScript 毫秒时间戳交换时明确单位。日期加一天与加 86400 秒在夏令时切换地区可能不同。严格解析输入时检查 createFromFormat 的结果和 getLastErrors，不能把宽松日期归一化当作有效校验。

## 错误和异常

开发环境开启 E_ALL 并展示错误；生产环境记录错误而不向用户暴露路径、SQL 和堆栈。Error 和 Exception 都实现 Throwable，但并不是所有 warning 都会自动转成异常。只在能处理或补充上下文的边界捕获错误，用 finally 释放资源。

### 版本变化与兼容

| 版本 | 变化                                    | 兼容方案                                       |
| ---- | --------------------------------------- | ---------------------------------------------- |
| 7.0  | 引入 Throwable / Error 体系             | 不要只依赖 catch Exception 捕获所有可抛出错误  |
| 8.2  | 无警告或错误时 getLastErrors 返回 false | 先判断是否为数组再读取计数                     |
| 8.4  | E_STRICT 级别移除、常量弃用             | 使用 E_ALL；删除针对 E_STRICT 的历史位运算配置 |

依据：[日期解析错误](https://www.php.net/manual/en/datetimeimmutable.getlasterrors.php)、[Throwable](https://www.php.net/manual/en/class.throwable.php)、[8.4 不兼容变化](https://www.php.net/manual/en/migration84.incompatible.php)。

