---
title: "PHP 类、接口、类型与对象生命周期"
description: "类封装状态和行为，接口声明契约。类型声明为接口时，实现类必须显式 implements，只有同名方法并不满足该接口。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["面向对象"]
tags: ["PHP","类","继承","接口","废弃","PHP 8"]
order: 60
---

# PHP 类、接口、类型与对象生命周期

类封装状态和行为，接口声明契约。类型声明为接口时，实现类必须显式 implements，只有同名方法并不满足该接口。

## 构造与多态

```php
<?php
interface Formatter {
    public function format(string $value): string;
}
final class PlainFormatter implements Formatter {
    public function format(string $value): string { return trim($value); }
}
final class Greeting {
    public function __construct(private Formatter $formatter) {}
    public function hello(string $name): string {
        return 'Hello ' . $this->formatter->format($name);
    }
}
echo (new Greeting(new PlainFormatter()))->hello(' Ada ');
```

示例需要 PHP 8.0+ 的构造器属性提升。继承时子类若定义构造器，需在其方法体内按需调用 parent::__construct。具体子类必须实现继承的抽象方法。public/protected/private 控制访问；trait 用于实现复用，不能取代接口契约。

## 状态与复制

对象赋值共享同一对象标识；clone 默认浅复制，嵌套对象需按业务处理。不要依赖析构器完成关键事务提交。声明属性和类型可以提前发现拼写错误。

### 版本变化与兼容

| 版本      | 变化                                  | 兼容方案                                   |
| --------- | ------------------------------------- | ------------------------------------------ |
| 7.4 / 8.0 | 类型属性 / 构造器属性提升、Attributes | 旧代码显式声明属性并赋值                   |
| 8.1 / 8.2 | 枚举、readonly 属性 / readonly 类     | 老版本用常量与受控写方法表达约束           |
| 8.2       | 普通动态属性弃用，部分特殊类型除外    | 显式声明属性；不要为掩盖拼写错误普遍加豁免 |
| 8.4       | 属性钩子、非对称可见性                | 低版本继续 getter/setter，不直接复制新语法 |

依据：[构造器](https://www.php.net/manual/en/language.oop5.decon.php)、[属性](https://www.php.net/manual/en/language.oop5.properties.php)、[8.4 新特性](https://www.php.net/manual/en/migration84.new-features.php)。

