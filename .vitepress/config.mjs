import {defineConfig} from 'vitepress'
import { findModule } from './content.config.js'

// 站点配置入口：控制内容来源、页面信息、构建路径和主题能力。
export default defineConfig({
    // 默认站点名称与描述；文章可通过 frontmatter 提供自己的标题和摘要。
    title: "Code Blog",
    description: "一个菜鸟程序员的脚步",
    // 声明网页使用简体中文，供浏览器、搜索引擎和读屏工具识别。
    lang: 'zh-CN',
    // 只将 docs 作为公开内容源，根目录的项目说明不会生成页面。
    srcDir: 'docs',
    // 保留普通页面 URL 的 .html 后缀，便于静态托管时直达与刷新。
    cleanUrls: false,
    // 启用深浅色模式状态，供公共头部中的主题切换按钮使用。
    appearance: true,
    // 将 Markdown 章节标题提取到 page.headers，供阅读页生成本页目录。
    markdown: { headers: true },
    // 模块页由动态路由生成，显示标题从统一分类配置读取，避免重复维护。
    transformPageData(page) {
        // 普通文章不改标题；未找到模块名称时保留 VitePress 已生成的标题。
        if (page.params?.module) page.title = findModule(page.params.module)?.name || page.title
    },
    // GitHub Pages 提供部署子路径，本地开发默认使用根路径。
    base: `${process.env.PAGES_BASE_PATH || ''}/`,
    // 即使内容目录中放入协作说明，也不将其构建为公开页面。
    srcExclude: ['**/AGENTS.md'],
    // 为支持的浏览器提供地址栏等界面的主题色；网页自身颜色由 CSS 控制。
    head: [['meta', { name: 'theme-color', content: '#1478e8' }]]
})
