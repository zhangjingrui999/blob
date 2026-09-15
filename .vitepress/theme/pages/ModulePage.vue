<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { findModule, label } from '../../content.config.js';
import { data as articles } from '../../data/articles.data.js';
import { searchQuery } from '../utils/search.js';
import ArticleList from '../components/ArticleList.vue';

const { params } = useData();
const module = computed(() => findModule(params.value?.module));
const lessons = computed(() =>
    articles.filter(article => article.type === 'basics' && article.module === module.value?.id)
);
</script>
<template>
    <template v-if="module">
        <nav class="breadcrumbs" aria-label="面包屑">
            <a :href="withBase('/basics/')">基础知识</a>
            <span>/</span>
            <span>{{ label(module.area) }}</span>
            <span>/</span>
            <span>{{ module.name }}</span>
        </nav>
        <section class="page-heading">
            <span class="eyebrow">MODULE / 学习路径</span>
            <h1>{{ module.name }}</h1>
            <p>{{ module.description || `从基本概念开始，逐步理解 ${module.name}。` }}</p>
        </section>
        <div class="section-heading">
            <h2>
                学习目录
                <span class="count-label">{{ lessons.length }} 篇</span>
            </h2>
            <a
                class="text-link"
                :href="withBase('/search.html') + searchQuery({ area: module.area, module: module.id })"
                >搜索本模块 ↗</a
            >
        </div>
        <ArticleList :articles="lessons" empty-text="这个模块尚未添加文章，可以先浏览其他模块或相关经验。" />
        <a
            class="module-experience button button-secondary"
            :href="withBase('/search.html') + searchQuery({ type: 'experience', area: module.area, module: module.id })"
            >查看相关经验 →</a
        >
    </template>
</template>
<style scoped>
.module-experience {
    margin-top: 22px;
}
</style>
