import { moduleUrl } from '../content.config.js';
import { createCatalog } from './catalog.js';

/** 使用渲染器生成的 slug，保证知识点链接与正文完全一致。 */
export function headingNodes(headers, url) {
    return headers.map(header => ({
        id: `${url}#${header.slug}`,
        title: header.title,
        url: `${url}#${header.slug}`,
        children: headingNodes(header.children || [], url)
    }));
}

/** 按文章 knowledge 路径归并分支，路径长度不限，顺序由文章 order 决定。 */
export function buildKnowledge(articles) {
    const basics = articles.filter(article => article.type === 'basics');
    const catalog = createCatalog(basics);
    return catalog.modules.map(module => {
        const entries = basics
            .filter(article => article.module === module.id)
            .sort((a, b) => (a.order || 0) - (b.order || 0) || a.url.localeCompare(b.url));
        const tree = {
            id: module.id,
            title: module.name,
            area: module.area,
            url: moduleUrl(module.id),
            children: [],
            count: entries.length
        };
        for (const article of entries) {
            let parent = tree;
            const path = [];
            for (const title of article.knowledge || []) {
                path.push(title);
                // 数组编码避免名称中出现斜杠时与其他路径碰撞。
                const id = `${module.id}:${JSON.stringify(path)}`;
                let branch = parent.children.find(node => node.id === id);
                if (!branch) {
                    branch = { id, title, children: [] };
                    parent.children.push(branch);
                }
                parent = branch;
            }
            parent.children.push({
                id: article.url,
                title: article.title,
                url: article.url,
                article: true,
                children: headingNodes(article.headers || [], article.url)
            });
        }
        return tree;
    });
}

/** 按树的深度优先顺序查找文章，章节锚点不参与上一篇/下一篇。 */
export function chapterLinks(tree) {
    if (!tree) return [];
    return tree.children.flatMap(node => (node.article ? [node] : chapterLinks(node)));
}
