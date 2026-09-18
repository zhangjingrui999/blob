---
title: "PHP 文件上传、图片处理与下载边界"
description: "上传文件名、扩展名和浏览器声明的 MIME 都不可信。上传处理需要分层检查，并将存储与公开访问分开。"
type: "experience"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["文件实践"]
tags: ["PHP","GD","文件上传","文件下载","PHP 8"]
order: 50
---

# PHP 文件上传、图片处理与下载边界

上传文件名、扩展名和浏览器声明的 MIME 都不可信。上传处理需要分层检查，并将存储与公开访问分开。

## 上传流程

1. 检查请求大小限制、$_FILES 结构与 UPLOAD_ERR_OK；超出 post_max_size 时可能没有正常文件记录。
2. 校验业务允许的大小，使用 finfo 检查内容类型，图片再检查尺寸和解码结果。
3. 生成随机文件名，放在 Web 根目录外或不允许执行脚本的存储中。
4. 用 move_uploaded_file 移动，检查返回值，记录业务归属；下载时重新检查授权。

不要把客户端原始文件名直接拼入路径。多文件上传应逐个校验，明确部分失败的回滚或保留策略。

## 图片与下载

GD 先确认扩展和目标格式支持，再读取图片。保持宽高比缩放，限制像素总量以控制内存，处理透明通道。下载根据受控标识查找服务端路径，设置正确的 Content-Type 和 Content-Disposition；大文件采用流式输出，不将任意请求路径交给 readfile。

### 版本变化与兼容

| 版本或能力 | 变化                         | 兼容方案                              |
| ---------- | ---------------------------- | ------------------------------------- |
| PHP 8.0    | GD 图像资源变为 GdImage 对象 | 检查 false 或对象，不依赖 is_resource |
| GD 构建    | WebP/AVIF 等支持取决于编译库 | 检查 gd_info 与实际编码能力           |
| 文件 API   | 浏览器 accept 仅是提示       | 服务端始终做完整检查                  |

依据：[上传手册](https://www.php.net/manual/en/features.file-upload.php)、[GD](https://www.php.net/manual/en/book.image.php)、[move_uploaded_file](https://www.php.net/manual/en/function.move-uploaded-file.php)。

