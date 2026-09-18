---
title: "Memcached 缓存、协议与 PHP 客户端"
description: "Memcached 是易失缓存服务。PHP 的 Memcache 和 Memcached 是两个不同扩展，服务名称不能直接决定该使用哪一套客户端方法。"
type: "basics"
module: "memcached"
moduleName: "Memcached"
area: "数据库"
group: "缓存"
knowledge: ["缓存基础"]
tags: ["Memcached","缓存","PHP","文本协议","CAS","缓存一致性"]
order: 10
---

# Memcached 缓存、协议与 PHP 客户端

Memcached 是易失缓存服务。PHP 的 Memcache 和 Memcached 是两个不同扩展，服务名称不能直接决定该使用哪一套客户端方法。

## 协议与过期

文本协议示例中最后一个数字是数据字节数，实际通信使用 CRLF：

```text
set name 0 300 3
Ada
get name
delete name
```

set 写入，add 仅不存在时写入，replace 仅存在时替换。gets 返回 CAS 标记，cas 可避免覆盖其他客户端的新写入。缓存空间不足可能逐出数据，因此“未到 TTL”不保证一定可读。

## PHP 示例

```php
<?php
$cache = new Memcached();
$cache->addServer('127.0.0.1', 11211);
$cache->set('name', 'Ada', 300);
$value = $cache->get('name');
if ($cache->getResultCode() === Memcached::RES_NOTFOUND) {
    // 在业务层回源加载并写入缓存
}
```

需要已安装 Memcached 扩展和服务。其他返回码应按连接/协议错误处理。存储值为 false 时不能只用真假判断命中。

### 版本变化与兼容

| 知识点   | 规则或差异                                     | 方案                                                        |
| -------- | ---------------------------------------------- | ----------------------------------------------------------- |
| TTL      | 0 表示不主动过期；超过 30 天按 Unix 时间戳解释 | 长期限明确计算绝对时间；仍可能被逐出                        |
| PHP 扩展 | Memcache 与 Memcached 长期并存                 | 不把 connect 与 addServer 等 API 混用，也不无依据标整项废弃 |
| 协议演进 | basic/meta/binary 能力不同                     | 以服务和客户端共同支持的协议为准                            |

依据：[基础协议](https://docs.memcached.org/protocols/basic/)、[PHP Memcached](https://www.php.net/manual/en/book.memcached.php)。

