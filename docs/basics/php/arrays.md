---
title: "PHP 数组、遍历、排序与集合操作"
description: "PHP array 是有序映射，同时用于列表和键值表。键可能被转换；向 JSON 输出列表前应确认数字键是否连续。"
type: "basics"
module: "php"
moduleName: "PHP"
area: "后端"
group: "语言基础"
knowledge: ["语言基础","数组"]
tags: ["PHP","数组","废弃","PHP 8"]
order: 20
---

# PHP 数组、遍历、排序与集合操作

PHP array 是有序映射，同时用于列表和键值表。键可能被转换；向 JSON 输出列表前应确认数字键是否连续。

## 遍历与查找

```php
<?php
$items = ['a' => 10, 'b' => null];
foreach ($items as $key => $value) {
    echo $key . ':' . var_export($value, true) . PHP_EOL;
}
var_dump(isset($items['b'])); // false
var_dump(array_key_exists('b', $items)); // true
var_dump(in_array(10, $items, true)); // 严格比较
```

引用 foreach 结束后 unset 引用变量，避免后续赋值误改最后一项。array_search 可能返回键 0，失败必须用 `=== false` 判断。

## 常用操作

| 操作                              | 语义                                 |
| --------------------------------- | ------------------------------------ |
| sort / usort                      | 修改原数组并重建数字索引             |
| asort / ksort                     | 按值 / 按键排序，保留关联            |
| array_filter                      | 按回调筛选；无回调移除假值，保留键   |
| array_merge                       | 字符串键后者覆盖；数字键追加并重编号 |
| array_chunk                       | 每块至多指定大小，不是分成指定块数   |
| array_walk / array_walk_recursive | 普通遍历 / 递归遍历，不能混为一谈    |
| array_slice / array_splice        | 截取副本 / 修改原数组                |

### 版本变化与兼容

| 版本      | 变化                                | 方案                                             |
| --------- | ----------------------------------- | ------------------------------------------------ |
| 7.2 → 8.0 | each() 先弃用后移除                 | foreach                                          |
| 8.0       | 排序比较相等的元素保留原相对顺序    | 老环境若依赖稳定排序，应额外加入原始序号         |
| 8.1       | array_is_list；数组展开支持字符串键 | 兼容旧环境时显式检查连续键，按语义选 array_merge |

依据：[数组类型](https://www.php.net/manual/en/language.types.array.php)、[sort](https://www.php.net/manual/en/function.sort.php)、[array_chunk](https://www.php.net/manual/en/function.array-chunk.php)。

