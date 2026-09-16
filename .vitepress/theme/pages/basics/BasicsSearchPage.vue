<script setup>
import { withBase } from 'vitepress';
import ContentList from '../../components/ContentList.vue';
import { searchPath } from '../../utils/navigation.js';
</script>
<template>
    <nav class="breadcrumbs" aria-label="面包屑">
        <a :href="withBase('/basics/')">基础知识</a><span>/</span><span>搜索</span>
    </nav>
    <section class="page-heading">
        <span class="eyebrow">SEARCH / 基础知识</span>
        <h1>搜索基础知识</h1>
        <p>通过分类、标签与关键词，找到需要的文章。</p>
    </section>
    <ContentList type="basics" :path="searchPath('basics')" />
</template>
