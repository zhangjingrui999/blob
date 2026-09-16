<script setup>
import { computed, nextTick, onMounted, onUnmounted, shallowRef, useTemplateRef, watch } from 'vue';
import { useData, useRoute, withBase } from 'vitepress';
import { contentTypes, modules } from '../content.js';
import { useNavigation } from '../composables/useNavigation.js';
import { pageContentType } from '../utils/navigation.js';
import SearchForm from './SearchForm.vue';
import AppSelect from './AppSelect.vue';
import ModuleScopePicker from './ModuleScopePicker.vue';

const { isDark, frontmatter } = useData();
const route = useRoute();
const { context, searchState, search } = useNavigation();
const menuOpen = shallowRef(false);
const dialog = useTemplateRef('dialog');
const form = useTemplateRef('form');
const scopeType = shallowRef('');
const typeOptions = [
    { value: '', label: '全站内容' },
    ...contentTypes.map(type => ({ value: type.id, label: type.name }))
];
const scopeModules = shallowRef([]);
const scopeError = shallowRef('');
// 主题偏好来自浏览器，挂载前保持与静态 HTML 相同的按钮文字，避免深色模式刷新时 hydration 不一致。
const mounted = shallowRef(false);
const themeDark = computed(() => mounted.value && isDark.value);
const navItems = computed(() => [
    { id: 'home', name: '首页', url: '/' },
    ...contentTypes.map(item => ({
        ...item,
        url: `/${item.id}/`
    }))
]);
const activeNav = computed(() => pageContentType(frontmatter.value) || frontmatter.value.pageKind);
let opener,
    previousOverflow = '';

async function openSearch() {
    if (dialog.value?.open) return;
    opener = document.activeElement;
    scopeType.value = context.value?.type || '';
    // 文章和模块页优先当前模块，搜索页恢复已选范围；入口页没有具体范围时全选。
    const current = context.value;
    scopeModules.value = current?.modules?.length
        ? [...current.modules]
        : modules
              .filter(
                  item =>
                      (!current?.area || item.area === current.area) &&
                      (!current?.group || item.group === current.group)
              )
              .map(item => item.id);
    scopeError.value = '';
    menuOpen.value = false;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.value.showModal();
    await nextTick();
    form.value?.focus();
}

function closed() {
    document.body.style.overflow = previousOverflow;
    opener?.focus();
}

function closeSearch() {
    dialog.value?.close();
}
function clickBackdrop(event) {
    if (event.target === dialog.value) closeSearch();
}

function submit(q) {
    if (modules.length && !scopeModules.value.length) {
        scopeError.value = '请至少选择一个模块。';
        return;
    }
    closeSearch();
    // 全选省略模块限制，其他选择使用重复 module 参数；不带入旧领域和分组。
    search({
        q,
        type: scopeType.value,
        modules: scopeModules.value.length === modules.length ? [] : scopeModules.value,
        tags: []
    });
}
function updateModules(ids) {
    scopeModules.value = ids;
    scopeError.value = '';
}

function keyboard(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
    }
}

watch(
    () => route.path,
    () => {
        menuOpen.value = false;
        if (dialog.value?.open) closeSearch();
    }
);
onMounted(() => {
    mounted.value = true;
    window.addEventListener('keydown', keyboard);
});
onUnmounted(() => {
    window.removeEventListener('keydown', keyboard);
    if (dialog.value?.open) document.body.style.overflow = previousOverflow;
});
</script>

<template>
    <header class="site-header">
        <div class="header-inner">
            <a class="brand" :href="withBase('/')" aria-label="Code Blog 首页">
                <span class="brand-symbol" aria-hidden="true">&lt;/&gt;</span>
                <span
                    >Code
                    <span class="brand-light"> Blog</span>
                </span>
            </a>
            <nav class="desktop-nav" aria-label="主导航">
                <a
                    v-for="item in navItems"
                    :key="item.id"
                    :href="withBase(item.url)"
                    :aria-current="activeNav === item.id ? 'page' : undefined"
                    >{{ item.name }}</a
                >
            </nav>
            <div class="header-actions">
                <button class="search-trigger" aria-label="搜索知识与经验" aria-haspopup="dialog" @click="openSearch">
                    <span aria-hidden="true">⌕</span>
                    <span class="search-label">搜索知识与经验</span>
                    <kbd>Ctrl K</kbd>
                </button>
                <button
                    class="icon-button"
                    :aria-label="themeDark ? '切换浅色模式' : '切换深色模式'"
                    @click="isDark = !isDark"
                >
                    {{ themeDark ? '☀' : '◐' }}
                </button>
                <button
                    class="icon-button menu-trigger"
                    aria-label="展开导航"
                    aria-controls="mobile-nav"
                    :aria-expanded="menuOpen"
                    @click="menuOpen = !menuOpen"
                >
                    {{ menuOpen ? '×' : '☰' }}
                </button>
            </div>
        </div>
        <nav v-if="menuOpen" id="mobile-nav" class="mobile-nav" aria-label="手机导航">
            <a
                v-for="item in navItems"
                :key="item.id"
                :href="withBase(item.url)"
                :aria-current="activeNav === item.id ? 'page' : undefined"
                >{{ item.name }}</a
            >
        </nav>
    </header>
    <dialog
        ref="dialog"
        class="search-dialog"
        aria-labelledby="search-dialog-title"
        @close="closed"
        @click="clickBackdrop"
    >
        <div class="dialog-heading">
            <div>
                <span class="eyebrow">SEARCH / 探索</span>
                <h2 id="search-dialog-title">连接知识，找到答案。</h2>
            </div>
            <button class="icon-button" aria-label="关闭搜索" @click="closeSearch">×</button>
        </div>
        <SearchForm ref="form" :query="searchState.q" @submit="submit" />
        <div class="scope-label">
            <span>内容类型</span>
            <AppSelect v-model="scopeType" :options="typeOptions" label="搜索内容类型" />
        </div>
        <ModuleScopePicker :selected="scopeModules" @change="updateModules" />
        <p v-if="scopeError" role="alert" class="scope-error">{{ scopeError }}</p>
        <div class="dialog-footer">
            <span>支持中文关键词与英文近似拼写</span>
            <span> <kbd>Esc</kbd> 关闭 </span>
        </div>
    </dialog>
