import assert from 'node:assert/strict';
import test from 'node:test';
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress';
import { buildKnowledge, chapterLinks, headingNodes } from '../.vitepress/data/knowledge.js';
import { createCatalog } from '../.vitepress/data/catalog.js';
import { transformArticles } from '../.vitepress/data/content.js';
import { modulePaths } from '../.vitepress/data/routes.js';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';

// 测试数据只存在内存中，不给用户的 docs 增加示例文章。
const page = (name, meta = {}) => ({
    url: `/basics/php/${name}.html`,
    frontmatter: { title: name, description: '摘要', type: 'basics', module: 'php', area: '后端', ...meta }
});

test('状态标签沿用文章筛选，未使用时不生成空标签', () => {
    assert.deepEqual(createCatalog([]).tags, []);
    const articles = transformArticles([
        page('legacy', { tags: ['过时', '废弃', '数组'] }),
        page('current', { tags: ['数组'] })
    ]);
    const tags = createCatalog(articles).tags;
    assert.deepEqual(
        tags.map(tag => tag.id),
        ['数组', '过时', '废弃']
    );
    assert.match(tags.find(tag => tag.id === '废弃').description, /不一定已无法运行/);
    assert.deepEqual(articles.find(article => article.title === 'current').tags, ['数组']);
});

test('自动收集模块、领域、标签，不需要任何注册清单', () => {
    const articles = transformArticles([
        page('a', { moduleName: 'PHP', tags: ['新标签', '新标签'], knowledge: ['语言基础', '类型系统'] }),
        page('b', { tags: ['另一个标签'] }),
        page('draft', { draft: true, module: 'hidden' }),
        { url: '/basics/index.html', frontmatter: { pageKind: 'knowledge' } }
    ]);
    const catalog = createCatalog(articles);
    assert.deepEqual(
        catalog.modules.map(module => module.id),
        ['php']
    );
    assert.equal(catalog.findModule('php').name, 'PHP');
    assert.equal(catalog.categories[0].name, '后端');
    assert.deepEqual(
        catalog.tags.map(tag => tag.id),
        ['新标签', '另一个标签']
    );
    assert.deepEqual(articles[0].knowledge, ['语言基础', '类型系统']);
    assert.throws(() => createCatalog([...articles, { ...articles[0], area: '前端' }]), /不一致/);
    assert.throws(() => transformArticles([page('bad', { knowledge: '非数组' })]), /knowledge/);
});

test('多层知识路径归并，按 order 排序，不混入其他模块或经验', () => {
    const articles = transformArticles([
        page('b', { order: 20, knowledge: ['语言基础', '类型系统'] }),
        page('a', { order: 10, knowledge: ['语言基础', '类型系统'] }),
        page('c', { order: 30, knowledge: ['语言基础', '函数'] }),
        page('d', { order: 40 }),
        page('experience', { type: 'experience' }),
        page('html', { module: 'html', area: '前端', relatedModules: ['php'] })
    ]);
    const tree = buildKnowledge(articles).find(module => module.id === 'php');
    assert.equal(tree.children[0].title, '语言基础');
    assert.deepEqual(
        tree.children[0].children.map(node => node.title),
        ['类型系统', '函数']
    );
    assert.deepEqual(
        chapterLinks(tree).map(node => node.title),
        ['a', 'b', 'c', 'd']
    );
    assert.equal(tree.count, 4);
    assert.deepEqual(buildKnowledge([]), []);
    assert.deepEqual(createCatalog([]).categories, []);
});

test('知识树复用正文锚点，支持中文、重名标题和子章节，忽略代码块标题', async () => {
    const md = await createMarkdownRenderer(process.cwd(), { headers: true });
    const env = {};
    const html = md.render('# 总览\n\n## 类型\n\n### 数组\n\n## 类型\n\n```md\n## 不是章节\n```', env);
    const tree = headingNodes(env.headers, '/basics/php/language.html');
    assert.equal(tree.length, 2);
    assert.equal(tree[0].children[0].title, '数组');
    assert.notEqual(tree[0].url, tree[1].url);
    for (const node of [...tree, ...tree[0].children]) {
        assert.ok(html.includes(`id="${node.url.split('#')[1]}"`));
    }
});

test('模块路由自动收集两类文章，忽略草稿，删除文章后模块同步消失', async () => {
    disposeMdItInstance();
    const root = await mkdtemp(join(tmpdir(), 'blog-routes-test-'));
    try {
        await mkdir(join(root, 'basics'));
        await mkdir(join(root, 'experience'));
        const source = module =>
            `---\ntitle: 测试\ndescription: 测试摘要\ntype: basics\nmodule: ${module}\n---\n# 测试`;
        await writeFile(join(root, 'basics', 'a.md'), source('php'));
        await writeFile(join(root, 'experience', 'b.md'), source('html').replace('type: basics', 'type: experience'));
        await writeFile(
            join(root, 'basics', 'draft.md'),
            source('draft').replace('module: draft', 'module: draft\ndraft: true')
        );
        assert.deepEqual((await modulePaths(root)).map(item => item.params.module).sort(), ['html', 'php']);
        // 路由先初始化渲染器时，也不能导致后续知识树丢失章节数据。
        const md = await createMarkdownRenderer(root, { headers: true });
        const env = {};
        md.render('## 基本概念', env);
        assert.equal(env.headers[0].title, '基本概念');
        await rm(join(root, 'basics', 'a.md'));
        assert.deepEqual(
            (await modulePaths(root)).map(item => item.params.module),
            ['html']
        );
    } finally {
        // 只清理本测试创建且确认处于系统临时目录内的路径。
        const child = relative(tmpdir(), root);
        if (child.startsWith('blog-routes-test-') && !child.includes('..'))
            await rm(root, { recursive: true, force: true });
    }
});
