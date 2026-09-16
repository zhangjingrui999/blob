<script setup>
import { contentTypes } from '../../../content.config.js';
import CategoryGrid from '../../components/CategoryGrid.vue';
import ContentList from '../../components/ContentList.vue';
import { searchPath } from '../../utils/navigation.js';
const type = contentTypes.find(item => item.id === 'basics');
</script>
<template>
    <section class="page-heading">
        <span class="eyebrow">KNOWLEDGE / 知识体系</span>
        <h1>{{ type.name }}</h1>
        <p>{{ type.description }}</p>
    </section>
    <CategoryGrid />
    <section class="content-section" aria-label="基础知识文章">
        <ContentList type="basics" browse :path="searchPath('basics')" />
    </section>
</template>