</template>

<style scoped>
.scope-error {
    color: var(--blog-accent);
    font-size: 13px;
    margin: 12px 0;
}
.site-header {
    position: sticky;
    top: 0;
    z-index: 20;
    background: var(--blog-panel);
    border-bottom: 1px solid var(--blog-line);
}

.header-inner {
    max-width: 1240px;
    min-height: 76px;
    margin: auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
    gap: 56px;
}

.brand {
    display: flex;
    gap: 11px;
    align-items: center;
    font-size: 22px;
    font-weight: 750;
    letter-spacing: -0.7px;
    white-space: nowrap;
}

.brand-symbol {
    display: grid;
    place-items: center;
    width: 35px;
    height: 35px;
    border: 1px solid var(--blog-line);
    border-radius: 9px;
    color: var(--blog-accent);
    font-family: var(--blog-mono);
    font-size: 17px;
    background: var(--blog-soft);
}

.brand-light {
    font-weight: 450;
}

.desktop-nav {
    display: flex;
    align-self: stretch;
    gap: 30px;
}

.desktop-nav a {
    display: flex;
    align-items: center;
    border-bottom: 2px solid transparent;
    color: var(--blog-muted);
    font-size: 14px;
}

.desktop-nav a[aria-current] {
    border-color: var(--blog-accent);
    color: var(--blog-accent);
}

.header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-left: auto;
}

.search-trigger {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 7px 12px;
    border: 1px solid var(--blog-line);
    border-radius: 8px;
    background: var(--blog-bg);
    color: var(--blog-muted);
    font-size: 12px;
}

.search-trigger > span:first-child {
    font-size: 23px;
    line-height: 1;
}

.menu-trigger,
.mobile-nav {
    display: none;
}

.search-dialog {
    width: min(580px, calc(100% - 32px));
    max-height: calc(100dvh - 48px);
    overflow: auto;
    padding: 28px;
    border: 1px solid var(--blog-line);
    border-radius: 18px;
    color: var(--blog-text);
    background: var(--blog-panel);
    box-shadow: 0 25px 100px #0004;
}

.search-dialog::backdrop {
    background: #0a163278;
    backdrop-filter: blur(5px);
}

.dialog-heading {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 22px;
}

.dialog-heading h2 {
    margin-top: 8px;
    font-size: 24px;
}

.scope-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 13px;
    margin: 20px 0;
}

.dialog-footer {
    border-top: 1px solid var(--blog-line);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 20px;
    margin-top: 24px;
    font-size: 11px;
    color: var(--blog-muted);
}

@media (max-width: 920px) {
    .header-inner {
        gap: 24px;
    }

    .search-label,
    .search-trigger kbd {
        display: none;
    }
}

@media (max-width: 640px) {
    .header-inner {
        min-height: 64px;
        padding: 0 18px;
        gap: 10px;
    }

    .brand {
        font-size: 20px;
    }

    .desktop-nav {
        display: none;
    }

    .menu-trigger {
        display: inline-flex;
    }

    .header-actions {
        gap: 5px;
    }

    .search-trigger {
        padding: 8px 10px;
    }

    .mobile-nav {
        display: flex;
        padding: 0 18px 16px;
        gap: 12px;
    }

    .mobile-nav a {
        flex: 1;
        text-align: center;
        padding: 10px;
        border-radius: 7px;
        background: var(--blog-bg);
    }

    .mobile-nav a[aria-current] {
        color: var(--blog-accent);
        background: var(--blog-soft);
    }

    .search-dialog {
        padding: 20px;
    }
}
</style>
