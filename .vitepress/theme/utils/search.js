import { categories, contentTypes, findModule, modules } from '../../content.config.js';

// 搜索的纯数据逻辑，不依赖浏览器或 Vue，便于构建环境复用和独立测试。
// 空字符串表示该维度不限范围；每次返回新的 tags 数组，避免状态相互污染。
export const emptySearch = () => ({ q: '', type: '', area: '', group: '', module: '', modules: [], tags: [] });

/** 兼容旧单模块状态；多选时模块之间按“任意一个命中”处理。 */
export function selectedModules(state = {}) {
    return state.modules?.length ? [...new Set(state.modules)] : state.module ? [state.module] : [];
}

/** 从 URL 查询串恢复条件，并依据集中分类配置处理未知或冲突的分类。 */
export function parseSearch(query) {
    const params = new URLSearchParams(query);
    const moduleIds = [...new Set(params.getAll('module'))].filter(id => findModule(id));
    // 跨模块范围不叠加旧领域或分组，避免其他领域的已选模块被隐式排除。
    const multiple = moduleIds.length > 1;
    const area = categories.find(item => item.id === params.get('area'));
    const module = findModule(moduleIds[0]);
    const group = area?.children.find(item => item.children && item.id === params.get('group'));
    return {
        // 限制关键词长度，与搜索输入框保持一致。
        q: (params.get('q') || '').trim().slice(0, 200),
        type: contentTypes.some(item => item.id === params.get('type')) ? params.get('type') : '',
        // 仅提供模块参数时，自动补出所属领域，支持文章页的快捷搜索链接。
        area: multiple ? '' : area?.id || module?.area || '',
        group: multiple ? '' : group?.id || '',
        // 上级范围与模块不一致时舍弃模块，防止出现界面无法表达的筛选组合。
        modules: multiple ? moduleIds : [],
        module:
            !multiple && module && (!area || module.area === area.id) && (!group || module.group === group.id)
                ? module.id
                : '',
        // 多标签使用重复的 tag 参数，去重后保留；实际命中情况由文章筛选决定。
        tags: [...new Set(params.getAll('tag'))]
    };
}

/** 序列化可分享的查询串，省略空条件并交给 URLSearchParams 编码中文。 */
export function searchQuery(state) {
    const params = new URLSearchParams();
    const chosen = selectedModules(state);
    for (const key of ['q', 'type', ...(chosen.length > 1 ? [] : ['area', 'group'])])
        if (state[key]) params.set(key, state[key]);
    for (const id of chosen) params.append('module', id);
    for (const tag of state.tags || []) params.append('tag', tag);
    return params.size ? `?${params}` : '';
}

/** 返回新的筛选状态；切换范围时清理依赖它的子条件，保留当前关键词。 */
export function changeFilter(state, key, value) {
    const next = { ...emptySearch(), ...state, [key]: value };
    // 切换分类后重新选择标签；修改关键词保留标签，支持组合检索。
    if (['type', 'area', 'group', 'module', 'modules'].includes(key)) next.tags = [];
    if (key === 'type') next.group = '';
    if (key === 'area') {
        next.group = '';
        next.module = '';
    }
    if (key === 'group') next.module = '';
    if (['area', 'group', 'module'].includes(key)) next.modules = [];
    if (key === 'modules') {
        next.module = '';
        next.area = '';
        next.group = '';
    }
    return next;
}

/** 判断两个英文词是否最多相差一次插入、删除或替换，不支持字符交换。 */
function nearWord(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0,
        j = 0,
        errors = 0;
    while (i < a.length && j < b.length) {
        if (a[i] === b[j]) {
            i++;
            j++;
            continue;
        }
        if (++errors > 1) return false;
        // 等长时同时前进表示替换，不等长时只跳过较长一侧的字符。
        if (a.length >= b.length) i++;
        if (b.length >= a.length) j++;
    }
    // 循环末尾较长一侧剩余的字符也计入编辑次数。
    return errors + (a.length - i) + (b.length - j) <= 1;
}

/** 为单篇文章计算相关度；0 表示不匹配，空关键词用于普通列表浏览。 */
function score(article, query) {
    if (!query.trim()) return 1;
    const title = article.title.toLowerCase();
    const summary = `${article.description} ${article.tags.join(' ')} ${article.module}`.toLowerCase();
    const body = (article.text || '').toLowerCase();
    // 只对至少四个字母的英文词容错，避免短词和中文产生过多近似误匹配。
    const words = `${title} ${summary} ${body}`.match(/[a-z]{4,}/g) || [];
    let total = 0;
    for (const term of query.toLowerCase().trim().split(/\s+/)) {
        // 每个关键词取最强命中位置：标题 > 摘要及标签 > 正文 > 近似英文词。
        if (title.includes(term)) total += 12;
        else if (summary.includes(term)) total += 6;
        else if (body.includes(term)) total += 2;
        else if (/^[a-z]{4,}$/.test(term) && words.some(word => nearWord(term, word))) total += 1;
        // 空格分隔的多个关键词必须全部命中，任意一个未命中即排除此文。
        else return 0;
    }
    return total;
}

/** 主模块或任一关联模块命中即可，同一篇文章只保留一个结果。 */
function matchesModules(article, ids) {
    return ids.includes(article.module) || article.relatedModules?.some(id => ids.includes(id));
}

/** 先限定范围与标签，再计算关键词相关度；不复制跨模块文章的结果条目。 */
export function searchArticles(articles, state = {}) {
    const chosen = selectedModules(state);
    // 选择中间分组时包含其下的所有模块，而不是要求文章直接绑定该分组。
    const allowedModules = state.group ? modules.filter(item => item.group === state.group).map(item => item.id) : null;
    // 主模块与关联模块均可命中领域、分组和模块范围；多个标签要求同时满足。
    return articles
        .filter(article => {
            if (state.type && article.type !== state.type) return false;
            if (
                state.area &&
                article.area !== state.area &&
                !article.relatedModules?.some(id => findModule(id)?.area === state.area)
            )
                return false;
            if (allowedModules && !matchesModules(article, allowedModules)) return false;
            if (chosen.length && !matchesModules(article, chosen)) return false;
            return (state.tags || []).every(tag => article.tags.includes(tag));
        })
        .map(article => ({ article, score: score(article, state.q || '') }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.article);
}

/** 汇总当前内容类型与分类范围内的标签并集，返回每个标签的文章数。 */
export function collectTags(articles, state = {}) {
    const counts = new Map();
    // 统计候选时忽略已选标签，避免点选一个标签后其他可选标签立即消失。
    // 保留内容类型、关键词和技术范围；全站模式同时统计基础知识与经验。
    for (const article of searchArticles(articles, { ...state, tags: [] })) {
        for (const tag of article.tags) counts.set(tag, (counts.get(tag) || 0) + 1);
    }
    return [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}
