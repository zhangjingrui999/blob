---
title: "HTML 链接、URL 与资源路径"
description: "URL 由协议、主机、端口、路径、查询和片段等部分组成。路径解析以文档的基准 URL 为准，不以源文件在编辑器里的位置为准。"
type: "basics"
module: "html"
moduleName: "HTML"
area: "前端"
group: "语言基础"
knowledge: ["文档基础"]
tags: ["HTML","URL","锚点","颜色","安全"]
order: 30
---

# HTML 链接、URL 与资源路径

URL 由协议、主机、端口、路径、查询和片段等部分组成。路径解析以文档的基准 URL 为准，不以源文件在编辑器里的位置为准。

## 路径和编码

| 写法                        | 含义                          |
| --------------------------- | ----------------------------- |
| `https://example.com/docs/` | 绝对 URL                      |
| `/images/logo.svg`          | 当前站点根路径                |
| `./images/logo.svg`         | 当前目录下的相对路径          |
| `../index.html`             | 上一级目录                    |
| `#install`                  | 当前页面 id 为 install 的锚点 |

```js
const url = new URL('./search', 'https://example.com/docs/');
url.searchParams.set('q', 'CSS & HTML');
console.log(url.href); // 查询参数会按 URL 规则编码
```

链接文字应说明目标。新窗口链接可显式写 `rel="noopener"`；只有需要隐藏来源时才加 `noreferrer`。`mailto:`、`tel:` 的行为取决于设备及其处理程序。

## 部署与排查

子路径部署要同时核对构建工具的 base、页面链接与资源地址。文件名大小写应与服务器一致。404 时检查最终请求 URL；页面返回 200 但脚本响应为 HTML 通常是回退规则过宽。

### 版本变化与兼容

| 知识点     | 变化                                              | 兼容方案                               |
| ---------- | ------------------------------------------------- | -------------------------------------- |
| URL 操作   | 现代浏览器提供 URL / URLSearchParams              | 优先标准 API，旧环境按支持表补兼容实现 |
| 新窗口隔离 | 现代 HTML 对 `target="_blank"` 隐含 noopener 行为 | 显式 rel 便于兼容旧浏览器并表达意图    |

依据：[URL 标准](https://url.spec.whatwg.org/)、[链接关系](https://html.spec.whatwg.org/multipage/links.html#link-type-noopener)。

