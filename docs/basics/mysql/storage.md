---
title: "MySQL 存储引擎、客户端与版本升级"
description: "MySQL 的表结构、索引、数据页和日志各有职责；不要通过直接复制几种文件后缀推断一次备份可恢复。"
type: "basics"
module: "mysql"
moduleName: "MySQL"
area: "数据库"
group: "关系型数据库"
knowledge: ["存储与连接"]
tags: ["MySQL","存储引擎","命令行","过时","废弃","MySQL 8"]
order: 10
---

# MySQL 存储引擎、客户端与版本升级

MySQL 的表结构、索引、数据页和日志各有职责；不要通过直接复制几种文件后缀推断一次备份可恢复。

## 引擎与文件

InnoDB 支持事务、行级锁和崩溃恢复，是现代 MySQL 的常用默认引擎。MyISAM 不提供同等事务保证。InnoDB 是否使用独立表空间及文件位置取决于配置，不能把“一张表对应一个固定数据文件”视作普遍规则。

```sql
SELECT VERSION();
SHOW ENGINES;
SHOW VARIABLES LIKE 'character_set%';
SHOW CREATE TABLE users;
```

执行示例前将 users 换为实际表。客户端使用 mysql 连接；账号按应用最小权限划分，密码不要直接写入可公开的命令或文章。

## 升级与恢复

升级前检查服务器、驱动、认证插件、字符集和 SQL mode。备份包含数据与结构，按需要保留 binlog 进行时间点恢复；在隔离环境验证恢复后再升级。

### 版本变化与兼容

| 版本               | 变化                                         | 方案                                                                 |
| ------------------ | -------------------------------------------- | -------------------------------------------------------------------- |
| 5.7 → 8.0          | .frm 元数据方案被事务数据字典替代            | 不照搬旧文件级恢复教程                                               |
| 8.0.34 → 8.4 → 9.0 | mysql_native_password 弃用 → 默认禁用 → 移除 | 升级客户端，迁移到 caching_sha2_password；不要靠长期降级认证维持兼容 |
| 8.4                | LTS 系列与 Innovation 系列分开规划           | 选型按支持周期和兼容需求，不把更大版本号等同于必须立刻升级           |

依据：[数据字典](https://dev.mysql.com/doc/refman/8.4/en/data-dictionary.html)、[认证迁移](https://dev.mysql.com/doc/refman/8.0/en/native-pluggable-authentication.html)、[版本模型](https://dev.mysql.com/doc/refman/8.4/en/mysql-releases.html)。

