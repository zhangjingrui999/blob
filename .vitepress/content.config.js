// 内容类型固定；领域、模块、分组和实际使用的标签仍从文章自动收集。
export const contentTypes = [
    { id: 'basics', name: '基础知识', description: '从概念到原理，建立自己的知识体系。', grouped: true },
    { id: 'experience', name: '经验分享', description: '记录问题、实践与解决思路。', grouped: false }
];

// 状态标签只描述文章涉及的版本或 API，不代表整个技术已停止使用。
// 文章通过 tags 显式标记；正文版本表说明具体知识点、弃用/移除边界、替代方案和依据。
// 已补充新版方案的文章仍可保留状态标签，便于检索迁移与兼容知识。
export const contentStatusTags = [
    { id: '过时', name: '过时', description: '旧版本、停止维护的环境或已不适用于当前版本的实践。' },
    {
        id: '废弃',
        name: '废弃',
        description: '官方已弃用、移除或判定为不应再使用的 API、语法或实现；不一定已无法运行。'
    }
];

// 模块标识同时用于动态路由；不依赖展示名称，避免改名影响地址。
export const moduleUrl = id => `/basics/${id}.html`;
