import { categories, findModule } from '../content.js';
import { parseSearch as parse } from '../../data/search.js';

// 浏览器适配层：注入自动收集的目录，其余检索规则保持纯函数。
export const parseSearch = query => parse(query, { categories, findModule });
export {
    emptySearch,
    selectedModules,
    searchQuery,
    changeFilter,
    searchArticles,
    collectTags
} from '../../data/search.js';
