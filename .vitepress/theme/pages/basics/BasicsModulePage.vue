<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { findModule, label } from '../../../content.config.js';
import { searchPath } from '../../utils/navigation.js';
import { searchQuery } from '../../utils/search.js';
import ContentList from '../../components/ContentList.vue';

const { params } = useData();
const module = computed(() => findModule(params.value?.module));
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
        <ContentList type="basics" :module="module.id" browse :path="searchPath('basics')" />
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
</style>
