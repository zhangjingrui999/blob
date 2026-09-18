---
title: "SCSS 变量、计算、嵌套与控制流"
description: "SCSS 是 Sass 的一种语法，最终编译为 CSS。Sass 变量在编译时求值，CSS 自定义属性可在浏览器运行时参与层叠，两者用途不同。"
type: "basics"
module: "sass"
moduleName: "Sass / SCSS"
area: "前端"
group: "样式"
knowledge: ["预处理器","基础语法"]
tags: ["Sass / SCSS","SCSS","变量","过时","废弃","Dart Sass"]
order: 10
---

# SCSS 变量、计算、嵌套与控制流

SCSS 是 Sass 的一种语法，最终编译为 CSS。Sass 变量在编译时求值，CSS 自定义属性可在浏览器运行时参与层叠，两者用途不同。

## 当前写法

```scss
@use "sass:math";
$spacing: 16px;
.card {
  padding: math.div($spacing, 2);
  &:hover { color: #1769aa; }
}
@for $i from 1 through 3 {
  .space-#{$i} { margin-block: $i * 4px; }
}
```

through 包含终值，to 不包含。@each 遍历列表或映射，@if 条件生成 CSS；它们不是浏览器运行时逻辑。嵌套应保持浅层，避免生成高优先级和冗长选择器。插值用于选择器/属性名等需要文本组合的位置。

### 版本变化与兼容

| 版本或实现         | 变化                                | 方案                                                    |
| ------------------ | ----------------------------------- | ------------------------------------------------------- |
| Ruby Sass          | 2019 年停止维护                     | 使用 Dart Sass，不继续依赖 Ruby 安装教程                |
| Dart Sass 1.33     | 提供 math.div，斜线除法进入弃用迁移 | 数学除法用 math.div；CSS calc 中的 / 不受此规则直接替代 |
| Dart Sass 模块系统 | @use 的成员有命名空间               | 不把旧全局函数和新模块函数随意混用                      |

依据：[斜线除法](https://sass-lang.com/documentation/breaking-changes/slash-div/)、[控制流](https://sass-lang.com/documentation/at-rules/control/)、[Ruby Sass](https://sass-lang.com/ruby-sass/)。

