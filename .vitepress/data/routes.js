import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { createMarkdownRenderer } from 'vitepress';
import { transformArticles } from './content.js';
import { createCatalog } from './catalog.js';
import config from '../config.mjs';

/** 路由在 VitePress 数据加载器初始化前生成，因此直接用同一 Markdown 解析器读取元数据。 */
export async function modulePaths(srcDir) {
    // VitePress 复用渲染器实例，首次初始化就必须使用站点的标题与部署配置。
    const md = await createMarkdownRenderer(srcDir, config.markdown, config.base);
    const pages = [];
    async function scan(directory) {
        let entries;
        try {
            entries = await readdir(directory, { withFileTypes: true });
        } catch (error) {
            if (error.code === 'ENOENT') return;
            throw error;
        }
        for (const entry of entries) {
            const file = resolve(directory, entry.name);
            if (entry.isDirectory()) await scan(file);
            else if (entry.name.endsWith('.md') && entry.name !== 'AGENTS.md') {
                const env = {};
                md.render(await readFile(file, 'utf8'), env);
                const url = '/' + relative(srcDir, file).split(sep).join('/').replace(/\.md$/, '.html');
                pages.push({ url, frontmatter: env.frontmatter });
            }
        }
    }
    await scan(resolve(srcDir, 'basics'));
    await scan(resolve(srcDir, 'experience'));
    return createCatalog(transformArticles(pages)).modules.map(({ id, name }) => ({
        params: { module: id, title: name }
    }));
}
