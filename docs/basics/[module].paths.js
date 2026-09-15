import { modules } from '../../.vitepress/content.config.js';

// VitePress 动态路由生成器：每个末级模块都生成一个实际的静态目录页。
// 与 [module].md 配合使用；新增模块只需修改集中配置，无需手动复制页面。
export default {
    // module 是稳定的路径 ID，title 是供页面使用的显示名称。
    paths: () => modules.map(module => ({ params: { module: module.id, title: module.name } }))
};
