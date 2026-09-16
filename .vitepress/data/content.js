import { contentTypes } from '../content.config.js';

/** 数组型文章标识统一校验，不要求预先登记标签或知识分支。 */
function stringList(value, field, url) {
    if (value === undefined) return [];
    if (!Array.isArray(value) || value.some(item => typeof item !== 'string' || !item.trim()))
        throw new Error(`无效的 ${field}：${url}`);
    return value.map(item => item.trim());
}

/** 校验并整理单篇文章；正文只在全文索引中输出。 */
function toArticle(page, includeText) {
    const meta = page.frontmatter;
    const module = meta.module;
    // 在构建阶段暴露无效引用，避免页面上线后出现缺失分类或无法检索的文章。
    if (
        typeof module !== 'string' ||
        !/^[a-z0-9][a-z0-9_-]*$/.test(module) ||
        ['index', 'search'].includes(module) ||
        !contentTypes.some(item => item.id === meta.type)
    )
        throw new Error(`无效的文章分类：${page.url}`);
    if (!meta.title || !meta.description) throw new Error(`文章缺少 title 或 description：${page.url}`);
    const boundTags = stringList(meta.tags, 'tags', page.url);
    const knowledge = stringList(meta.knowledge, 'knowledge', page.url);
    const relatedModules = stringList(meta.relatedModules, 'relatedModules', page.url);
    // 保留关联技术元数据，但分类筛选始终以主模块为准。
    for (const field of ['area', 'group', 'moduleName']) {
        if (meta[field] !== undefined && (typeof meta[field] !== 'string' || !meta[field].trim()))
            throw new Error(`无效的 ${field}：${page.url}`);
    }
    return {
        url: page.url,
        title: meta.title,
        description: meta.description,
        type: meta.type,
        module,
        moduleName: meta.moduleName?.trim() || '',
        area: meta.area?.trim() || '未分类',
        group: meta.group?.trim() || '',
        knowledge,
        tags: [...new Set(boundTags)],
        relatedModules,
        // 示例标识供界面展示，order 越小越靠前；未指定时按 0 处理。
        example: Boolean(meta.example),
        order: Number(meta.order) || 0,
        // 保留代码中的标签、标识符与运算符；这里只用于匹配，不作为 HTML 渲染。
        ...(includeText
            ? {
                  text: (page.src || '')
                      .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
                      .replace(/\s+/g, ' ')
                      .trim()
              }
            : {})
    };
}

/** 过滤结构页与草稿，生成按 order、URL 排序的公共文章数据。 */
export function transformArticles(pages, includeText = false) {
    // draft 只排除索引，不阻止 Markdown 页面生成；缺少分类的文章仍需进入校验。
    return pages
        .filter(page => !page.frontmatter.pageKind && !page.frontmatter.draft)
        .map(page => toArticle(page, includeText))
        .sort((a, b) => a.order - b.order || a.url.localeCompare(b.url));
}
