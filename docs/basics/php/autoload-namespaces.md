---
title: "PHP 命名空间、自动加载与魔术方法"
description: "命名空间解决类、函数和常量名称冲突；自动加载解决类文件何时引入，两者不是同一个机制。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["面向对象","自动加载"]
tags: ["PHP","魔术方法","命名空间","废弃","Composer","PSR-4"]
order: 70
---

# PHP 命名空间、自动加载与魔术方法

命名空间解决类、函数和常量名称冲突；自动加载解决类文件何时引入，两者不是同一个机制。

## PSR-4 与路径

```json
{
  "autoload": { "psr-4": { "App\\": "src/" } }
}
```

配置写入项目 composer.json 后生成自动加载映射，入口加载 `require __DIR__ . '/vendor/autoload.php';`。`App\Service\UserService` 对应 src/Service/UserService.php，目录和类名大小写保持一致。namespace 前可有 declare，但不能先产生输出；use 是名称导入，不是包含文件。

## 魔术方法

| 方法                  | 含义                                |
| --------------------- | ----------------------------------- |
| __get / __set         | 读取、写入不存在或不可访问的属性    |
| __isset / __unset     | 对相关属性调用 isset / unset 时触发 |
| __call / __callStatic | 调用不存在或不可访问的方法          |
| __toString            | 转为字符串                          |
| __clone               | 克隆后的自定义处理                  |

文件系统路径和 Web URL 分开处理；包含项目文件通常以 **DIR** 锚定，避免工作目录变化影响相对路径。

### 版本变化与兼容

| 版本      | 变化                        | 方案                                         |
| --------- | --------------------------- | -------------------------------------------- |
| 7.2 → 8.0 | __autoload 弃用后移除       | Composer 或 spl_autoload_register            |
| 7.4       | __serialize / __unserialize | 为序列化明确数据结构；不反序列化不可信输入   |
| 8.x       | 魔术方法签名有更严格要求    | 按手册声明参数和返回类型，升级时执行静态检查 |

依据：[自动加载](https://www.php.net/manual/en/language.oop5.autoload.php)、[魔术方法](https://www.php.net/manual/en/language.oop5.magic.php)、[PSR-4](https://www.php-fig.org/psr/psr-4/)。

