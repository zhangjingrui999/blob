import assert from 'node:assert/strict';
import test from 'node:test';
import { contentTypes } from '../.vitepress/content.config.js';
import { createCatalog } from '../.vitepress/data/catalog.js';
const modules = [
    { id: 'javascript', name: 'JavaScript', area: '前端', group: '' },
    { id: 'html', name: 'HTML', area: '前端', group: '' },
    { id: 'php', name: 'PHP', area: '后端', group: '' },
    { id: 'linux', name: 'Linux', area: '服务器', group: '操作系统' }
];
import { collectTags, parseSearch, searchArticles, searchQuery } from '../.vitepress/data/search.js';

// 为每个模块创建文章并关联其他所有模块，确保关联信息不会污染分类结果。
const articles = contentTypes.flatMap(type =>
    modules.map(module => ({
        title: module.name,
        description: '共同关键词',
        type: type.id,
        module: module.id,
        area: module.area,
        group: module.group,
        relatedModules: modules.filter(item => item.id !== module.id).map(item => item.id),
        tags: [module.id]
    }))
);

const catalog = createCatalog(articles);
const { categories } = catalog;

test('所有内容类型和模块：单选仅返回主模块文章，标签统计遵循同一范围', () => {
    for (const type of contentTypes) {
        for (const module of modules) {
            const state = parseSearch(searchQuery({ type: type.id, module: module.id }), catalog);
            const expected = articles.filter(article => article.type === type.id && article.module === module.id);
            assert.deepEqual(searchArticles(articles, state), expected);
            assert.deepEqual(collectTags(articles, state), [{ name: module.id, count: 1 }]);
        }
    }
});

test('领域与中间分组不包含仅通过关联模块命中的文章', () => {
    for (const area of categories) {
        assert.deepEqual(
            searchArticles(articles, { area: area.id }),
            articles.filter(article => article.area === area.id)
        );
    }
    for (const group of new Set(modules.map(module => module.group).filter(Boolean))) {
        const ids = modules.filter(module => module.group === group).map(module => module.id);
        assert.deepEqual(
            searchArticles(articles, { group }),
            articles.filter(article => ids.includes(article.module))
        );
    }
});

test('多模块保留或关系，关键词和标签继续约束结果，全站可查全部文章', () => {
    const chosen = ['javascript', 'html'];
    const state = parseSearch(searchQuery({ modules: chosen, q: '共同关键词' }), catalog);
    assert.deepEqual(
        searchArticles(articles, state),
        articles.filter(article => chosen.includes(article.module))
    );
    assert.deepEqual(
        searchArticles(articles, { ...state, tags: ['javascript'] }),
        articles.filter(article => article.module === 'javascript')
    );
    assert.deepEqual(searchArticles(articles, { ...state, q: '不存在的关键词' }), []);
    assert.deepEqual(searchArticles(articles, {}), articles);
});
