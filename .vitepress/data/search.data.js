import { createContentLoader } from 'vitepress';
import { transformArticles } from './content.js';

// 构建独立的全文搜索数据，由搜索页面动态导入，避免首页首次加载携带所有正文。
export default createContentLoader(['basics/**/*.md', 'experience/**/*.md'], {
    // includeSrc 提供原始 Markdown，转换函数会剔除 frontmatter 后保留可检索内容。
    includeSrc: true,
    transform: pages => transformArticles(pages, true)
});
