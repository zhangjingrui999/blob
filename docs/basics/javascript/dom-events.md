---
title: "DOM 操作、事件传播与生命周期"
description: "DOM 是文档对象模型。查询结果可能为空，事件委托需要区分事件来源 target 与当前监听节点 currentTarget。"
type: "basics"
module: "javascript"
moduleName: "JavaScript"
area: "前端"
group: "语言基础"
knowledge: ["浏览器编程"]
tags: ["JavaScript","DOM","BOM","事件","过时","事件委托"]
order: 40
---

# DOM 操作、事件传播与生命周期

DOM 是文档对象模型。查询结果可能为空，事件委托需要区分事件来源 target 与当前监听节点 currentTarget。

## 查询和更新

querySelector 返回首个匹配元素或 null，querySelectorAll 返回静态 NodeList。写文本用 textContent，表单当前输入用 value，布尔选中状态用 checked。不要把未经处理的外部字符串写入 innerHTML。

```js
const list = document.querySelector('#list');
const controller = new AbortController();
list?.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest('button[data-id]');
  if (!button || !list.contains(button)) return;
  console.log(button.dataset.id);
}, { signal: controller.signal });
// 所属页面或组件销毁时执行 controller.abort()
```

## 事件语义

事件经历捕获、目标和冒泡阶段，但并非所有事件都冒泡。preventDefault 取消可取消的默认行为；stopPropagation 阻止传播，两者不等价。输入变化使用 input，完整提交在 form 的 submit 上处理。passive 监听器不能调用 preventDefault 取消默认行为。

### 版本变化与兼容

| 知识点   | 历史状态                                   | 当前方案                                                   |
| -------- | ------------------------------------------ | ---------------------------------------------------------- |
| 键盘     | keyCode / which 是遗留接口                 | key 表示逻辑按键，code 表示物理键位                        |
| 监听清理 | removeEventListener 需要相同函数和 capture | 支持 signal 的环境可用 AbortController；旧环境保留显式移除 |
| 输入法   | keydown 不代表最终文本变化                 | input 配合 composition 事件，避免破坏中文输入              |

依据：[DOM 标准](https://dom.spec.whatwg.org/)、[UI Events](https://w3c.github.io/uievents/#legacy-key-models)。

