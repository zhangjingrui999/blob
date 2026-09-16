import { contentTypes, findModule, label } from '../content.js';

/** 页面类型由元数据确定，查询参数不能改变基础知识或经验分享页面的归属。 */
export function pageContentType(meta = {}) {
    if (contentTypes.some(item => item.id === meta.type)) return meta.type;
    // 保留已有结构页面的标记，避免模块模板和旧入口失效。
    if (['knowledge', 'module'].includes(meta.pageKind)) return 'basics';
    if (meta.pageKind === 'experience') return 'experience';
    return '';
}

/** 统一生成搜索页面路径；调用方使用 withBase 处理部署子路径。 */
export function searchPath(type) {
    return contentTypes.some(item => item.id === type) ? '/' + type + '/search.html' : '/search.html';
}

/** 导航搜索保留内容类型和当前分类；首页只提供全站搜索。 */
export function resolveSearchContext(meta = {}, params = {}, state = {}) {
    if (meta.pageKind === 'home') return null;
    const type = pageContentType(meta) || state.type || '';
    const module = findModule(meta.module || params.module || state.module);
    const area = module?.area || state.area || '';
    const group = module?.group || state.group || '';
    const chosen = module ? [module.id] : state.modules || [];
    if (!type && !module && !area && !chosen.length) return null;
    return {
        type,
        area,
        group,
        module: module?.id || '',
        modules: chosen,
        name: [type, ...(chosen.length ? chosen : [group || area])].filter(Boolean).map(label).join(' · ')
    };
}
