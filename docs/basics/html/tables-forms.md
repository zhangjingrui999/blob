---
title: "HTML 表格、表单与校验"
description: "表格承载二维数据，表单收集用户输入。客户端校验用于反馈，服务端校验才是数据进入系统前的边界。"
type: "basics"
module: "html"
moduleName: "HTML"
area: "前端"
group: "语言基础"
knowledge: ["文档基础","数据输入"]
tags: ["HTML","表格","表单","废弃","表单校验","可访问性"]
order: 50
---

# HTML 表格、表单与校验

表格承载二维数据，表单收集用户输入。客户端校验用于反馈，服务端校验才是数据进入系统前的边界。

## 表格与表单

表格使用 `caption`、`thead`、`tbody` 和带 `scope` 的 `th` 说明关系；`rowspan`、`colspan` 用于单元格合并，布局使用 CSS。

```html
<form action="/profile" method="post">
  <label for="email">邮箱</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <button type="submit">保存</button>
</form>
```

实际服务端还需处理身份、权限和 CSRF 防护。没有 `name` 的控件通常不会作为命名字段提交；`disabled` 控件不提交，`readonly` 控件在适用类型上仍可提交。布尔属性写成 `disabled="false"` 仍表示启用该属性。

## 输入类型与提交

单选使用相同 `name`；未选中的 checkbox 不提交该项。文件上传使用 POST 和 `multipart/form-data`；`accept` 只是选择提示。电话和编号应使用字符串，避免 number 丢失前导零。

### 版本变化与兼容

| 知识点   | 历史状态或差异                                 | 当前方案                           |
| -------- | ---------------------------------------------- | ---------------------------------- |
| 表格外观 | align、bgcolor 等展示属性已废弃                | CSS 控制边框、间距与对齐           |
| 日期输入 | `datetime` 已废弃；`datetime-local` 不包含时区 | 单独约定时区与服务端存储格式       |
| 表单控件 | 日期选择器等 UI 随浏览器变化                   | 验证数据格式，不依赖某一种弹出界面 |

依据：[HTML 表单](https://html.spec.whatwg.org/multipage/forms.html)、[输入类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)。

