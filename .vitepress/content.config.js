// 内容类型、分类树和标签的唯一维护入口，页面组件只读取或派生这些数据。
// ID 用于文章元数据和链接；修改 name 不改变公开 URL，修改 ID 则需同步引用。
// 内容类型区分系统学习与实践记录，两种类型共用下面的技术分类树。
// grouped 控制是否展示中间分组：经验直接按领域和模块查找，基础知识保留完整层级。
export const contentTypes = [
    { id: 'basics', name: '基础知识', description: '从概念到原理，建立自己的知识体系。', grouped: true },
    { id: 'experience', name: '经验分享', description: '记录问题、实践与解决思路。', grouped: false }
];

// 分类层级为“领域 → 模块”或“领域 → 分组 → 模块”；末级节点才可绑定文章。
// code 用于首页英文辅助标识，description 用于分类卡片或模块简介。
export const categories = [
    {
        id: 'backend',
        name: '后端',
        code: 'BACKEND',
        description: '逻辑、接口与服务端的世界',
        children: [{ id: 'php', name: 'PHP', description: '从基础语法到服务端应用。' }]
    },
    {
        id: 'frontend',
        name: '前端',
        code: 'FRONTEND',
        description: '让想法成为可交互的界面',
        children: [
            { id: 'html', name: 'HTML' },
            { id: 'css', name: 'CSS' },
            { id: 'javascript', name: 'JavaScript' },
            { id: 'vue', name: 'Vue' },
            { id: 'wechat', name: '微信小程序' }
        ]
    },
    {
        id: 'database',
        name: '数据库',
        code: 'DATABASE',
        description: '组织数据，理解存储与查询',
        children: [
            { id: 'mysql', name: 'MySQL' },
            { id: 'redis', name: 'Redis' }
        ]
    },
    {
        id: 'server',
        name: '服务器',
        code: 'INFRASTRUCTURE',
        description: '从运行环境到稳定交付',
        children: [
            {
                id: 'os',
                name: '操作系统',
                children: [
                    { id: 'linux', name: 'Linux' },
                    { id: 'windows', name: 'Windows' }
                ]
            },
            {
                id: 'web',
                name: 'Web 服务器与反向代理',
                children: [
                    { id: 'nginx', name: 'Nginx' },
                    { id: 'apache', name: 'Apache' },
                    { id: 'iis', name: 'IIS' }
                ]
            }
        ]
    }
];

// 文章绑定这里的 ID；显示名称可以独立修改，统计只展示当前内容实际绑定的标签。
export const tags = [
    { id: '缓存', name: '缓存' },
    { id: '性能优化', name: '性能优化' },
    { id: '排错', name: '排错' },
    { id: '部署', name: '部署' },
    { id: '状态管理', name: '状态管理' },
    { id: '移动端', name: '移动端' }
];

// 展平末级模块并附上所属领域、分组，供路由生成、筛选和文章校验共用。
// 无中间分组的模块使用空 group，避免另行维护一份模块归属表。
export const modules = categories.flatMap(area =>
    area.children.flatMap(node =>
        node.children
            ? node.children.map(leaf => ({ ...leaf, area: area.id, group: node.id }))
            : [{ ...node, area: area.id, group: '' }]
    )
);
// 保留所有层级的节点，支持面包屑和筛选摘要按 ID 查找显示名称。
export const allCategories = categories.flatMap(area => [
    area,
    ...area.children.flatMap(node => [node, ...(node.children || [])])
]);
// 未知 ID 原样显示，避免查询参数中的值被显示成空白；文章有效性由构建器校验。
export const label = id => [...contentTypes, ...allCategories, ...tags].find(item => item.id === id)?.name || id;
// 只查找可绑定文章的末级模块，领域和中间分组不会被当成模块返回。
export const findModule = id => modules.find(item => item.id === id);
// 返回不含部署前缀的模块路径；页面渲染链接时统一调用 withBase。
export const moduleUrl = id => `/basics/${id}.html`;
