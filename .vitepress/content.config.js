// 仅保留网站固有的内容类型；领域、模块、分组和标签均从文章自动收集。
export const contentTypes = [
    { id: 'basics', name: '基础知识', description: '从概念到原理，建立自己的知识体系。', grouped: true },
    { id: 'experience', name: '经验分享', description: '记录问题、实践与解决思路。', grouped: false }
];

// 模块标识同时用于动态路由；不依赖展示名称，避免改名影响地址。
export const moduleUrl = id => `/basics/${id}.html`;
