import { contentTypes, findModule, tags } from '../content.config.js';

/** 校验并整理单篇文章；正文只在全文索引中输出。 */
function toArticle(page, includeText) {
    const meta = page.frontmatter;
    const module = findModule(meta.module);
    // 在构建阶段暴露无效引用，避免页面上线后出现缺失分类或无法检索的文章。
    if (!module || !contentTypes.some(item => item.id === meta.type)) throw new Error(`无效的文章分类：${page.url}`);
    if (!meta.title || !meta.description) throw new Error(`文章缺少 title 或 description：${page.url}`);
    const boundTags = meta.tags || [];
    // 标签必须先在集中字典中注册，文章中重复绑定的标签会在输出时去重。
    if (!Array.isArray(boundTags) || boundTags.some(id => !tags.some(tag => tag.id === id)))
        throw new Error(`无效的文章标签：${page.url}`);
    const relatedModules = meta.relatedModules || [];
    // 跨技术文章只保留一份正文，通过关联模块扩展检索入口。
    if (!Array.isArray(relatedModules) || relatedModules.some(id => !findModule(id)))
        throw new Error(`无效的关联模块：${page.url}`);
    // 领域从主模块派生；不直接采信文章中另一份可能不一致的领域信息。
    return {
        url: page.url,
        title: meta.title,
        description: meta.description,
        type: meta.type,
        module: module.id,
        area: module.area,
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
