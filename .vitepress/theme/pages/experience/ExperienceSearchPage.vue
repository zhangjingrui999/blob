<script setup>
import { withBase } from 'vitepress';
import ContentList from '../../components/ContentList.vue';
import { searchPath } from '../../utils/navigation.js';
</script>
<template>
    <nav class="breadcrumbs" aria-label="面包屑">
        <a :href="withBase('/experience/')">经验分享</a><span>/</span><span>搜索</span>
    </nav>
    <section class="page-heading">
        <span class="eyebrow">SEARCH / 经验分享</span>
        <h1>搜索经验分享</h1>
        <p>通过分类、标签与关键词，找到需要的文章。</p>
    </section>
    <ContentList type="experience" :path="searchPath('experience')" />
</template>
