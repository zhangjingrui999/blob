<script setup>
import { contentTypes } from '../../content.js';
import ContentList from '../../components/ContentList.vue';
import { searchPath } from '../../utils/navigation.js';
const type = contentTypes.find(item => item.id === 'experience');
</script>
<template>
    <section class="page-heading">
        <span class="eyebrow">EXPERIENCE / 实践记录</span>
        <h1>{{ type.name }}</h1>
        <p>{{ type.description }}</p>
    </section>
    <ContentList type="experience" browse :path="searchPath('experience')" />
</template>
