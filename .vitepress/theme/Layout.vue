<script setup>
import { defineAsyncComponent } from 'vue'
import { useData, withBase } from 'vitepress'
import { provideNavigation } from './composables/useNavigation.js'
import AppHeader from './components/AppHeader.vue'
import HomePage from './pages/HomePage.vue'
import KnowledgePage from './pages/KnowledgePage.vue'
import ModulePage from './pages/ModulePage.vue'
import ArticlePage from './pages/ArticlePage.vue'
const SearchPage = defineAsyncComponent(() => import('./pages/SearchPage.vue'))
const { frontmatter, page } = useData()
provideNavigation()
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
      <KnowledgePage v-else-if="frontmatter.pageKind === 'knowledge'" />
      <ModulePage v-else-if="frontmatter.pageKind === 'module'" />
      <SearchPage v-else-if="['search', 'experience'].includes(frontmatter.pageKind)" />
      <ArticlePage v-else-if="frontmatter.type" />
      <Content v-else class="vp-doc" />
    </main>
    <footer class="site-footer">
      <div class="footer-inner">
        <a :href="withBase('/')">&lt;/&gt; Code Blog
          <span>一个菜鸟程序员的脚步</span>
        </a>
        <span>用记录连接知识 · 用实践积累经验</span>
      </div>
    </footer>
  </div>
</template>
