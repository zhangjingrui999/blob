---
title: "jQuery 选择器、集合与现代原生 API"
description: "jQuery 返回的是包装后的集合，不是单个 DOM 元素。集合长度用 length，取 DOM 节点用索引或 get。"
type: "basics"
module: "jquery"
moduleName: "jQuery"
area: "前端"
group: "工具库"
knowledge: ["DOM 操作","选择器"]
tags: ["jQuery","选择器","jQuery 2","过时","废弃","jQuery 4"]
order: 10
---

# jQuery 选择器、集合与现代原生 API

jQuery 返回的是包装后的集合，不是单个 DOM 元素。集合长度用 length，取 DOM 节点用索引或 get。

## 查询与过滤

```js
const $items = $('.list > li');
const $active = $items.filter('.active');
console.log($active.length);
const first = $items.get(0);
if (first) console.log(first.textContent);
```

find 查询后代，children 只查询直接子元素，closest 向自身及祖先查找。优先标准 CSS 选择器，不把 jQuery 专用伪选择器直接交给 querySelectorAll。选择器中的外部 id 需按 CSS 规则转义。

## 原生替代

轻量页面可以用 querySelector(All)、classList、addEventListener，不需为了几个 DOM 操作新增依赖。维护已有 jQuery 项目时保持插件兼容，避免同时引入多份不同版本。

### 版本变化与兼容

| 版本      | 变化                         | 方案                                                                         |
| --------- | ---------------------------- | ---------------------------------------------------------------------------- |
| 1.8 → 3.0 | size() 弃用后移除            | 读取 length                                                                  |
| 3.4 起    | 多个位置伪选择器进入弃用迁移 | 使用 first/last/eq 等集合方法并核对升级指南                                  |
| 4.0       | 多个历史工具函数移除         | 使用 Array.isArray、JSON.parse、String.prototype.trim 等原生 API；插件先验证 |

依据：[size](https://api.jquery.com/size/)、[选择器](https://api.jquery.com/category/selectors/)、[jQuery 4 公告](https://blog.jquery.com/2026/01/17/jquery-4-0-0/)。

