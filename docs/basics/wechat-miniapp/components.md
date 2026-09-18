---
title: "小程序组件、表单、导航与登录边界"
description: "小程序组件不是浏览器 HTML 标签，属性、事件和渲染能力应按小程序平台定义使用。界面数据、登录身份和用户资料是不同层次。"
type: "basics"
module: "wechat-miniapp"
moduleName: "微信小程序"
area: "微信开发"
group: "小程序"
knowledge: ["小程序基础","组件"]
tags: ["微信小程序","组件","表单","导航","过时","兼容性"]
order: 20
---

# 小程序组件、表单、导航与登录边界

小程序组件不是浏览器 HTML 标签，属性、事件和渲染能力应按小程序平台定义使用。界面数据、登录身份和用户资料是不同层次。

## 表单与导航

input 的输入从事件 detail.value 获取；checkbox-group、radio-group 按组收集选项。scroll-view 的滚动方向和可用尺寸需明确。navigateTo 保留当前页面，redirectTo 替换，switchTab 用于已配置的 tabBar 页面；不能把所有跳转都交给同一 API。

## 登录与资料

wx.login 获取临时凭证并交由业务服务端换取登录态，AppSecret 仅放服务端。头像昵称是用户资料，不能把获取资料成功当作完整身份认证。旧 getUserInfo/getUserProfile 示例已受平台规则调整影响，接口存在不保证返回旧教程描述的真实资料。

可按当前平台能力使用用户主动填写头像昵称的交互；实现前核对对应组件和账号规则，拒绝授权时保留基本可用流程。

### 版本变化与兼容

| 能力         | 已核实变化                      | 方案                                                             |
| ------------ | ------------------------------- | ---------------------------------------------------------------- |
| 基础库 1.1.1 | 提供 wx.canIUse                 | 检查 API/组件属性支持，不只字符串比较版本号                      |
| 2.10.4       | getUserProfile 的文档基础库门槛 | 官方声明同时提示头像昵称规则已调整；不能把版本门槛等同于当前权限 |
| 平台政策     | 官方页面本次无法完整读取        | 不写死最新权限、额度和实施日期，上线前在后台及公告确认           |

依据：[微信官方 API 声明](https://github.com/wechat-miniprogram/api-typings/blob/master/types/wx/lib.wx.api.d.ts)、[官方兼容性入口](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。

