---
title: "小程序数据、事件、列表与模板"
description: "小程序逻辑层与视图层通过数据同步交互。Page 定义页面，data 提供渲染数据；直接修改 this.data 不会自动完成视图更新。"
type: "basics"
module: "wechat-miniapp"
moduleName: "微信小程序"
area: "微信开发"
group: "小程序"
knowledge: ["小程序基础"]
tags: ["微信小程序","WXML","事件","模板","setData","兼容性"]
order: 10
---

# 小程序数据、事件、列表与模板

小程序逻辑层与视图层通过数据同步交互。Page 定义页面，data 提供渲染数据；直接修改 this.data 不会自动完成视图更新。

## 页面和事件

```js
Page({
  data: { items: [{ id: 'a', name: '笔记' }], selected: '' },
  choose(event) {
    this.setData({ selected: event.currentTarget.dataset.id });
  }
});
```

```html
<view wx:for="{{items}}" wx:key="id" data-id="{{item.id}}" bindtap="choose">
  {{item.name}}
</view>
<text>{{selected}}</text>
```

currentTarget 是绑定处理函数的节点，target 可能是内部子节点。bind 与 catch 的传播语义不同。App 在入口注册全局应用，getApp 获取应用实例，不是页面实例化函数；业务状态不应依赖手动调用生命周期。

## 条件与模板

wx:if/elif/else 组织分支；循环 key 使用稳定字段名或适用的 *this，不能把“字段名或 *this”说明文字整体写入属性。嵌套循环显式命名 item/index。import 引入模板定义，include 引入适用的片段，不是简单“动态/静态”区别。

### 版本变化与兼容

| 能力         | 已核实边界                         | 方案                                       |
| ------------ | ---------------------------------- | ------------------------------------------ |
| setData      | 逻辑数据同步变化、视图异步更新     | 渲染完成后操作放回调，避免频繁传整个大对象 |
| 基础库 1.5.0 | setData 渲染回调支持               | 更低版本不能假设回调可用                   |
| 组件与页面   | Component 的方法和生命周期结构不同 | 不把 Page 顶层方法直接混入 components 配置 |

依据：[官方 Page 类型声明](https://github.com/wechat-miniprogram/api-typings/blob/master/types/wx/lib.wx.page.d.ts)、[组件声明与 setData](https://github.com/wechat-miniprogram/api-typings/blob/master/types/wx/lib.wx.component.d.ts)。WXML 细节还应结合目标基础库真机验证。

