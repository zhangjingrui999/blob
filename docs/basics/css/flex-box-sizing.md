---
title: "Flex 布局、收缩与 box-sizing"
description: "Flex 适合一维排布。主轴由 flex-direction 决定，不能把主轴固定理解为水平轴。"
type: "basics"
module: "css"
moduleName: "CSS"
area: "前端"
group: "样式"
knowledge: ["页面布局","Flex"]
tags: ["CSS","Flex","盒模型","响应式"]
order: 50
---

# Flex 布局、收缩与 box-sizing

Flex 适合一维排布。主轴由 flex-direction 决定，不能把主轴固定理解为水平轴。

## 对齐与尺寸

justify-content 分配主轴剩余空间；align-items 控制项目在交叉轴上的对齐；align-content 对多行内容整体分布起作用。order 改变视觉顺序，不改变 DOM 和键盘阅读顺序。

```css
*, *::before, *::after { box-sizing: border-box; }
.row { display: flex; gap: 1rem; align-items: center; }
.icon { flex: 0 0 2rem; }
.text { flex: 1 1 0; min-width: 0; overflow-wrap: anywhere; }
```

flex 简写分别是 grow、shrink、basis。收缩分配与项目的基础尺寸有关，不是简单每人缩同样像素。项目默认最小尺寸可能阻止收缩，截断文本或嵌套滚动时检查 min-width/min-height。

border-box 让 width 包含内边距和边框，不包含 margin。content-box 的 width 只代表内容区域。

### 版本变化与兼容

| 知识点    | 历史差异                                    | 兼容方案                              |
| --------- | ------------------------------------------- | ------------------------------------- |
| Flex 语法 | 早期 box/flexbox 与现行语法不同             | 不混用旧语法手册，依目标浏览器处理    |
| gap       | 老浏览器可能支持 Grid gap 却不支持 Flex gap | 在真实目标浏览器验证，必要时用 margin |
| 二维布局  | Flex 换行各行独立分配                       | 要求行列对齐时使用 Grid               |

依据：[Flexbox 规范](https://www.w3.org/TR/css-flexbox-1/)、[box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)。

