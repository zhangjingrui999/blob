import { fileURLToPath } from 'node:url';
import { modulePaths } from '../../.vitepress/data/routes.js';

// VitePress 动态路由生成器：每个末级模块都生成一个实际的静态目录页。
// 与 [module].md 配合使用；新增模块只需修改集中配置，无需手动复制页面。
export default {
    // module 是稳定的路径 ID，title 是供页面使用的显示名称。
    async paths() {
        // 和页面分类使用同一批文章；新增模块无需额外添加路由配置。
        return modulePaths(fileURLToPath(new URL('../', import.meta.url)));
    }
};
