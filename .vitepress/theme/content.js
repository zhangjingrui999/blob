import { data as articles } from '../data/articles.data.js';
import { createCatalog } from '../data/catalog.js';

// 页面共用构建好的文章索引，分类不再需要手工注册。
export const { categories, modules, tags, findModule, label } = createCatalog(articles);
export { contentTypes, moduleUrl } from '../content.config.js';
