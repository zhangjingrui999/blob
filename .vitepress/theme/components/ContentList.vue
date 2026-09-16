<script setup>
import { useContentList } from '../composables/useContentList.js';
import { emptySearch } from '../utils/search.js';
import SearchForm from './SearchForm.vue';
import FilterPanel from './FilterPanel.vue';
import ArticleList from './ArticleList.vue';

// 页面只传入固定范围；列表、标签、搜索与加载状态由公共组件统一处理。
const props = defineProps({
    type: { type: String, default: '' },
    browse: Boolean,
    module: { type: String, default: '' },
    path: { type: String, default: '/search.html' }
});
const { state, candidates, results, visible, selected, loading, failed, page, loadIndex, update, reset, search } =
    useContentList(props);
</script>
<template>
    <SearchForm :query="state.q" @submit="query => update('q', query)" />
    <FilterPanel
        :state="state"
        :tags="candidates"
        :fixed-type="Boolean(type)"
        :fixed-module="Boolean(module)"
        @change="update"
    />
    <div class="search-summary">
        <span
            >{{ selected || '全站内容' }}
            <span v-if="state.tags.length > 1"> · 同时满足标签</span>
        </span>
        <button class="text-link" @click="reset">清空筛选 ↺</button>
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
                    {{ browse ? '文章列表' : '搜索结果' }}
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
    min-width: 0;
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
