---
title: "Layui 分页、表单重绘与弹层排错"
description: "laypage 负责分页，layer 负责弹层，form 负责表单渲染与事件。先识别模块职责，再判断配置和页面样式问题。"
type: "experience"
module: "layui"
moduleName: "Layui"
area: "前端"
group: "UI 框架"
knowledge: ["组件实践"]
tags: ["Layui","分页","表单","弹层","故障排查","Layui 2"]
order: 10
---

# Layui 分页、表单重绘与弹层排错

laypage 负责分页，layer 负责弹层，form 负责表单渲染与事件。先识别模块职责，再判断配置和页面样式问题。

## 分页状态

以下片段需已加载 Layui 且存在 id 为 page 的容器：

```js
layui.use(['laypage'], function () {
  layui.laypage.render({
    elem: 'page', count: 50, limit: 10,
    jump: function (obj, first) {
      if (!first) console.log('请求页码', obj.curr, '页大小', obj.limit);
    }
  });
});
```

first 表示初次渲染。若初始数据尚未加载，不应无条件跳过第一次请求。总量来自服务端，筛选条件变化通常要重置页码；避免每次响应都重新触发相同请求。

## 表单与弹层

通过 prop/checked 修改真实单选状态后，在需要时按表单范围调用 form.render；使用 form 的事件接口，避免与装饰元素重复绑定。弹层异常先检查标准文档模式、父容器 transform/overflow、z-index 和样式覆盖，不把 body 绝对定位当通用修复。

### 版本变化与兼容

| 版本或模块 | 变化与边界                        | 方案                                      |
| ---------- | --------------------------------- | ----------------------------------------- |
| Layui 2    | laypage、layer、form 是不同模块   | 按模块文档加载及调用                      |
| 2.7 / 2.8+ | 定向渲染 / 支持表单域容器定向渲染 | 旧版本按类型与 lay-filter 范围重绘        |
| 弹层       | 布局问题不代表 Layui 整体废弃     | 使用当前匹配版本 API，并定位具体 CSS 影响 |

依据：[laypage](https://layui.dev/docs/2/laypage/)、[form](https://layui.dev/docs/2/form/)、[layer](https://layui.dev/docs/2/layer/)。

