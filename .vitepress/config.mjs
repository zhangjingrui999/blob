import {defineConfig} from 'vitepress'

export default defineConfig({
    title: "Code Blog",
    description: "一个菜鸟程序员的脚步",
    srcExclude: ['**/AGENTS.md', '.codex/**', '.agents/**']
})
