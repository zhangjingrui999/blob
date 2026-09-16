import { fileURLToPath } from 'node:url';
import { createContentLoader, createMarkdownRenderer } from 'vitepress';
import config from '../config.mjs';
import { transformArticles } from './content.js';
import { buildKnowledge } from './knowledge.js';

// 只导出轻量的标题树，不把渲染后的正文放进浏览目录的数据包。
export default createContentLoader('basics/**/*.md', {
    includeSrc: true,
    async transform(pages) {
        const sources = new Map(pages.map(page => [page.url, page]));
        const md = await createMarkdownRenderer(
            fileURLToPath(new URL('../../docs/', import.meta.url)),
            config.markdown,
            config.base
        );
        const articles = transformArticles(pages).map(article => {
            const env = {};
            md.render(sources.get(article.url).src, env);
            return { ...article, headers: env.headers || [] };
        });
        return buildKnowledge(articles);
    }
});
