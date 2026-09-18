---
title: "Apache 虚拟主机与路由 404 排查"
description: "404 可能来自虚拟主机匹配、公开目录、重写规则或应用路由。先看请求最终落到哪一层，不要一律归因于服务器配置。"
type: "experience"
module: "apache"
moduleName: "Apache"
area: "运维"
group: "Web 服务器"
knowledge: ["部署实践"]
tags: ["Apache","虚拟主机","路由","故障排查","Apache 2.4"]
order: 20
---

# Apache 虚拟主机与路由 404 排查

404 可能来自虚拟主机匹配、公开目录、重写规则或应用路由。先看请求最终落到哪一层，不要一律归因于服务器配置。

## 前端控制器示例

以下是 Apache 2.4 配置片段；需已有正确的 PHP 处理器和 /srv/app/public/index.php：

```apache
<VirtualHost *:80>
    ServerName app.test
    DocumentRoot "/srv/app/public"
    <Directory "/srv/app/public">
        Options -Indexes
        AllowOverride None
        Require all granted
        DirectoryIndex index.php
        FallbackResource /index.php
    </Directory>
</VirtualHost>
```

真实文件仍直接访问，不存在的路径交给入口。静态目录如不应回退，单独设置 FallbackResource disabled。生产部署还需 HTTPS、日志和适当授权，示例是路由最小配置。

## 排查顺序

检查域名解析和 Host；用 httpd -S 确认 vhost；检查文件权限和 DocumentRoot；再查看访问/错误日志与应用路由。修改后 httpd -t 通过再重载。

### 版本变化与兼容

| 范围       | 差异                                      | 方案                                         |
| ---------- | ----------------------------------------- | -------------------------------------------- |
| Apache 2.4 | Require 授权、mod_dir 的 FallbackResource | 按模块文档配置                               |
| 旧重写方案 | mod_rewrite 仍有效                        | 复杂规则继续使用，但检查目录上下文与循环     |
| Nginx      | try_files 属于另一服务器                  | 不放入 Apache 配置，也不无条件删除 =404 规则 |

依据：[虚拟主机](https://httpd.apache.org/docs/2.4/vhosts/examples.html)、[FallbackResource](https://httpd.apache.org/docs/2.4/mod/mod_dir.html#fallbackresource)。

