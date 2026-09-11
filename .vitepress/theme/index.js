import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
// 公共样式入口内部按令牌、基础控件和布局分层加载。
import './style.css'

// 继承默认主题的组件和 Markdown 样式能力，使用自定义布局组织博客页面。
export default {
    extends: DefaultTheme,
    // 页面框架统一提供导航、搜索入口、内容区域与页脚。
    Layout,
}
