---
title: "Bootstrap 组件、表单与新版替代"
description: "Bootstrap 组件需要正确结构、样式与交互脚本共同配合。只复制类名不保证完整行为，也不能代替 label、键盘焦点和状态说明。"
type: "basics"
module: "bootstrap"
moduleName: "Bootstrap"
area: "前端"
group: "UI 框架"
knowledge: ["框架基础","组件"]
tags: ["Bootstrap","Bootstrap 3","表单","组件","过时","Bootstrap 5","废弃"]
order: 20
---

# Bootstrap 组件、表单与新版替代

Bootstrap 组件需要正确结构、样式与交互脚本共同配合。只复制类名不保证完整行为，也不能代替 label、键盘焦点和状态说明。

## 常用组合

```html
<div class="card">
  <div class="card-body">
    <label class="form-label" for="name">名称</label>
    <input class="form-control" id="name" name="name" required>
    <button class="btn btn-primary mt-3" type="button">预览</button>
  </div>
</div>
```

表格可用 table 与 table-responsive 包裹；表单错误使用 is-invalid 和关联的说明，不能仅依赖红色。Modal、Dropdown 等交互需要对应 JS；依赖 Popper 的组件可使用包含它的 bundle。图标库独立选择，不假设 Bootstrap 5 自带 Glyphicons。

### 版本变化与兼容

| 历史用法                     | 当前对应                         | 版本边界                                                  |
| ---------------------------- | -------------------------------- | --------------------------------------------------------- |
| panel / well / thumbnail     | card 等布局组合                  | 3 → 4 迁移需要重组 HTML                                   |
| pull-left/right、sr-only     | float-start/end、visually-hidden | 按 5.x 类名迁移，注意 RTL                                 |
| data-toggle、jQuery 插件依赖 | data-bs-toggle、原生 JS API      | 5.0 移除 jQuery 依赖，不等于禁止业务使用 jQuery           |
| text-muted                   | text-body-secondary              | 5.3 弃用旧辅助类；此处为单项弃用，不是整个 Bootstrap 废弃 |

依据：[迁移指南](https://getbootstrap.com/docs/5.3/migration/)、[JavaScript 组件](https://getbootstrap.com/docs/5.3/getting-started/javascript/)、[表单](https://getbootstrap.com/docs/5.3/forms/overview/)。

