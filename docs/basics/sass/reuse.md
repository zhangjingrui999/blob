---
title: "SCSS Mixin、继承与模块化迁移"
description: "Mixin 复用声明，@extend 合并选择器关系，@use/@forward 组织模块。按目的选择，避免把所有复用都写成继承。"
type: "basics"
module: "sass"
moduleName: "Sass / SCSS"
area: "前端"
group: "样式"
knowledge: ["预处理器","复用"]
tags: ["Sass / SCSS","Mixin","模块化","废弃","Dart Sass"]
order: 20
---

# SCSS Mixin、继承与模块化迁移

Mixin 复用声明，@extend 合并选择器关系，@use/@forward 组织模块。按目的选择，避免把所有复用都写成继承。

## Mixin 与颜色

```scss
@use "sass:color";
@mixin panel($tone: #1769aa) {
  padding: 1rem;
  border: 1px solid $tone;
  background-color: color.adjust($tone, $lightness: 35%, $space: hsl);
}
.card { @include panel(); }
```

示例的显式色彩空间参数需较新 Dart Sass，见版本表。@extend 会影响生成的选择器，优先使用占位选择器并检查产物规模；需要参数和局部声明复用时 Mixin 更直观。

## 模块组织

把公共变量和 Mixin 放在独立文件，用 @use 加载并通过命名空间访问；@forward 对外重新导出。模块只加载一次，配置变量用 !default 与 with。不要为了省命名空间全局铺开所有成员。

### 版本变化与兼容

| 版本           | 变化                                             | 方案                                                                                |
| -------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Dart Sass 1.23 | @use / @forward                                  | 旧实现无法直接解析，需要升级编译器                                                  |
| 1.79           | 颜色空间 API 演进，旧颜色函数进入迁移            | 使用 color.adjust/scale，明确空间；更低版本 HSL 调整可省略 $space，但需验证颜色语义 |
| 1.80           | Sass @import 和全局内置函数弃用                  | 使用模块系统；普通 CSS @import 不在此弃用范围                                       |
| 计划中的 3.0   | 官方将移除安排在该大版本，不应宣称当前已全部移除 | 迁移后检查编译警告和生成 CSS                                                        |

依据：[模块系统](https://sass-lang.com/documentation/at-rules/use/)、[import 弃用](https://sass-lang.com/documentation/breaking-changes/import/)、[颜色变化](https://sass-lang.com/documentation/breaking-changes/color-functions/)。

