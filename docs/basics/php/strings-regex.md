---
title: "PHP 字符串、编码、正则与密码散列"
description: "PHP 字符串是字节序列。处理 UTF-8 文本时应区分字节、字符与用户可见字素，不能用 strlen 的结果直接当中文字数。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["语言基础","字符串"]
tags: ["PHP","字符串","正则表达式","废弃","编码","密码散列"]
order: 30
---

# PHP 字符串、编码、正则与密码散列

PHP 字符串是字节序列。处理 UTF-8 文本时应区分字节、字符与用户可见字素，不能用 strlen 的结果直接当中文字数。

## 文本和输出

strlen/substr 按字节；mb_strlen/mb_substr 需要 mbstring 并明确编码。strpos 的 0 表示开头匹配，判断不存在用 `=== false`。str_pad 的长度参数是目标总长度，默认向右补齐。

```php
<?php
$text = '<你好>';
echo htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$data = json_decode('{"ok":true}', true, 512, JSON_THROW_ON_ERROR);
$isElevenDigits = preg_match('/\A[0-9]{11}\z/', '13800138000') === 1;
```

HTML 转义、SQL 参数化、URL 编码是不同操作。strip_tags 不是完整 HTML 安全净化器，addslashes 不是数据库防注入方案。preg_match 返回 1、0 或 false；模式中的普通空格也参与匹配，除非使用相应扩展模式。

## 随机与密码

密码用 password_hash / password_verify，按需要 password_needs_rehash；MD5 是散列而非可逆加密，也不适合保存密码。安全随机令牌用 random_bytes；验证码还需服务端有效期、限流和一次性使用。

### 版本变化与兼容

| 版本      | 变化                                         | 方案                                                     |
| --------- | -------------------------------------------- | -------------------------------------------------------- |
| 5.5 → 7.0 | preg_replace 的 /e 弃用后移除                | preg_replace_callback                                    |
| 7.3       | JSON_THROW_ON_ERROR                          | 旧环境检查 json_last_error；不要混淆 null 数据与解析失败 |
| 8.0       | str_contains、str_starts_with、str_ends_with | 旧环境使用严格比较的位置检查                             |

依据：[字符串](https://www.php.net/manual/en/language.types.string.php)、[preg_replace](https://www.php.net/manual/en/function.preg-replace.php)、[JSON](https://www.php.net/manual/en/function.json-decode.php)、[密码散列](https://www.php.net/manual/en/function.password-hash.php)。

