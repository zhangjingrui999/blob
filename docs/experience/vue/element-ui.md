---
title: "Element UI 到 Element Plus：表单、弹窗与上传"
description: "Element UI 面向 Vue 2，Element Plus 面向 Vue 3。迁移时需要同时改组件绑定、插槽和类型，不能只替换包名。"
type: "experience"
module: "vue"
moduleName: "Vue"
area: "前端"
group: "应用框架"
knowledge: ["旧版项目实践"]
tags: ["Vue","Vue 2","Element UI","表单","过时","Vue 3","Element Plus"]
order: 40
---

# Element UI 到 Element Plus：表单、弹窗与上传

Element UI 面向 Vue 2，Element Plus 面向 Vue 3。迁移时需要同时改组件绑定、插槽和类型，不能只替换包名。

## 表单和弹窗

表单项 prop 与 model 字段路径一致，rules 对应同一字段；校验成功后再发请求。弹窗显隐使用明确状态，关闭后是否保留表单按业务决定。以下组件要求已在 Vue 3 项目安装并注册 Element Plus：

```vue
<script setup lang="ts">
import { shallowRef } from 'vue';
const visible = shallowRef(false);
</script>
<template>
  <el-button @click="visible = true">查看</el-button>
  <el-dialog v-model="visible" title="提示">
    <p>操作完成后请检查结果。</p>
  </el-dialog>
</template>
```

## 表格与上传

表格稳定 row-key 便于选择和更新，分页总数来自服务端。上传列表是 UI 状态，真正删除文件需服务端授权；before-upload 校验是用户反馈，服务端还需检查内容和大小。请求失败时不要仅清空列表掩盖错误。

### 版本变化与兼容

| 范围                 | 变化                                 | 方案                                |
| -------------------- | ------------------------------------ | ----------------------------------- |
| Vue 2 / Element UI   | 常见 :visible.sync、slot-scope       | 迁移时按 Vue 3 语法与 Plus 文档重写 |
| Vue 3 / Element Plus | dialog 使用 v-model，插槽用 v-slot/# | 不保留旧 .sync 契约                 |
| Plus 小版本          | Upload 等 props/事件有增补           | 以已安装版本核对 API 表中的版本标记 |

依据：[Dialog](https://element-plus.org/en-US/component/dialog.html)、[Upload](https://element-plus.org/en-US/component/upload.html)、[Form](https://element-plus.org/en-US/component/form.html)。

