import { createContentLoader } from 'vitepress';
import { transformArticles } from './content.js';

// 构建时收集文章元数据，匹配路径相对于 VitePress 的 srcDir（docs）。
// 不携带正文，首页、目录和阅读页侧栏可以共用较小的数据包。
export default createContentLoader(['basics/**/*.md', 'experience/**/*.md'], {
    transform: pages => transformArticles(pages)
});
