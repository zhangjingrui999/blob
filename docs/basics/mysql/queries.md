---
title: "SQL 查询、关联、事务与执行计划"
description: "查询先确定需要哪些行和列，再考虑聚合与排序。JOIN、子查询、窗口函数各有用途，不存在“子查询已被逗号连接替代”的规则。"
type: "basics"
module: "mysql"
moduleName: "MySQL"
area: "数据库"
group: "关系型数据库"
knowledge: ["SQL 查询"]
tags: ["MySQL","SQL","关联查询","聚合","MySQL 8","窗口函数","事务"]
order: 30
---

# SQL 查询、关联、事务与执行计划

查询先确定需要哪些行和列，再考虑聚合与排序。JOIN、子查询、窗口函数各有用途，不存在“子查询已被逗号连接替代”的规则。

## 查询与聚合

```sql
SELECT c.id, c.name, COUNT(o.id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY order_count DESC, c.id
LIMIT 20;
```

示例假设存在 customers 与 orders 表。COUNT(*) 统计行，COUNT(column) 跳过 NULL。LEFT JOIN 右表条件放 WHERE 可能过滤未匹配行；如需保留左表，应按语义放 ON。分页必须有稳定排序；大偏移可改基于游标的翻页。

## 修改、事务与优化

INSERT 明确列名；UPDATE/DELETE 先核对 WHERE。InnoDB 相关操作放在事务内，理解隔离级别、锁和死锁重试；事务保持短小。TRUNCATE 属 DDL，与 DELETE 的事务、自增和触发器语义不同。

EXPLAIN 查看访问路径与估计行数；优化应根据真实数据分布和慢查询证据。不要无条件关闭 ONLY_FULL_GROUP_BY 以掩盖不确定的分组查询。

### 版本变化与兼容

| 版本          | 能力变化             | 兼容方案                                                        |
| ------------- | -------------------- | --------------------------------------------------------------- |
| 8.0           | CTE 与窗口函数       | 5.7 需派生表、关联或应用层处理；验证结果语义                    |
| 8.0.18        | EXPLAIN ANALYZE      | 会实际执行受支持的语句，测试环境评估；旧版用 EXPLAIN 和性能指标 |
| 不同 SQL mode | 双引号可能表示标识符 | 字符串统一用单引号，应用输入参数化                              |

依据：[窗口函数](https://dev.mysql.com/doc/refman/8.4/en/window-functions.html)、[事务模型](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html)、[EXPLAIN](https://dev.mysql.com/doc/refman/8.4/en/explain.html)。

