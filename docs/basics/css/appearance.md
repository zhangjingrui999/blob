---
title: "CSS 字体、边框、背景与透明度"
description: "字体、颜色、边框和背景共同构成外观；注意区分作用于元素整体的透明度与仅作用于背景颜色的 alpha。"
type: "basics"
module: "css"
moduleName: "CSS"
area: "前端"
group: "样式"
knowledge: ["样式基础","视觉样式"]
tags: ["CSS","字体","背景","边框","CSS变量"]
order: 20
---

# CSS 字体、边框、背景与透明度

字体、颜色、边框和背景共同构成外观；注意区分作用于元素整体的透明度与仅作用于背景颜色的 alpha。

## 常用属性

```css
.card {
  --accent: #1769aa;
  font: 400 1rem/1.6 system-ui, sans-serif;
  color: #172033;
  background: rgb(255 255 255 / 90%);
  border: 1px solid var(--accent);
  border-radius: .75rem;
  box-shadow: 0 .25rem 1rem rgb(0 0 0 / 12%);
  overflow-wrap: anywhere;
}
```

`font-variant-caps: small-caps` 设置小型大写字母。`text-align` 对齐行内内容；多行垂直居中用布局完成，不依赖 line-height 等于容器高度。`dotted` 是点线，`dashed` 是虚线。

## 背景与可读性

`background-repeat` 控制平铺；`background-size: cover` 可能裁切，`contain` 保留完整图像但可能留白。`opacity` 影响整个元素及其后代的合成结果。圆角百分比相对于盒子相应尺寸，不存在统一的“最大为高度一半”。

### 版本变化与兼容

| 知识点     | 旧做法或边界                        | 当前方案                                            |
| ---------- | ----------------------------------- | --------------------------------------------------- |
| 透明色语法 | 老浏览器不支持空格与斜线语法        | 使用 rgba(255, 255, 255, .9) 回退                   |
| 占位文字   | 历史浏览器需要前缀                  | 标准 ::placeholder，按实际浏览器目标处理前缀        |
| 长单词换行 | word-break: break-word 属历史兼容值 | overflow-wrap: anywhere；理解其对最小内容尺寸的影响 |

依据：[CSS Backgrounds](https://www.w3.org/TR/css-backgrounds-3/)、[CSS Text](https://www.w3.org/TR/css-text-3/)、[透明度](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)。

