<script setup>
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { data as articles } from '../../data/articles.data.js';
import { label } from '../../content.config.js';
import { searchPath } from '../utils/navigation.js';
import { collectTags, searchQuery } from '../utils/search.js';
import HomeHero from '../components/HomeHero.vue';
import CategoryGrid from '../components/CategoryGrid.vue';
import ArticleList from '../components/ArticleList.vue';

const experiences = computed(() => articles.filter(article => article.type === 'experience').slice(0, 3));
const tags = computed(() => collectTags(articles, { type: 'experience' }).slice(0, 8));
</script>
<template>
    <HomeHero />
    <section class="home-section">
        <div class="section-heading">
            <div>
                <span class="eyebrow">01 / KNOWLEDGE</span>
                <h2>从基础开始</h2>
            </div>
            <a class="text-link" :href="withBase('/basics/')">全部知识 ↗</a>
        </div>
        <CategoryGrid />
    </section>
    <section class="home-section">
        <div class="section-heading">
            <div>
                <span class="eyebrow">02 / EXPERIENCE</span>
                <h2>在实践中积累</h2>
            </div>
            <a class="text-link" :href="withBase('/experience/')">全部经验分享 ↗</a>
        </div>
        <div class="experience-layout">
            <ArticleList :articles="experiences" />
            <aside class="home-aside">
                <section class="topic-panel">
                    <span class="eyebrow">TOPICS / 主题</span>
                    <h3>从问题找到方向</h3>
                    <p>以标签为线索，连接不同技术中的实践。</p>
                    <div class="topic-links">
                        <a
                            v-for="tag in tags"
                            :key="tag.name"
                            :href="
                                withBase(searchPath('experience')) +
                                searchQuery({ type: 'experience', tags: [tag.name] })
                            "
                        >
                            <span># {{ label(tag.name) }}</span>
                            <span>{{ tag.count }} ↗</span>
                        </a>
                    </div>
                </section>
                <div class="aside-note">
                    <span aria-hidden="true">“</span>
                    <p>理解一个原理， <br />解决一个问题， <br />留下一点积累。</p>
                    <small>KEEP BUILDING.</small>
                </div>
            </aside>
        </div>
    </section>
</template>
<style scoped>
.home-section {
    margin-bottom: 42px;
}
.experience-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 22px;
}
.topic-panel {
    background: var(--blog-panel);
    border: 1px solid var(--blog-line);
    padding: 24px;
    border-radius: var(--blog-radius);
}
.topic-panel h3 {
    font-size: 17px;
    margin: 12px 0 8px;
}
.topic-panel p {
    color: var(--blog-muted);
    font-size: 12px;
    line-height: 1.8;
}
.topic-links {
    margin-top: 19px;
}
.topic-links a {
    display: flex;
    justify-content: space-between;
    padding: 9px 0;
    border-top: 1px solid var(--blog-line);
    font-size: 12px;
}
.topic-links a > span:last-child {
    color: var(--blog-muted);
    font: 11px var(--blog-mono);
}
.aside-note {
    margin-top: 18px;
    padding: 10px 24px;
}
.aside-note > span {
    color: var(--blog-accent);
    font-size: 36px;
    line-height: 1;
}
.aside-note p {
    color: var(--blog-muted);
    font-size: 14px;
    line-height: 1.9;
    margin: 0 0 13px;
}
.aside-note small {
    color: var(--blog-muted);
    font: 9px var(--blog-mono);
    letter-spacing: 2px;
}
@media (max-width: 800px) {
    .experience-layout {
        grid-template-columns: 1fr;
    }
    .home-aside {
        display: none;
    }
}
</style>
