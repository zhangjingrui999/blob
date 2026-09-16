<script setup>
import ContentList from '../components/ContentList.vue';
</script>
<template>
    <section class="page-heading">
        <span class="eyebrow">SEARCH / 全站搜索</span>
        <h1>找到你需要的那一篇。</h1>
        <p>同时查找基础知识与经验分享，通过分类和标签进一步缩小范围。</p>
    </section>
    <ContentList path="/search.html" />
</template>
