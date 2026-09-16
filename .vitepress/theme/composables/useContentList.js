import { computed, onMounted, shallowRef, watch } from 'vue';
import { useNavigation } from './useNavigation.js';
import { findModule, label } from '../../content.config.js';
import { data as articles } from '../../data/articles.data.js';
import { changeFilter, collectTags, emptySearch, searchArticles, selectedModules } from '../utils/search.js';

/** 接收组件的响应式 props，统一管理两类内容及模块页的检索状态。 */
export function useContentList(options) {
    const { searchState, search } = useNavigation();
    const index = shallowRef(articles);
    const loading = shallowRef(true);
    const failed = shallowRef(false);
    const page = shallowRef(1);
    const state = computed(() => {
        const module = findModule(options.module);
        // 页面类型与模块优先于查询参数，防止基础知识页显示经验内容。
        return {
            ...searchState.value,
            type: options.type || searchState.value.type,
            ...(module ? { area: module.area, group: module.group, module: module.id, modules: [] } : {})
        };
    });
    const candidates = computed(() => collectTags(index.value, state.value));
    const results = computed(() => searchArticles(index.value, state.value));
    const visible = computed(() => results.value.slice(0, page.value * 12));
    const selected = computed(() =>
        [state.value.type, state.value.area, state.value.group, ...selectedModules(state.value), ...state.value.tags]
            .filter(Boolean)
            .map(label)
            .join(' / ')
    );

    // 元数据先用于普通浏览；正文索引只在客户端挂载后加载，并提供失败重试。
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
    // 入口页和目录页传入对应搜索页路径，查询操作不再混在入口页面中。
    function update(key, value) {
        search(changeFilter(state.value, key, value), options.path);
    }
    // 清空仅移除用户筛选，页面固有的内容类型和模块仍由 state 补全。
    function reset() {
        search(emptySearch(), options.path);
    }
    watch(state, () => {
        page.value = 1;
    });
    onMounted(loadIndex);
    return { state, candidates, results, visible, selected, loading, failed, page, loadIndex, update, reset, search };
}
