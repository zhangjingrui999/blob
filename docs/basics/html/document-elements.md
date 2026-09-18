---
title: "HTML 文档结构、语义与可访问性"
description: "HTML 描述内容结构和语义，CSS 负责表现，JavaScript 负责交互。语义正确的原生元素能提供更可靠的键盘操作和辅助技术支持。"
type: "basics"
module: "html"
moduleName: "HTML"
area: "前端"
group: "语言基础"
knowledge: ["文档基础"]
tags: ["HTML","语义化","元素","废弃","可访问性"]
order: 20
---

# HTML 文档结构、语义与可访问性

HTML 描述内容结构和语义，CSS 负责表现，JavaScript 负责交互。语义正确的原生元素能提供更可靠的键盘操作和辅助技术支持。

## 文档与元素

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>学习笔记</title>
</head>
<body>
  <header><nav aria-label="主导航"><a href="/">首页</a></nav></header>
  <main><h1>学习笔记</h1><p>从基础开始。</p></main>
  <script src="app.js" defer></script>
</body>
</html>
```

- 标题按内容层级使用 `h1`～`h6`，不要为改变字号跳级。
- `strong` 表示重要性，`em` 表示强调；`div`、`span` 无特定语义。
- 用 `button` 执行动作，用 `a href` 导航；不要只给 `div` 绑定点击。
- 信息图片写有意义的 `alt`，装饰图片用空 `alt`。`id` 在文档内唯一。
- 文本中的 `<`、`&` 按上下文转义；不要直接拼接不可信 HTML。

### 版本变化与兼容

| 知识点   | 历史写法与状态                 | 当前方案                                                            |
| -------- | ------------------------------ | ------------------------------------------------------------------- |
| 文档模式 | 旧 HTML 使用长 DTD             | 简短 doctype 触发标准模式                                           |
| 展示标签 | `font`、`center`、`big` 已废弃 | CSS 字体、布局和尺寸                                                |
| 语义结构 | 早期主要使用 div               | Living Standard 的 main、nav、article；无需为了使用它们更换 doctype |

依据：[HTML 标准](https://html.spec.whatwg.org/multipage/semantics.html)、[废弃特性](https://html.spec.whatwg.org/multipage/obsolete.html)。

