---
title: "Fetch、XMLHttpRequest 与异步请求"
description: "异步请求把网络等待与页面交互分开。HTTP 错误、网络错误和业务错误是不同层次，不能只判断请求是否完成。"
type: "basics"
module: "javascript"
moduleName: "JavaScript"
area: "前端"
group: "语言基础"
knowledge: ["浏览器编程","网络请求"]
tags: ["JavaScript","Ajax","HTTP","Fetch","CORS"]
order: 50
---

# Fetch、XMLHttpRequest 与异步请求

异步请求把网络等待与页面交互分开。HTTP 错误、网络错误和业务错误是不同层次，不能只判断请求是否完成。

## 当前写法

```js
async function loadProfile(signal) {
  const response = await fetch('/api/profile', {
    headers: { Accept: 'application/json' }, signal
  });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
}
const controller = new AbortController();
loadProfile(controller.signal).then(console.log).catch(error => {
  if (error.name !== 'AbortError') console.error(error);
});
```

fetch 遇到 404/500 通常仍正常返回 Response；json 解析也可能失败。POST JSON 需设置 Content-Type 并 JSON.stringify；发送 FormData 不要手工设置 multipart boundary。

## 兼容旧代码与跨域

XHR 的 readyState 4 只代表结束，还需检查 status。上传进度可使用 xhr.upload。CORS 由服务端响应策略控制；no-cors 产生不可读取的 opaque 响应，不能绕过限制。携带跨源 Cookie 还受凭证选项、SameSite 和服务端设置影响。

### 版本变化与兼容

| 知识点   | 历史方案                          | 当前方案                                                   |
| -------- | --------------------------------- | ---------------------------------------------------------- |
| 请求组合 | XHR 回调                          | fetch + Promise；XHR 并未整体废弃                          |
| 取消     | xhr.abort()                       | fetch 使用 AbortController；检测支持度                     |
| JSONP    | 执行远端脚本，只适合受限 GET 场景 | 使用 CORS API 或受控服务端代理，不能将 JSONP 当作通用 Ajax |

依据：[Fetch 使用指南](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)、[XHR 标准](https://xhr.spec.whatwg.org/)。

