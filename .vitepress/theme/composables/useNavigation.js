import { computed, inject, onMounted, onUnmounted, provide, shallowRef } from 'vue';
import { useData, useRouter, withBase } from 'vitepress';
import { findModule } from '../../content.config.js';
import { parseSearch, searchQuery } from '../utils/search.js'; // 使用独立注入键，避免与其他组件提供的上下文重名。

// 使用独立注入键，避免与其他组件提供的上下文重名。
const navigationKey = Symbol('blog-navigation');

/** 在公共布局中创建导航上下文，让页头和搜索页共享 URL 状态与跳转入口。 */
export function provideNavigation() {
    const router = useRouter();
    const { frontmatter, params } = useData();
    // 状态归属当前布局实例，不放在模块顶层，避免服务端渲染时跨请求共享。
    const query = shallowRef('');
    const searchState = computed(() => parseSearch(query.value));
    // 搜索范围优先取文章模块，其次取动态模块页参数，最后取当前搜索条件。
    const context = computed(
        () =>
            findModule(frontmatter.value.module || params.value?.module || searchState.value.module) ||
            (searchState.value.area ? { area: searchState.value.area } : null)
    );
    let previousHook, installedHook;
    function sync() {
        query.value = window.location.search;
    }
    // 浏览器地址只在挂载后读取，保证服务端与客户端首次渲染使用一致的初始值。
    onMounted(() => {
        sync();
        // 保留已有路由钩子，先执行它再同步查询串，避免覆盖其他主题扩展行为。
        previousHook = router.onAfterRouteChange;
        installedHook = async href => {
            await previousHook?.(href);
            sync();
        };
        router.onAfterRouteChange = installedHook;
        // 浏览器前进、后退也需要还原查询条件。
        window.addEventListener('popstate', sync);
    });
    onUnmounted(() => {
        // 仅撤销自己安装的钩子；若后来已有其他逻辑替换它，则不覆盖新钩子。
        if (router.onAfterRouteChange === installedHook) router.onAfterRouteChange = previousHook;
        window.removeEventListener('popstate', sync);
    });
    /** 客户端交互入口：生成带部署前缀的搜索地址，并同步页面状态。 */
    function search(state, path = '/search.html') {
        const target = withBase(path) + searchQuery(state);
        if (window.location.pathname === withBase(path)) {
            // 同页筛选只追加历史记录，不重新加载页面，避免滚动位置跳回顶部。
            if (window.location.pathname + window.location.search !== target) window.history.pushState({}, '', target);
            sync();
            // 跨页面时交给 VitePress 加载对应的静态页面及组件。
        } else router.go(target);
    }
    const api = { searchState, context, search };
    provide(navigationKey, api);
    return api;
}

// 子组件必须位于调用 provideNavigation 的布局内，才能取得共享导航上下文。
export const useNavigation = () => inject(navigationKey);
