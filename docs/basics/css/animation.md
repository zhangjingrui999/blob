---
title: "CSS 变换、过渡与关键帧动画"
description: "transform 改变视觉坐标而通常不重新安排周围元素；transition 在属性变化时插值；animation 由关键帧描述时间过程。"
type: "basics"
module: "css"
moduleName: "CSS"
area: "前端"
group: "样式"
knowledge: ["视觉效果"]
tags: ["CSS","动画","过渡","变换","可访问性"]
order: 40
---

# CSS 变换、过渡与关键帧动画

transform 改变视觉坐标而通常不重新安排周围元素；transition 在属性变化时插值；animation 由关键帧描述时间过程。

## 动画示例

```css
.card { transition: transform .2s ease, opacity .2s ease; }
.card:hover, .card:focus-within { transform: translateY(-.25rem); }
@keyframes appear {
  from { opacity: 0; transform: translateY(.5rem); }
  to { opacity: 1; transform: translateY(0); }
}
.notice { animation: appear .3s ease both; }
@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
  .notice { animation: none; }
}
```

transform 中多个函数的顺序会影响结果。三维透视使用 perspective；`transform-style: preserve-3d` 影响子元素的三维空间，不能独自创造透视效果。动画结束后是否保留样式由 fill-mode 决定。

## 性能与交互

优先评估 transform/opacity，避免无依据地给所有元素加 will-change。动画不应妨碍操作或成为传递状态的唯一方式。为键盘焦点提供与鼠标同等的信息。

### 版本变化与兼容

| 知识点       | 历史写法                      | 当前与回退                               |
| ------------ | ----------------------------- | ---------------------------------------- |
| 浏览器前缀   | 多份 -webkit/-moz 规则        | 按目标浏览器构建处理，不手工堆积无效前缀 |
| 独立变换属性 | translate、rotate、scale 较新 | 不支持时使用 transform                   |
| 减少动态效果 | 用户偏好媒体查询              | 对核心流程始终保留静态可用状态           |

依据：[CSS Transforms](https://www.w3.org/TR/css-transforms-1/)、[Media Queries](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion)。

