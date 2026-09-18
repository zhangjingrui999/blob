---
title: "JavaScript 类型、作用域、函数与模块"
description: "JavaScript 语言与宿主 API 要区分：浏览器提供 DOM，Node.js 提供服务端能力；语言本身不要求存在 document 或 window。"
type: "basics"
module: "javascript"
moduleName: "JavaScript"
area: "前端"
group: "语言基础"
knowledge: ["语言基础"]
tags: ["JavaScript","数据类型","流程控制","函数","ES2015","模块"]
order: 20
---

# JavaScript 类型、作用域、函数与模块

JavaScript 语言与宿主 API 要区分：浏览器提供 DOM，Node.js 提供服务端能力；语言本身不要求存在 document 或 window。

## 类型与比较

基本类型包括 undefined、null、boolean、number、bigint、string、symbol，其余归为对象。`typeof null` 的结果是历史遗留的 object。`const` 禁止重新赋值，不会冻结对象。

```js
const settings = { limit: 20 };
settings.limit = 30;
const input = '12px';
console.log(Number(input)); // NaN：整个字符串不能转成数字
console.log(Number.parseInt(input, 10)); // 12：解析合法前缀
console.log(Number.isNaN(Number(input))); // true
```

优先明确转换并使用严格比较。空数组和空对象都是真值。金融精确计算不能直接依赖二进制浮点数；BigInt 不能直接与 Number 混合运算。

## 作用域与函数

let/const 是块级作用域并存在暂时性死区；var 是函数级作用域。闭包保留对词法环境的访问。普通函数的 this 由调用方式决定，箭头函数捕获外层 this 且不能当构造函数。

```js
export function sum(...values) {
  return values.reduce((total, value) => total + value, 0);
}
```

模块使用 import/export；浏览器使用 `type="module"`。异步任务通过 Promise/async-await 组合，错误在调用层用 try/catch 或 catch 处理。

### 版本变化与兼容

| 版本   | 知识点                             | 兼容方案                                                      |
| ------ | ---------------------------------- | ------------------------------------------------------------- |
| ES2015 | let/const、箭头函数、模块、Promise | 按构建目标转换语法，内置 API 另需 polyfill                    |
| ES2017 | async/await                        | 旧环境使用 Promise 链或编译转换                               |
| ES2020 | 可选链、空值合并、BigInt           | `??` 只处理 null/undefined；BigInt 不可当普通语法补丁随意模拟 |

依据：[ECMAScript 规范](https://tc39.es/ecma262/)、[JavaScript 指南](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)。

