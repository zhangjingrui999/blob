---
title: "ThinkPHP 分页、验证码与上传实践"
description: "分页、验证码和上传是三个不同流程，不应把旧控制器里的示例组合成无条件可运行的通用接口。"
type: "experience"
module: "thinkphp"
moduleName: "ThinkPHP"
area: "后端"
group: "PHP 框架"
knowledge: ["框架实践"]
tags: ["ThinkPHP","ThinkPHP 5","分页","文件上传","过时","ThinkPHP 8"]
order: 60
---

# ThinkPHP 分页、验证码与上传实践

分页、验证码和上传是三个不同流程，不应把旧控制器里的示例组合成无条件可运行的通用接口。

## 分页与校验

服务端限制页大小，使用稳定排序，返回数据与总量或游标。模板分页链接和 JSON 分页响应按使用场景选择。验证码需绑定用途、服务端有效期、尝试次数和一次性消费，不能只在前端比较。

## 上传

确认上传错误码、文件大小、内容类型和用户权限；使用随机文件名和受控存储路径。公开访问 URL 与本地真实路径分别返回/保存。成功响应只包含业务需要的标识，不公开服务器目录。失败时保留可追踪错误并清理本次产生的临时文件。

### 版本变化与兼容

| 版本或组件      | 差异                                       | 方案                                    |
| --------------- | ------------------------------------------ | --------------------------------------- |
| ThinkPHP 5 示例 | 旧 file->validate->move 风格依赖旧上传对象 | 不假定当前文件对象有同一链式 API        |
| 当前组件化项目  | 验证码、文件系统、视图可能是独立包         | 从 composer.lock 核对实际安装版本与 API |
| ORM 分页        | 不同版本返回对象/序列化结构可能不同        | 为前端定义稳定响应契约，升级时转换      |

依据：[Think Captcha](https://github.com/top-think/think-captcha)、[Filesystem](https://github.com/top-think/think-filesystem)、[Think ORM](https://github.com/top-think/think-orm)。

