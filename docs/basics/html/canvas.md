---
title: "HTML 图片、链接样式与 Canvas 绘图"
description: "Canvas 是脚本控制的位图画布；绘制内容不会自动成为可访问的 DOM。图表应提供文字说明或数据表。"
type: "basics"
module: "html"
moduleName: "HTML"
area: "前端"
group: "语言基础"
knowledge: ["图形与样式"]
tags: ["HTML","Canvas","图形","高分屏"]
order: 60
---

# HTML 图片、链接样式与 Canvas 绘图

Canvas 是脚本控制的位图画布；绘制内容不会自动成为可访问的 DOM。图表应提供文字说明或数据表。

## 图片与链接

图片设置宽高可减少布局偏移；响应式资源可用 `srcset`、`sizes`。普通图片使用 `max-width: 100%; height: auto`。保留链接和按钮的键盘焦点样式，不用去掉 outline 来代替设计。

## 画布尺寸与绘制

```html
<canvas id="chart" width="300" height="150" aria-label="蓝色矩形示例">蓝色矩形</canvas>
<script>
  const canvas = document.querySelector('#chart');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const ratio = window.devicePixelRatio || 1;
    canvas.style.width = '300px';
    canvas.style.height = '150px';
    canvas.width = Math.round(300 * ratio);
    canvas.height = Math.round(150 * ratio);
    ctx.scale(ratio, ratio);
    ctx.fillStyle = '#1769aa';
    ctx.fillRect(20, 20, 120, 60);
  }
</script>
```

CSS 尺寸与画布像素尺寸不同，修改 width/height 会清空画布并重置上下文状态。路径使用 `beginPath`，动画通过 `requestAnimationFrame` 更新；读取跨源图片绘制后的像素需要满足 CORS，否则画布被污染而禁止读取。

### 版本变化与兼容

| 知识点          | 能力差异              | 兼容方案                       |
| --------------- | --------------------- | ------------------------------ |
| 2D Canvas       | 与 WebGL 是不同上下文 | 检查 getContext 返回值         |
| 高分屏          | 设备像素比会变化      | 根据显示尺寸重新分配像素并重绘 |
| OffscreenCanvas | 较新的独立画布能力    | 检测后启用，保留主线程绘制路径 |

依据：[Canvas 标准](https://html.spec.whatwg.org/multipage/canvas.html)。

