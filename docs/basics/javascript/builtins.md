---
title: "JavaScript 数组、字符串、日期与正则"
description: "内置对象提供集合、文本和日期运算。选择方法时先确认是否修改原对象、返回什么，以及错误如何表示。"
type: "basics"
module: "javascript"
moduleName: "JavaScript"
area: "前端"
group: "语言基础"
knowledge: ["语言基础","内置对象"]
tags: ["JavaScript","数组","字符串","正则表达式","ES2023","异步"]
order: 30
---

# JavaScript 数组、字符串、日期与正则

内置对象提供集合、文本和日期运算。选择方法时先确认是否修改原对象、返回什么，以及错误如何表示。

## 数组和字符串

```js
const values = [10, 2, 1];
const sorted = [...values].sort((a, b) => a - b);
const doubled = values.map(value => value * 2);
const total = values.reduce((sum, value) => sum + value, 0);
console.log(sorted, doubled, total);
console.log(/^\d{11}$/.test('13800138000')); // 仅检查十一位数字，不证明号码有效
```

sort/splice/reverse 修改数组，slice/map/filter 返回新数组。数组的通用方法位于 Array.prototype；不能把 prototype 当作每个实例的普通属性。字符串不可变；length 按 UTF-16 码元计数，不一定等于用户可见字符数。

## 时间与调度

Date 时间戳使用毫秒；数值构造器月份从 0 开始。交换时间用带时区的 ISO 格式，展示用 Intl.DateTimeFormat。计时器不保证准时执行；倒计时应根据截止时间计算并在完成后清理。动画优先 requestAnimationFrame。

正则使用 test 判断匹配；全局或粘连正则的 lastIndex 会影响多次 test。JSON 用 JSON.parse/stringify，不使用 eval。

### 版本变化与兼容

| 版本       | 能力                                  | 兼容方案                                           |
| ---------- | ------------------------------------- | -------------------------------------------------- |
| ES2015     | Map、Set、Array.from                  | 明确对象键与集合成员的比较规则                     |
| ES2023     | toSorted、toReversed、toSpliced、with | 旧环境可复制后调用原位方法；稀疏数组语义要单独测试 |
| 浏览器 API | 定时器、Intl、DOM 不由同一版本号决定  | 按目标运行时检测与测试                             |

依据：[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)、[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)、[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)。

