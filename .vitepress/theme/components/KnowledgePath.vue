<script setup>
import { withBase } from 'vitepress';
import KnowledgeTree from './KnowledgeTree.vue';

defineProps({ tree: { type: Object, required: true } });
</script>

<template>
    <div v-if="tree.children.length" class="learning-path">
        <section v-for="(stage, index) in tree.children" :key="stage.id" class="learning-stage">
            <div class="stage-heading">
                <span class="stage-number">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                    <h2>
                        <a v-if="stage.url" :href="withBase(stage.url)">{{ stage.title }} ↗</a
                        ><template v-else>{{ stage.title }}</template>
                    </h2>
                </div>
            </div>
            <KnowledgeTree v-if="stage.children.length" :nodes="stage.children" />
        </section>
    </div>
    <div v-else class="empty-state">
        <h2>这个模块的知识结构正在整理</h2>
        <p>可以先从其他已有内容的模块开始。</p>
        <a class="text-link" :href="withBase('/basics/')">返回知识目录 →</a>
    </div>
</template>

<style scoped>
.learning-path {
    display: grid;
    gap: 20px;
}
.learning-stage {
    background: var(--blog-panel);
    border: 1px solid var(--blog-line);
    border-radius: var(--blog-radius);
    padding: 26px 30px;
}
.stage-heading {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding-bottom: 20px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--blog-line);
}
.stage-number {
    color: var(--blog-accent);
    background: var(--blog-soft);
    border-radius: 9px;
    padding: 10px;
    font: 16px var(--blog-mono);
}
h2 {
    font-size: 19px;
    margin: 0 0 7px;
}
p {
    font-size: 13px;
    color: var(--blog-muted);
    margin: 0;
}
@media (max-width: 640px) {
    .learning-stage {
        padding: 20px 16px;
    }
}
</style>
