import {defineConfig} from 'vitepress'

export default defineConfig({
    title: "Code Blog",
    description: "一个菜鸟程序员的脚步",
    // GitHub Pages 提供部署子路径，本地开发默认使用根路径。
    base: `${process.env.PAGES_BASE_PATH || ''}/`,
    srcExclude: ['**/AGENTS.md', '.codex/**', '.agents/**']
})
