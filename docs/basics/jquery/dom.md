---
title: "jQuery DOM 属性、样式与内容更新"
description: "HTML attribute、DOM property 和 jQuery data 缓存是不同层次。读写当前表单状态时使用相应属性 API。"
type: "basics"
module: "jquery"
moduleName: "jQuery"
area: "前端"
group: "工具库"
knowledge: ["DOM 操作"]
tags: ["jQuery","DOM","样式","jQuery 4"]
order: 20
---

# jQuery DOM 属性、样式与内容更新

HTML attribute、DOM property 和 jQuery data 缓存是不同层次。读写当前表单状态时使用相应属性 API。

## 常用操作

```js
const $checkbox = $('#enabled');
$checkbox.prop('checked', true);
$('#name').val('Ada');
$('#message').text('保存成功');
$('.card').addClass('active').css('border-color', '#1769aa');
```

attr 面向标记属性，prop 面向实时对象属性；val 读写控件值。text 写纯文本，html 会解析 HTML，不接收未经处理的用户输入。data 读取后可能缓存，不与后续 data-* attribute 修改自动同步。

## 节点与尺寸

append/prepend 插入内部，before/after 插入外部。remove 移除并清理 jQuery 数据和事件；detach 便于之后重新挂回。width 与 outerWidth 统计范围不同，边框、内边距、margin 是否计入需看方法参数。

### 版本变化与兼容

| 版本     | 变化                                  | 方案                                             |
| -------- | ------------------------------------- | ------------------------------------------------ |
| 1.6      | 引入 prop 明确属性区分                | 不用 attr('checked') 判断当前选中状态            |
| 4.0      | css 数值自动补 px 的属性范围收紧      | 需要长度单位时显式传 '10px' 等字符串             |
| 原生 DOM | classList、textContent、append 等能力 | 渐进迁移时注意集合操作和事件清理语义并不完全等价 |

依据：[prop](https://api.jquery.com/prop/)、[data](https://api.jquery.com/data/)、[4.0 升级指南](https://jquery.com/upgrade-guide/4.0/)。

