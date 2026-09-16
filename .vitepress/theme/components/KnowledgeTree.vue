<script setup>
import { withBase } from 'vitepress';

const props = defineProps({
    nodes: { type: Array, required: true },
    currentUrl: { type: String, default: '' },
    depth: { type: Number, default: 0 },
    expanded: { type: Boolean, default: true }
});

// 阅读目录只自动展开当前主题的祖先分支，其余分支可由用户手动展开。
function containsCurrent(node) {
    return Boolean(props.currentUrl) && (node.url === props.currentUrl || node.children.some(containsCurrent));
}
</script>

<template>
    <ul class="knowledge-tree" :class="{ 'tree-root': depth === 0 }">
        <li v-for="node in nodes" :key="node.id">
            <details v-if="node.children.length" :open="expanded || containsCurrent(node)">
                <summary>
                    <span>{{ node.title }}</span>
                    <small>{{ node.children.length }}</small>
                </summary>
                <a
                    v-if="node.url"
                    class="topic-link"
                    :href="withBase(node.url)"
                    :aria-current="currentUrl === node.url ? 'page' : undefined"
                >
                    阅读本主题 <span aria-hidden="true">↗</span>
                </a>
                <KnowledgeTree
                    :nodes="node.children"
                    :current-url="currentUrl"
                    :depth="depth + 1"
                    :expanded="expanded"
                />
            </details>
            <a
                v-else-if="node.url"
                class="point-link"
                :href="withBase(node.url)"
                :aria-current="currentUrl === node.url ? 'page' : undefined"
            >
                {{ node.title }}
            </a>
        </li>
    </ul>
</template>

<style scoped>
.knowledge-tree {
    list-style: none;
    margin: 0 0 0 9px;
    padding: 0 0 0 19px;
    border-left: 1px solid var(--blog-line);
}
.tree-root {
    margin: 0;
    padding: 0;
    border: 0;
}
li {
    position: relative;
    padding: 3px 0;
    min-width: 0;
}
.knowledge-tree:not(.tree-root) > li::before {
    content: '';
    position: absolute;
    left: -19px;
    top: 20px;
    width: 12px;
    border-top: 1px solid var(--blog-line);
}
summary {
    cursor: pointer;
    padding: 9px 7px;
    color: var(--blog-text);
    font-weight: 600;
    overflow-wrap: anywhere;
}
summary::marker {
    color: var(--blog-accent);
}
summary small {
    font-weight: 400;
    color: var(--blog-muted);
    margin-left: 9px;
}
.point-link,
.topic-link {
    display: block;
    padding: 8px 10px;
    border-radius: 6px;
    overflow-wrap: anywhere;
    line-height: 1.6;
}
.point-link {
    color: var(--blog-muted);
}
.topic-link {
    font-size: 12px;
    color: var(--blog-accent);
    margin-left: 14px;
}
a:hover,
a[aria-current] {
    color: var(--blog-accent);
    background: var(--blog-soft);
}
@media (max-width: 640px) {
    .knowledge-tree {
        padding-left: 13px;
        margin-left: 4px;
    }
    .tree-root {
        margin: 0;
        padding: 0;
    }
    .knowledge-tree:not(.tree-root) > li::before {
        left: -13px;
        width: 8px;
    }
}
</style>
