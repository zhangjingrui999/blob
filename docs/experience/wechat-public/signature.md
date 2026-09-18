---
title: "微信公众号首次接入签名校验"
description: "以下代码仅演示明文模式首次 GET 接入校验，不是接收 POST 消息或安全模式加解密的完整实现。"
type: "experience"
module: "wechat-public"
moduleName: "微信公众号"
area: "微信开发"
group: "公众号"
knowledge: ["接入实践"]
tags: ["微信公众号","签名","PHP","验签"]
order: 20
---

# 微信公众号首次接入签名校验

以下代码仅演示明文模式首次 GET 接入校验，不是接收 POST 消息或安全模式加解密的完整实现。

## 最小校验入口

```php
<?php
declare(strict_types=1);
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    http_response_code(405);
    exit;
}
$token = getenv('WECHAT_TOKEN');
if (!is_string($token) || $token === '') {
    http_response_code(500);
    exit;
}
foreach (['signature', 'timestamp', 'nonce', 'echostr'] as $key) {
    if (!isset($_GET[$key]) || !is_string($_GET[$key])) {
        http_response_code(400);
        exit;
    }
}
$parts = [$token, $_GET['timestamp'], $_GET['nonce']];
sort($parts, SORT_STRING);
$expected = sha1(implode('', $parts));
if (!hash_equals($expected, $_GET['signature'])) {
    http_response_code(403);
    exit;
}
header('Content-Type: text/plain; charset=utf-8');
echo $_GET['echostr'];
```

Token 与平台配置一致，从服务端环境读取。比较成功后原样返回 echostr，之前不能输出 BOM、调试信息或 HTML。算法由接入协议规定，不能自行换成另一散列算法。

## 接入后

正式消息接口还需独立处理 POST、消息去重、响应时限和加密模式。不要把首次验证成功等同于整套消息接口已实现。

### 版本变化与兼容

| 范围         | 变化或边界                             | 方案                                         |
| ------------ | -------------------------------------- | -------------------------------------------- |
| PHP 5.6+     | 提供 hash_equals                       | 使用受支持 PHP 分支并严格校验参数类型        |
| 明文首次 GET | signature 对应 Token、timestamp、nonce | 本例仅用于该协议分支                         |
| 加密消息     | 涉及 msg_signature 与密文等输入        | 按当前官方协议实现，不复用此函数假装完整验签 |

依据：[PHP hash_equals](https://www.php.net/manual/en/function.hash-equals.php)、[接入文档入口](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html)。平台页面本次未能完整读取，接入时需核对后台所选模式。

