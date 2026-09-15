<script setup>
import { computed, onMounted, shallowRef, watch } from 'vue';
import { useData } from 'vitepress';
import { useNavigation } from '../composables/useNavigation.js';
import { label } from '../../content.config.js';
import { data as articles } from '../../data/articles.data.js';
import { changeFilter, collectTags, emptySearch, searchArticles } from '../utils/search.js';
import SearchForm from '../components/SearchForm.vue';
import FilterPanel from '../components/FilterPanel.vue';
import ArticleList from '../components/ArticleList.vue';

const { frontmatter } = useData();
const { searchState, search } = useNavigation();
const index = shallowRef(articles);
const loading = shallowRef(true);
const failed = shallowRef(false);
const page = shallowRef(1);
const isExperience = computed(() => frontmatter.value.pageKind === 'experience');
const path = computed(() => (isExperience.value ? '/experience/' : '/search.html'));
const state = computed(() => ({
    ...searchState.value,
    type: searchState.value.type || (isExperience.value ? 'experience' : '')
}));
const candidates = computed(() => collectTags(index.value, state.value));
const results = computed(() => searchArticles(index.value, state.value));
const visible = computed(() => results.value.slice(0, page.value * 12));
const selected = computed(() =>
    [state.value.type, state.value.area, state.value.group, state.value.module, ...state.value.tags]
        .filter(Boolean)
        .map(label)
        .join(' / ')
);
async function loadIndex() {
    loading.value = true;
    failed.value = false;
    try {
        index.value = (await import('../../data/search.data.js')).data;
    } catch {
        failed.value = true;
    } finally {
        loading.value = false;
    }
}
function update(key, value) {
    const next = changeFilter(state.value, key, value);
    search(next, isExperience.value && key === 'type' && !value ? '/search.html' : path.value);
}
watch(state, () => {
    page.value = 1;
});
onMounted(loadIndex);
</script>
<template>
    <section class="page-heading">
        <span class="eyebrow">{{ isExperience ? 'EXPERIENCE / 实践记录' : 'SEARCH / 探索知识' }}</span>
        <h1>{{ isExperience ? '在实践中，找到答案。' : '找到你需要的那一篇。' }}</h1>
        <p>
            {{
                isExperience
                    ? '以问题为起点，记录思考、验证与解决方法。'
                    : '从技术模块到具体问题，让每一次查找更有方向。'
            }}
        </p>
    </section>
    <SearchForm :query="state.q" @submit="query => update('q', query)" />
    <FilterPanel :state="state" :tags="candidates" @change="update" />
    <div class="search-summary">
        <span
            >{{ selected || '全站内容' }}
            <span v-if="state.tags.length > 1"> · 同时满足标签</span>
        </span>
        <button class="text-link" @click="search(emptySearch(), path)">清空筛选 ↺</button>
    </div>
    <div aria-live="polite" :aria-busy="loading">
        <p v-if="loading && state.q" class="empty-state">正在加载搜索索引…</p>
        <div v-else-if="failed" class="empty-state" role="alert">
            <p>搜索索引加载失败，请重试。</p>
            <button class="button button-secondary" @click="loadIndex">重新加载</button>
        </div>
        <template v-else>
            <div class="section-heading">
                <h2>
                    {{ state.q ? '搜索结果' : '文章列表' }}
                    <span class="count-label">{{ results.length }} 篇</span>
                </h2>
                <span class="small muted">{{ state.q ? '按相关度排序' : '按内容顺序排列' }}</span>
            </div>
            <ArticleList :articles="visible" />
            <div v-if="!results.length" class="empty-actions">
                <button class="button button-secondary" @click="search({ ...emptySearch(), q: state.q })">
                    扩大到全站
                </button>
            </div>
            <div v-if="visible.length < results.length" class="empty-actions">
                <button class="button button-secondary" @click="page++">
                    加载更多（剩余 {{ results.length - visible.length }} 篇）
                </button>
            </div>
        </template>
    </div>
</template>
<style scoped>
.search-summary {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    font-size: 12px;
    color: var(--blog-muted);
    margin: 0 0 27px;
}
.search-summary > span {
    overflow-wrap: anywhere;
}
.search-summary button {
    flex-shrink: 0;
}
.empty-actions {
    display: flex;
    justify-content: center;
    padding-top: 20px;
}
</style>
