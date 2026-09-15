<script setup>
import { contentTypes } from '../../content.config.js';
import CategoryGrid from '../components/CategoryGrid.vue';

const type = contentTypes.find(item => item.id === 'basics');
</script>
<template>
    <section class="page-heading">
        <span class="eyebrow">KNOWLEDGE / 知识体系</span>
        <h1>{{ type.name }}</h1>
        <p>{{ type.description }}</p>
    </section>
    <CategoryGrid />
</template>
