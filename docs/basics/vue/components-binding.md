---
title: "Vue 响应式、组件通信与双向绑定"
description: "组件状态应有明确来源。父组件传 props，子组件发事件；派生值用 computed。不要通过直接修改 DOM 或父组件内部状态完成普通数据流。"
type: "basics"
module: "vue"
moduleName: "Vue"
area: "前端"
group: "应用框架"
knowledge: ["Vue 基础","组件基础"]
tags: ["Vue","Vue 2","组件通信","指令","过时","废弃","Vue 3"]
order: 30
---

# Vue 响应式、组件通信与双向绑定

组件状态应有明确来源。父组件传 props，子组件发事件；派生值用 computed。不要通过直接修改 DOM 或父组件内部状态完成普通数据流。

## Vue 3.4+ 输入组件

下面是独立的 NameInput.vue，父组件通过 v-model 绑定字符串：

```vue
<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>
<template>
  <label>名称 <input v-model="model"></label>
</template>
```

列表为每项提供稳定 key；不要在同一节点混用 v-if 和 v-for。v-if 控制创建/销毁，v-show 切换 display。class/style 使用对象或数组绑定。不可信内容用文本插值，v-html 需先按业务安全策略净化。

### 版本变化与兼容：通信

| 版本    | 变化                                                       | 方案                                                     |
| ------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| Vue 2   | 默认组件模型 value/input，常见 .sync 与事件总线            | 历史契约需逐项迁移                                       |
| Vue 3   | modelValue/update:modelValue；移除 $on/$off/$once 与 .sync | 明确 props/emits；跨组件状态可用 provide/inject 或状态库 |
| Vue 3.4 | defineModel 稳定可用                                       | 3.0–3.3 显式声明 props/emits，同一契约仍适用             |

依据：[组件 v-model](https://vuejs.org/guide/components/v-model.html)、[迁移变化](https://v3-migration.vuejs.org/breaking-changes/)。

## 响应式与副作用

ref 通过 .value 访问，reactive 包装对象；解构普通 reactive 属性可能丢失连接。watch 观察属性时传 getter。请求应处理失败和取消，计时器、监听器在卸载时清理；SSR 路径避免直接访问 window。

### 版本变化与兼容：响应式

| 版本      | 变化                                                       | 方案                                                          |
| --------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| Vue 2 → 3 | 响应式由 defineProperty 转为 Proxy，常见新增属性限制消除   | 仍注意响应式对象替换、解构和身份比较                          |
| Vue 3.5   | script setup 中 defineProps 解构具有编译器支持的响应式行为 | 更低版本使用 props.xxx / toRefs；这不表示所有对象解构都响应式 |

依据：[响应式基础](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)、[props](https://vuejs.org/guide/components/props.html)。

