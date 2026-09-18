---
title: "PHP 过滤、进程、HTTP 与系统信息"
description: "系统交互要区分数据校验、命令执行和网络请求。过滤器只验证指定格式，不证明资源可信或一定存在。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["标准库","系统交互"]
tags: ["PHP","进程","网络","过滤","废弃","HTTP"]
order: 100
---

# PHP 过滤、进程、HTTP 与系统信息

系统交互要区分数据校验、命令执行和网络请求。过滤器只验证指定格式，不证明资源可信或一定存在。

## 参数与环境

```php
<?php
$ip = '2001:db8::1';
var_dump(filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6));
$page = filter_var('2', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
if ($page === false) throw new InvalidArgumentException('页码无效');
```

验证失败与合法的 0 区分。请求路径通常看 REQUEST_URI，脚本文件看 SCRIPT_FILENAME；SERVER_SOFTWARE 是服务器标识。$_SERVER 键取决于 SAPI，CLI 中不应假定存在。代理头仅在可信代理边界内解析。

## 外部调用

HTTP 客户端设置连接/总超时，检查传输错误与 HTTP 状态，并保留 TLS 证书校验。业务允许用户指定 URL 时限制协议、目标和重定向，防止访问内部服务。DNS 查询结果也不等同于服务可用。

必须调用进程时固定可执行程序、参数白名单并检查退出码；不要把用户输入拼成 shell 命令。exec 返回最后一行，可通过输出参数收集多行；system 会输出内容。邮件库返回成功通常只代表提交给传输层，不保证投递成功。

### 版本变化与兼容

| 版本 | 变化                        | 方案                                  |
| ---- | --------------------------- | ------------------------------------- |
| 7.4  | proc_open 支持数组形式命令  | 可避免 shell 解析，但仍需验证参数语义 |
| 8.0  | cURL 句柄由资源变为对象     | 不再用 is_resource 判断句柄是否有效   |
| 8.1  | FILTER_SANITIZE_STRING 弃用 | 按业务校验，并在输出点做上下文转义    |

依据：[过滤器](https://www.php.net/manual/en/filter.constants.php)、[proc_open](https://www.php.net/manual/en/function.proc-open.php)、[cURL](https://www.php.net/manual/en/function.curl-init.php)。

