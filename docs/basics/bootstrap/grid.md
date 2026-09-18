---
title: "Bootstrap 栅格与 3 到 5 版本迁移"
description: "Bootstrap 栅格按断点提供响应式列。以下以 5.3 文档为基准；原笔记的 3.3.7 是历史版本，不应称为最新版。"
type: "basics"
module: "bootstrap"
moduleName: "Bootstrap"
area: "前端"
group: "UI 框架"
knowledge: ["框架基础","布局"]
tags: ["Bootstrap","Bootstrap 3","响应式","过时","Bootstrap 5"]
order: 10
---

# Bootstrap 栅格与 3 到 5 版本迁移

Bootstrap 栅格按断点提供响应式列。以下以 5.3 文档为基准；原笔记的 3.3.7 是历史版本，不应称为最新版。

## 当前布局

先在项目中加载所选 Bootstrap 5 样式，CSS 与 JS 保持匹配版本。

```html
<div class="container">
  <div class="row g-3">
    <main class="col-12 col-md-8">正文</main>
    <aside class="col-12 col-md-4">补充说明</aside>
  </div>
</div>
```

栅格默认 12 列，列应在 row 内，row 放容器中。5.3 默认断点为 xs&lt;576、sm≥576、md≥768、lg≥992、xl≥1200、xxl≥1400 像素。断点名不是设备型号，实际内容挤压时才决定换行。

### 版本变化与兼容

| 版本    | 变化                               | 迁移方式                                       |
| ------- | ---------------------------------- | ---------------------------------------------- |
| 3       | 浮动栅格，col-xs-*；md 为 992px 起 | 不把同名 md 与新版视为同一宽度                 |
| 4       | Flex 栅格，xs 类省略为 col-*       | 检查偏移类与断点变化                           |
| 5 / 5.3 | xxl、g-* 间距与更多 CSS 变量       | 使用 col-_、offset-md-_；不直接混载 3 和 5 CSS |

Bootstrap 3 已结束维护；维护旧项目可保留匹配版本，迁移需逐页验证栅格和组件。

依据：[5.3 栅格](https://getbootstrap.com/docs/5.3/layout/grid/)、[迁移说明](https://getbootstrap.com/docs/5.3/migration/)、[3.x 维护公告](https://blog.getbootstrap.com/2019/07/24/lts-plan/)。

