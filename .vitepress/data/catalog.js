import { contentStatusTags, contentTypes } from '../content.config.js';

/** 从已发布文章汇总分类；同一个模块的领域、分组和显示名称必须一致。 */
export function createCatalog(articles) {
    const moduleMap = new Map();
    for (const article of articles) {
        const existing = moduleMap.get(article.module);
        if (existing && (existing.area !== article.area || existing.group !== (article.group || '')))
            throw new Error(`模块 ${article.module} 的 area/group 不一致：${article.url}`);
        if (existing && article.moduleName && existing.named && article.moduleName !== existing.name)
            throw new Error(`模块 ${article.module} 的显示名称不一致：${article.url}`);
        moduleMap.set(article.module, {
            id: article.module,
            name: article.moduleName || existing?.name || article.module,
            named: Boolean(article.moduleName || existing?.named),
            area: article.area,
            group: article.group || ''
        });
    }
    const modules = [...moduleMap.values()];
    const categories = [];
    for (const module of modules) {
        let area = categories.find(item => item.id === module.area);
        if (!area) {
            area = { id: module.area, name: module.area, children: [] };
            categories.push(area);
        }
        let parent = area;
        if (module.group) {
            parent = area.children.find(item => item.id === module.group && item.children);
            if (!parent) {
                parent = { id: module.group, name: module.group, children: [] };
                area.children.push(parent);
            }
        }
        parent.children.push(module);
    }
    const tags = [...new Set(articles.flatMap(article => article.tags))].map(
        id => contentStatusTags.find(tag => tag.id === id) || { id, name: id }
    );
    const names = [...contentTypes, ...categories, ...modules, ...tags];
    return {
        categories,
        modules,
        tags,
        findModule: id => modules.find(module => module.id === id),
        label: id => names.find(item => item.id === id)?.name || id
    };
}
