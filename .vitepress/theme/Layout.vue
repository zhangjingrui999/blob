<script setup>
import { useData, withBase } from 'vitepress';
import { provideNavigation } from './composables/useNavigation.js';
import AppHeader from './components/AppHeader.vue';
import HomePage from './pages/HomePage.vue';
import AppFooter from './components/AppFooter.vue';
import BasicsIndexPage from './pages/basics/BasicsIndexPage.vue';
import BasicsModulePage from './pages/basics/BasicsModulePage.vue';
import BasicsDetailPage from './pages/basics/BasicsDetailPage.vue';
import ExperienceIndexPage from './pages/experience/ExperienceIndexPage.vue';
import ExperienceDetailPage from './pages/experience/ExperienceDetailPage.vue';

// 页面壳同步挂载，避免 URL 状态先更新而异步页面尚未完成 hydration；全文索引仍按需加载。
import GlobalSearchPage from './pages/GlobalSearchPage.vue';
import BasicsSearchPage from './pages/basics/BasicsSearchPage.vue';
import ExperienceSearchPage from './pages/experience/ExperienceSearchPage.vue';
const { frontmatter, page } = useData();
provideNavigation();
</script>

<template>
    <div class="blog-app">
        <a class="skip-link" href="#main-content">跳到主要内容</a>
        <AppHeader />
        <main id="main-content" class="site-container">
            <div v-if="page.isNotFound" class="empty-state">
                <span class="eyebrow">404 / NOT FOUND</span>
                <h1>这条路径还没有内容。</h1>
                <p>试试搜索，或者回到首页重新出发。</p>
                <a class="button button-primary" :href="withBase('/')">返回首页</a>
            </div>
            <HomePage v-else-if="frontmatter.pageKind === 'home'" />
            <BasicsIndexPage v-else-if="frontmatter.pageKind === 'knowledge'" />
            <BasicsModulePage v-else-if="frontmatter.pageKind === 'module'" />
            <ExperienceIndexPage v-else-if="frontmatter.pageKind === 'experience'" />
            <BasicsSearchPage v-else-if="frontmatter.pageKind === 'search' && frontmatter.type === 'basics'" />
            <ExperienceSearchPage v-else-if="frontmatter.pageKind === 'search' && frontmatter.type === 'experience'" />
            <GlobalSearchPage v-else-if="frontmatter.pageKind === 'search'" />
            <BasicsDetailPage v-else-if="frontmatter.type === 'basics'" />
            <ExperienceDetailPage v-else-if="frontmatter.type === 'experience'" />
            <Content v-else class="vp-doc" />
        </main>
        <AppFooter />
    </div>
</template>
