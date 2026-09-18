---
title: "jQuery 事件委托、动画与 Ajax"
description: "事件使用 on/off 管理，异步请求区分成功、失败与清理。维护旧页面时先确认插件和 jQuery 版本，再升级 API。"
type: "basics"
module: "jquery"
moduleName: "jQuery"
area: "前端"
group: "工具库"
knowledge: ["事件与通信"]
tags: ["jQuery","事件","Ajax","动画","废弃","jQuery 4"]
order: 30
---

# jQuery 事件委托、动画与 Ajax

事件使用 on/off 管理，异步请求区分成功、失败与清理。维护旧页面时先确认插件和 jQuery 版本，再升级 API。

## 事件与请求

```js
$('#list').on('click.notes', 'button', function () {
  console.log(this.dataset.id);
});
$.ajax({ url: '/api/items', dataType: 'json' })
  .done(data => console.log(data))
  .fail((xhr, status) => console.error(status, xhr.status));
// 页面销毁时：$('#list').off('.notes');
```

委托可以处理之后加入的子元素。箭头函数没有 jQuery 回调中的动态 this，需要时使用普通函数。动画排队会造成连续操作积压，按需求 stop 并尊重减少动态效果偏好。jqXHR 提供 Deferred 接口，不应把它与原生 Promise 的所有行为视为相同。

### 版本变化与兼容

| 版本 | 变化                                               | 替代                                                        |
| ---- | -------------------------------------------------- | ----------------------------------------------------------- |
| 1.9  | toggle(fn, fn) 事件轮换移除                        | 自己保存状态；显示隐藏 toggle() 是另一 API                  |
| 3.0  | load/unload/error 事件简写移除；bind/delegate 弃用 | on/off；load(url) Ajax 方法是另一重载                       |
| 4.0  | 更多历史简写/工具 API 清理                         | 使用迁移指南和匹配版本 Migrate 定位插件依赖，不永久掩盖警告 |

依据：[on](https://api.jquery.com/on/)、[3.0 升级](https://jquery.com/upgrade-guide/3.0/)、[4.0 升级](https://jquery.com/upgrade-guide/4.0/)。

