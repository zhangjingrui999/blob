---
title: "类名、单选框与输入校验实践"
description: "表单交互应使用 DOM 属性和原生校验能力，避免用字符串包含关系判断类名或只靠键盘事件过滤输入。"
type: "experience"
module: "javascript"
moduleName: "JavaScript"
area: "前端"
group: "语言基础"
knowledge: ["表单实践"]
tags: ["JavaScript","DOM","表单","表单校验"]
order: 10
---

# 类名、单选框与输入校验实践

表单交互应使用 DOM 属性和原生校验能力，避免用字符串包含关系判断类名或只靠键盘事件过滤输入。

## 类名与状态

```js
const input = document.querySelector('#phone');
if (input instanceof HTMLInputElement) {
  input.classList.toggle('is-invalid', !input.checkValidity());
  console.log(input.classList.contains('is-invalid'));
}
```

className.indexOf 会把相似类名误判为匹配，classList.contains 按完整类名判断。单选框当前状态用 checked；普通 radio 再次点击不会自动取消，允许空选时提供“未选择”选项或明确重置操作。

## 电话输入

```html
<label for="phone">联系电话</label>
<input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
```

不要把电话当成可计算数字。手机号规则必须按业务地区制定，十一位数字只是形状校验。粘贴、输入法和辅助输入不一定经过 keydown；服务端须重新验证。若显示错误，关联可读提示，不只改变边框颜色。

### 版本变化与兼容

| 知识点    | 旧做法                        | 当前方案                               |
| --------- | ----------------------------- | -------------------------------------- |
| 状态读写  | HTML attribute 被当作实时状态 | 使用 value、checked 等 DOM 属性        |
| 输入过滤  | keyCode 禁止非数字            | 原生类型、input 反馈与服务端验证       |
| inputmode | 仅影响虚拟键盘提示            | 不支持时仍允许输入，不承担数据校验职责 |

依据：[HTML 输入控件](https://html.spec.whatwg.org/multipage/input.html)、[classList](https://dom.spec.whatwg.org/#dom-element-classlist)。

