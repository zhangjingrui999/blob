---
title: "MySQL 数据类型、约束与索引设计"
description: "字段类型表达数据范围与语义，约束保证合法性，索引服务于查询。三者应一起设计，不能用“所有列都加索引”替代分析。"
type: "basics"
module: "mysql"
moduleName: "MySQL"
area: "数据库"
group: "关系型数据库"
knowledge: ["关系模型","表结构"]
tags: ["MySQL","数据类型","索引","约束","废弃","MySQL 8"]
order: 20
---

# MySQL 数据类型、约束与索引设计

字段类型表达数据范围与语义，约束保证合法性，索引服务于查询。三者应一起设计，不能用“所有列都加索引”替代分析。

## 类型与建表

```sql
CREATE TABLE products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_price CHECK (price >= 0),
  INDEX idx_created_id (created_at, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

示例 CHECK 执行依赖 MySQL 8.0.16+。金额优先精确 DECIMAL 或约定单位的整数；VARCHAR 长度不是固定字节数。NULL 表示缺失/未知，使用 IS NULL 查询。TIMESTAMP 涉及会话时区转换，DATETIME 不自动表达时区；按业务约定记录。

## 索引与修改

主键唯一且非空；唯一索引对 NULL 的语义不同于普通值。联合索引关注左前缀、过滤和排序，实际是否采用由优化器判断。写入频繁的表要评估索引维护成本。修改使用 ALTER TABLE，在生产评估锁与执行时间。

### 版本变化与兼容

| 版本        | 变化                               | 方案                                           |
| ----------- | ---------------------------------- | ---------------------------------------------- |
| 8.0.16 前后 | CHECK 由曾被解析但忽略转为实际执行 | 旧环境在应用层补验证，升级前清理存量不合法数据 |
| 8.0.17      | 整数显示宽度与 ZEROFILL 弃用       | 类型决定范围，展示补零放在格式化层             |
| 8.x         | utf8mb3 处于弃用迁移路径           | 显式使用 utf8mb4，核对排序规则与索引长度       |

依据：[CHECK](https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html)、[数值属性](https://dev.mysql.com/doc/refman/8.4/en/numeric-type-attributes.html)、[多列索引](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)。

