<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { data as articles } from '../../data/articles.data.js';
import { label, moduleUrl } from '../../content.config.js';
import { searchQuery } from '../utils/search.js';

const { frontmatter, page } = useData();
const siblings = computed(() =>
    articles.filter(article => article.type === frontmatter.value.type && article.module === frontmatter.value.module)
);
const headers = computed(() => page.value.headers || []);
</script>
<template>
    <nav class="breadcrumbs" aria-label="面包屑">
        <a :href="withBase(`/${frontmatter.type}/`)">{{ label(frontmatter.type) }}</a>
        <span>/</span>
        <a :href="withBase(moduleUrl(frontmatter.module))">{{ label(frontmatter.module) }}</a>
        <span>/</span>
        <span>正文</span>
    </nav>
    <div class="reading-layout">
        <aside class="reading-sidebar">
            <details open>
                <summary>{{ label(frontmatter.module) }} · {{ label(frontmatter.type) }}</summary>
                <nav aria-label="同模块文章">
                    <a
                        v-for="article in siblings"
                        :key="article.url"
                        :href="withBase(article.url)"
                        :aria-current="article.title === frontmatter.title ? 'page' : undefined"
                        >{{ article.title }}</a
                    >
                </nav>
            </details>
            <a class="text-link" :href="withBase('/search.html') + searchQuery({ module: frontmatter.module })"
                >搜索本模块 ↗</a
            >
        </aside>
        <article class="reading-paper">
            <div class="reading-meta">
                <span class="eyebrow">{{ label(frontmatter.type) }} / {{ label(frontmatter.module) }}</span>
                <span v-if="frontmatter.example" class="sample-badge">示例文章</span>
            </div>
            <Content class="vp-doc" />
            <div v-if="frontmatter.tags?.length" class="reading-tags">
                <a
                    v-for="tag in frontmatter.tags"
                    :key="tag"
                    :href="withBase('/search.html') + searchQuery({ type: 'experience', tags: [tag] })"
                    ># {{ label(tag) }}</a
                >
            </div>
        </article>
        <aside v-if="headers.length" class="reading-outline">
            <span class="eyebrow">ON THIS PAGE</span>
            <p>本页目录</p>
            <a v-for="heading in headers" :key="heading.slug" :href="`#${heading.slug}`">{{ heading.title }}</a>
        </aside>
    </div>
</template>
<style scoped>
.reading-layout {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr) 150px;
    gap: 24px;
    align-items: start;
}
.reading-sidebar,
.reading-outline {
    position: sticky;
    top: 102px;
    font-size: 12px;
}
.reading-sidebar details {
    margin-bottom: 22px;
}
.reading-sidebar summary {
    font-weight: 600;
    cursor: pointer;
    padding: 8px 0 16px;
}
.reading-sidebar nav {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.reading-sidebar nav a {
    color: var(--blog-muted);
    padding: 9px 11px;
    border-radius: 7px;
}
.reading-sidebar nav a[aria-current] {
    color: var(--blog-accent);
    background: var(--blog-soft);
}
.reading-paper {
    min-width: 0;
    padding: 32px;
    background: var(--blog-panel);
    border: 1px solid var(--blog-line);
    border-radius: var(--blog-radius);
}
.reading-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: space-between;
    margin-bottom: 24px;
}
.sample-badge {
    font-size: 11px;
    color: var(--blog-muted);
}
.reading-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    border-top: 1px solid var(--blog-line);
    padding-top: 22px;
    margin-top: 28px;
    color: var(--blog-accent);
    font-size: 12px;
}
.reading-outline p {
    margin: 10px 0;
    font-weight: 600;
}
.reading-outline a {
    display: block;
    color: var(--blog-muted);
    padding: 6px 0;
}
@media (max-width: 1100px) {
    .reading-layout {
        grid-template-columns: 170px minmax(0, 1fr);
    }
    .reading-outline {
        display: none;
    }
}
@media (max-width: 760px) {
    .reading-layout {
        grid-template-columns: 1fr;
        gap: 18px;
    }
    .reading-sidebar {
        position: static;
        border: 1px solid var(--blog-line);
        border-radius: 10px;
        padding: 12px 17px;
    }
    .reading-sidebar details {
        margin-bottom: 8px;
    }
    .reading-sidebar summary {
        padding: 3px 0 8px;
    }
    .reading-paper {
        padding: 23px 19px;
    }
}
</style>
