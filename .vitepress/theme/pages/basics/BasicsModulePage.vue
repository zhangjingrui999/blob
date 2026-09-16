<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { findModule, label } from '../../content.js';
import { searchPath } from '../../utils/navigation.js';
import { searchQuery } from '../../utils/search.js';
import { data as knowledge } from '../../../data/knowledge.data.js';
import KnowledgePath from '../../components/KnowledgePath.vue';

const { params } = useData();
const module = computed(() => findModule(params.value?.module));
const tree = computed(() => knowledge.find(item => item.id === module.value?.id) || { children: [] });
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
        <div class="module-tools">
            <span>按顺序展开主题，点击知识点阅读对应内容。</span>
            <a class="text-link" :href="withBase(searchPath('basics')) + searchQuery({ module: module.id })"
                >搜索本模块 ↗</a
            >
        </div>
        <KnowledgePath v-if="tree" :tree="tree" />
        <a
            class="module-experience button button-secondary"
            :href="
                withBase(searchPath('experience')) +
                searchQuery({ type: 'experience', area: module.area, module: module.id })
            "
            >查看相关经验 →</a
        >
    </template>
</template>
<style scoped>
.module-experience {
    margin-top: 22px;
}
.module-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: space-between;
    margin-bottom: 22px;
    font-size: 13px;
    color: var(--blog-muted);
}
</style>
