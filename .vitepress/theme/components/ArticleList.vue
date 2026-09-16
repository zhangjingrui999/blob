<script setup>
import { withBase } from 'vitepress';
import { label } from '../content.js';
import { searchPath } from '../utils/navigation.js';
import { searchQuery } from '../utils/search.js';

defineProps({
    articles: { type: Array, required: true },
    emptyText: { type: String, default: '暂时没有匹配的文章，试试调整关键词或筛选条件。' }
});
</script>

<template>
    <div class="article-list">
        <article v-for="article in articles" :key="article.url" class="article-row">
            <div class="article-category">
                <span class="article-type">{{ label(article.type) }}</span>
                <span>{{ label(article.module) }}</span>
                <span v-if="article.example" class="example-label">示例</span>
            </div>
            <h3>
                <a :href="withBase(article.url)"
                    >{{ article.title }}
                    <span class="article-arrow" aria-hidden="true">↗</span>
                </a>
            </h3>
            <p>{{ article.description }}</p>
            <div class="article-meta">
                <span>{{ label(article.area) }} / {{ label(article.module) }}</span>
                <div class="article-tags">
                    <a
                        v-for="tag in article.tags"
                        :key="tag"
                        :href="withBase(searchPath(article.type)) + searchQuery({ tags: [tag] })"
                        ># {{ label(tag) }}</a
                    >
                </div>
            </div>
        </article>
        <div v-if="!articles.length" class="empty-state">
            <span class="empty-symbol" aria-hidden="true">[ · · · ]</span>
            <h3>这里还没有内容</h3>
            <p>{{ emptyText }}</p>
        </div>
    </div>
</template>

<style scoped>
.article-list {
    border: 1px solid var(--blog-line);
    border-radius: var(--blog-radius);
    overflow: hidden;
    background: var(--blog-panel);
}
.article-row {
    padding: 25px 28px;
    border-bottom: 1px solid var(--blog-line);
}
.article-row:last-child {
    border-bottom: 0;
}
.article-category {
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: var(--blog-mono);
    font-size: 11px;
    color: var(--blog-muted);
    margin-bottom: 10px;
}
.article-type {
    background: var(--blog-soft);
    color: var(--blog-accent);
    padding: 2px 7px;
    border-radius: 4px;
    font-family: var(--blog-font);
}
.example-label {
    margin-left: auto;
    color: var(--blog-muted);
}
.article-row h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
}
.article-row h3 a {
    display: flex;
    justify-content: space-between;
    gap: 18px;
}
.article-arrow {
    color: var(--blog-muted);
    font-weight: 400;
}
.article-row p {
    font-size: 13px;
    color: var(--blog-muted);
    margin: 9px 0 17px;
}
.article-meta {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--blog-muted);
}
.article-tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
.article-tags a {
    color: var(--blog-accent);
}
@media (max-width: 640px) {
    .article-row {
        padding: 20px;
    }
    .article-row h3 {
        font-size: 17px;
    }
}
</style>
