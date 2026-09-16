<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { data as knowledge } from '../../../data/knowledge.data.js';
import { chapterLinks } from '../../../data/knowledge.js';
import ArticleReader from '../../components/ArticleReader.vue';
import KnowledgeTree from '../../components/KnowledgeTree.vue';

const { frontmatter, page } = useData();
const tree = computed(() => knowledge.find(module => module.id === frontmatter.value.module));
const currentUrl = computed(() => '/' + page.value.relativePath.replace(/\.md$/, '.html'));
const chapters = computed(() => chapterLinks(tree.value));
const position = computed(() => chapters.value.findIndex(chapter => chapter.url === currentUrl.value));
const previous = computed(() => (position.value > 0 ? chapters.value[position.value - 1] : null));
const next = computed(() => (position.value >= 0 ? chapters.value[position.value + 1] : null));
</script>
<template>
    <!-- 仅基础知识替换阅读导航，经验继续使用公共阅读器原有的文章目录。 -->
    <ArticleReader content-type="basics">
        <template #sidebar>
            <details v-if="tree" class="learning-sidebar" open>
                <summary>{{ tree.title }} · 知识结构</summary>
                <a class="text-link" :href="withBase(tree.url)">查看完整学习路径 ↗</a>
                <KnowledgeTree :key="currentUrl" :nodes="tree.children" :current-url="currentUrl" :expanded="false" />
            </details>
        </template>
        <template #after-content>
            <nav v-if="previous || next" class="chapter-navigation" aria-label="学习顺序">
                <a v-if="previous" :href="withBase(previous.url)"><small>← 上一主题</small>{{ previous.title }}</a>
                <a v-if="next" :href="withBase(next.url)"><small>下一主题 →</small>{{ next.title }}</a>
            </nav>
        </template>
    </ArticleReader>
</template>

<style scoped>
.learning-sidebar > summary {
    cursor: pointer;
    font-weight: 600;
    padding: 8px 0 16px;
}
.learning-sidebar > a {
    display: block;
    margin-bottom: 15px;
}
.chapter-navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    border-top: 1px solid var(--blog-line);
    margin-top: 30px;
    padding-top: 22px;
}
.chapter-navigation a {
    flex: 1 1 180px;
    padding: 14px;
    border-radius: 9px;
    background: var(--blog-soft);
    color: var(--blog-accent);
    font-size: 14px;
}
.chapter-navigation small {
    display: block;
    color: var(--blog-muted);
    margin-bottom: 7px;
}
</style>
