---
title: "Vue 表单交互、资源与路由参数"
description: "页面交互优先由状态驱动。表单值使用 v-model，样式用 class/style 绑定，路由状态由路由库读取。"
type: "experience"
module: "vue"
moduleName: "Vue"
area: "前端"
group: "应用框架"
knowledge: ["旧版项目排错"]
tags: ["Vue","Vue 2","路由","表单","过时","Vue 3","Vue Router"]
order: 60
---

# Vue 表单交互、资源与路由参数

页面交互优先由状态驱动。表单值使用 v-model，样式用 class/style 绑定，路由状态由路由库读取。

## 参数与导航

Router 4 中按名称传动态参数：

```ts
// 已创建并注册路由的组件 setup 内
const destination = { name: 'user', params: { id: '42' }, query: { tab: 'profile' } };
// 使用 useRouter() 得到的 router.push(destination) 导航
```

路由需声明相应 name 和动态段。传 path 时 params 不按命名路由方式补入；query 显示在 URL 中，不放密钥和敏感对象。刷新后仍需存在的数据放入 URL 或服务端持久层，不仅存组件内存。

## 输入和资源

普通取值不必用 $refs 读取 DOM；只有聚焦等命令式操作才使用模板引用。时间戳明确秒/毫秒和时区。构建资源用静态导入或可分析的 URL，不任意拼接源码目录字符串。请求随参数变化时处理取消及旧响应覆盖。

### 版本变化与兼容

| 版本         | 变化                            | 方案                                                |
| ------------ | ------------------------------- | --------------------------------------------------- |
| Vue 2 → 3    | 实例式访问与组合式 API 并存迁移 | setup 使用 useRoute/useRouter；Options API 并未废弃 |
| Router 3 → 4 | 参数和导航错误处理有变化        | 只传已声明 params，其他信息用 query 或状态          |
| Vue 3.5      | useTemplateRef                  | 旧 Vue 3 用 ref 与同名模板引用                      |

依据：[导航参数](https://router.vuejs.org/guide/essentials/navigation.html)、[组合式路由](https://router.vuejs.org/guide/advanced/composition-api.html)、[模板引用](https://vuejs.org/guide/essentials/template-refs.html)。

