---
title: "从 Frameset 迁移到布局与 iframe"
description: "Frameset 是历史页面分割方案，不能作为新页面的布局方式。站内布局用 CSS；确需嵌入独立文档时再使用 iframe。"
type: "basics"
module: "html"
moduleName: "HTML"
area: "前端"
group: "语言基础"
knowledge: ["历史兼容"]
tags: ["HTML","框架页","过时","废弃","CSS Grid","iframe"]
order: 40
---

# 从 Frameset 迁移到布局与 iframe

Frameset 是历史页面分割方案，不能作为新页面的布局方式。站内布局用 CSS；确需嵌入独立文档时再使用 iframe。

## 页面布局

```html
<div class="layout">
  <nav aria-label="目录">目录</nav>
  <main>正文</main>
</div>
```

```css
.layout { display: grid; grid-template-columns: 14rem minmax(0, 1fr); gap: 1rem; }
@media (max-width: 48rem) { .layout { grid-template-columns: 1fr; } }
```

## 嵌入独立页面

iframe 设置可理解的 `title`，按内容需要限制 `sandbox` 权限。默认受同源策略约束；跨源通信使用 `postMessage`，接收方检查 `origin` 和消息格式。不要为了消除报错无条件放开沙箱全部权限。

```html
<iframe title="示例文档" src="https://example.com/" loading="lazy" sandbox></iframe>
```

示例目标是否允许嵌入还取决于其响应头，不能仅靠前端绕过。

### 版本变化与兼容

| 知识点                            | 历史状态                             | 当前方案                           |
| --------------------------------- | ------------------------------------ | ---------------------------------- |
| `frame` / `frameset` / `noframes` | HTML 标准列为废弃，不应继续编写      | Grid / Flex 与正常页面导航         |
| iframe                            | 仍是有效元素，不与 frameset 一同废弃 | 明确嵌入边界，配置标题、权限、通信 |
| Grid                              | 浏览器能力存在差异                   | 旧浏览器可用普通块布局作为降级     |

依据：[废弃元素](https://html.spec.whatwg.org/multipage/obsolete.html)、[iframe](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element)。

