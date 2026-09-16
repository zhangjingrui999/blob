<script setup>
import { withBase } from 'vitepress';
import { categories } from '../../content.js';
import { data as knowledge } from '../../../data/knowledge.data.js';
import KnowledgeTree from '../../components/KnowledgeTree.vue';

// 入口和模块页读取同一份树，领域与模块名称从文章元数据统一汇总。
const areas = categories
    .map(area => ({ ...area, modules: knowledge.filter(module => module.area === area.id) }))
    .filter(area => area.modules.length);
</script>
<template>
    <section class="page-heading">
        <span class="eyebrow">KNOWLEDGE / 知识体系</span>
        <h1>基础知识</h1>
        <p>从基本概念出发，把知识点连成体系。选择一个模块，沿着主题逐步学习。</p>
    </section>
    <div v-if="areas.length" class="knowledge-layout">
        <nav class="area-nav" aria-label="知识领域">
            <span class="eyebrow">学习目录</span>
            <a v-for="area in areas" :key="area.id" :href="`#knowledge-${area.id}`">{{ area.name }}</a>
            <a class="search-link" :href="withBase('/basics/search.html')">搜索知识点 ↗</a>
        </nav>
        <div class="area-sections">
            <section v-for="area in areas" :id="`knowledge-${area.id}`" :key="area.id" class="knowledge-area">
                <header>
                    <span class="eyebrow">KNOWLEDGE / 学习目录</span>
                    <h2>{{ area.name }}</h2>
                </header>
                <div v-for="module in area.modules" :key="module.id" class="module-branch">
                    <div class="module-heading">
                        <a :href="withBase(module.url)">{{ module.title }} <span aria-hidden="true">↗</span></a>
                        <span>{{ module.count ? `${module.count} 个主题` : '待整理' }}</span>
                    </div>
                    <details v-if="module.count" class="module-preview">
                        <summary>展开知识结构</summary>
                        <KnowledgeTree :nodes="module.children" />
                    </details>
                </div>
            </section>
        </div>
    </div>
    <section v-else class="empty-state">
        <h2>知识结构从第一篇内容开始</h2>
        <p>添加基础知识文章后，系统会根据所属模块与知识路径，自动归纳为树。</p>
        <a class="text-link" :href="withBase('/basics/search.html')">前往搜索 →</a>
    </section>
</template>

<style scoped>
.knowledge-layout {
    display: grid;
    grid-template-columns: 170px minmax(0, 1fr);
    gap: 32px;
    align-items: start;
}
.area-nav {
    position: sticky;
    top: 100px;
    display: grid;
    gap: 8px;
    font-size: 14px;
}
.area-nav .eyebrow {
    margin: 0 12px 8px;
}
.area-nav a {
    padding: 10px 12px;
    border-radius: 7px;
}
.area-nav a:hover {
    background: var(--blog-soft);
    color: var(--blog-accent);
}
.area-nav .search-link {
    font-size: 12px;
    color: var(--blog-accent);
    border-top: 1px solid var(--blog-line);
    margin-top: 12px;
}
.area-sections {
    display: grid;
    gap: 24px;
}
.knowledge-area {
    scroll-margin-top: 100px;
    padding: 26px 30px;
    border: 1px solid var(--blog-line);
    border-radius: var(--blog-radius);
    background: var(--blog-panel);
}
header {
    margin-bottom: 22px;
}
h2 {
    margin: 8px 0;
    font-size: 23px;
}
header p {
    color: var(--blog-muted);
    font-size: 13px;
}
.module-branch {
    border-top: 1px solid var(--blog-line);
    padding: 18px 0;
}
.module-branch:last-child {
    padding-bottom: 0;
}
.module-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}
.module-heading a {
    font-size: 17px;
    font-weight: 600;
}
.module-heading a span {
    font-size: 12px;
    color: var(--blog-accent);
    margin-left: 8px;
}
.module-heading > span {
    font-size: 12px;
    color: var(--blog-muted);
    white-space: nowrap;
}
.module-preview {
    margin-top: 10px;
    font-size: 14px;
}
.module-preview > summary {
    cursor: pointer;
    color: var(--blog-muted);
    font-size: 12px;
    padding: 5px 0;
}
@media (max-width: 760px) {
    .knowledge-layout {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    .area-nav {
        position: static;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }
    .area-nav .eyebrow {
        display: none;
    }
    .area-nav .search-link {
        margin: 0;
        border: 0;
    }
    .knowledge-area {
        padding: 22px 18px;
    }
}
</style>
