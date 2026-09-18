---
title: "CSS 盒模型、定位与溢出"
description: "布局先考虑正常文档流，再选择 Flex、Grid 或定位。浮动用于文本环绕，不是沿 z 轴移动。"
type: "basics"
module: "css"
moduleName: "CSS"
area: "前端"
group: "样式"
knowledge: ["页面布局"]
tags: ["CSS","盒模型","定位","浮动","CSS Grid"]
order: 30
---

# CSS 盒模型、定位与溢出

布局先考虑正常文档流，再选择 Flex、Grid 或定位。浮动用于文本环绕，不是沿 z 轴移动。

## 尺寸与文档流

盒模型包括 content、padding、border 和 margin。margin 简写一个值用于四边，两个值是上下/左右，四个值按上右下左。垂直外边距只在特定普通块布局条件下折叠，Flex/Grid 项目间不折叠。

| display      | 行为                                                 |
| ------------ | ---------------------------------------------------- |
| block        | 通常形成块级盒，参与文档流                           |
| inline       | 行内排布，普通非替换元素的 width/height 不按块盒生效 |
| inline-block | 行内排布，但可设置盒子宽高                           |
| none         | 不生成布局盒                                         |

`visibility: hidden` 通常仍占位，`opacity: 0` 仍可能响应交互；隐藏方案需根据语义选择。

## 定位、层叠与滚动

relative 保留原布局位置；absolute 脱离正常流，以包含块定位；fixed 通常相对视口，但 transform 等祖先可能改变包含块；sticky 受滚动容器、inset 和包含块约束。z-index 在层叠上下文中比较，不能无限越过祖先层级。

`overflow: visible` 不裁切也不创建滚动容器；auto 按需要滚动，hidden 可编程滚动，clip 不创建滚动容器。

```css
.layout { display: grid; grid-template-columns: 15rem minmax(0, 1fr); gap: 1rem; }
.sidebar { position: sticky; top: 1rem; align-self: start; }
.content { min-width: 0; overflow-wrap: anywhere; }
```

### 版本变化与兼容

| 知识点        | 历史方案                 | 当前方案与回退                                       |
| ------------- | ------------------------ | ---------------------------------------------------- |
| 多列布局      | float 配合清除浮动       | 优先 Grid/Flex；float 仍有效                         |
| 包含浮动      | clearfix 伪元素          | display: flow-root；按浏览器目标回退                 |
| sticky / clip | 支持能力与历史浏览器不同 | 不支持 sticky 时保留正常流；clip 不可机械替换 hidden |

依据：[定位](https://developer.mozilla.org/en-US/docs/Web/CSS/position)、[overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)、[盒模型](https://www.w3.org/TR/css-box-3/)。

