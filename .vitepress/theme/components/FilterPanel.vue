<script setup>
import { computed } from 'vue';
import { categories, contentTypes, label, modules } from '../../content.config.js';

const props = defineProps({
    state: { type: Object, required: true },
    tags: { type: Array, default: () => [] },
    fixedType: Boolean,
    fixedModule: Boolean
});
// 即使当前关键词没有候选结果，也保留已选标签供用户取消。
const visibleTags = computed(() => [
    ...props.tags,
    ...props.state.tags.filter(name => !props.tags.some(tag => tag.name === name)).map(name => ({ name, count: 0 }))
]);
const emit = defineEmits(['change']);
const rows = computed(() => {
    const result = [];
    if (!props.fixedType) result.push({ key: 'type', title: '内容类型', items: contentTypes });
    if (props.fixedModule) return result;
    result.push({ key: 'area', title: '技术领域', items: categories });
    const area = categories.find(item => item.id === props.state.area);
    if (area) {
        const groups = area.children.filter(item => item.children);
        if (
            groups.length &&
            (contentTypes.find(type => type.id === props.state.type)?.grouped !== false || props.state.group)
        )
            result.push({ key: 'group', title: '技术分组', items: groups });
        result.push({
            key: 'module',
            title: '技术模块',
            items: modules.filter(
                item => item.area === area.id && (!props.state.group || item.group === props.state.group)
            )
        });
    }
    return result;
});
// 模板只声明操作，数组更新集中在这里，避免修改传入的筛选状态。
function removeModule(id) {
    emit(
        'change',
        'modules',
        props.state.modules.filter(item => item !== id)
    );
}
function toggleTag(name) {
    const tags = props.state.tags;
    emit('change', 'tags', tags.includes(name) ? tags.filter(item => item !== name) : [...tags, name]);
}
</script>

<template>
    <details class="filter-panel" open>
        <summary>
            筛选内容
            <span>分类 / 模块 / 标签</span>
        </summary>
        <div class="filter-body">
            <div v-if="state.modules?.length" class="filter-row">
                <span class="filter-label">已选模块</span>
                <div class="chip-group" role="group" aria-label="已选搜索模块">
                    <button class="chip" @click="emit('change', 'modules', [])">全部模块</button>
                    <button
                        v-for="id in state.modules"
                        :key="id"
                        class="chip"
                        aria-pressed="true"
                        :aria-label="'移除模块 ' + label(id)"
                        @click="removeModule(id)"
                    >
                        {{ label(id) }} ×
                    </button>
                </div>
            </div>
            <div v-for="row in rows" :key="row.key" class="filter-row">
                <span class="filter-label">{{ row.title }}</span>
                <div class="chip-group" role="group" :aria-label="row.title">
                    <button class="chip" :aria-pressed="!state[row.key]" @click="emit('change', row.key, '')">
                        全部
                    </button>
                    <button
                        v-for="item in row.items"
                        :key="item.id"
                        class="chip"
                        :aria-pressed="state[row.key] === item.id"
                        @click="emit('change', row.key, item.id)"
                    >
                        {{ item.name }}
                    </button>
                </div>
            </div>
            <div class="filter-row">
                <span class="filter-label">文章标签</span>
                <div class="chip-group" role="group" aria-label="文章标签（多选时同时满足）">
                    <button class="chip" :aria-pressed="!state.tags.length" @click="emit('change', 'tags', [])">
                        全部标签
                    </button>
                    <span v-if="!visibleTags.length" class="small muted">当前范围暂无标签</span>
                    <button
                        v-for="tag in visibleTags"
                        :key="tag.name"
                        class="chip"
                        :aria-pressed="state.tags.includes(tag.name)"
                        @click="toggleTag(tag.name)"
                    >
                        {{ label(tag.name) }}
                        <span class="tag-count">{{ tag.count }}</span>
                    </button>
                </div>
            </div>
        </div>
    </details>
</template>

<style scoped>
.filter-panel {
    border: 1px solid var(--blog-line);
    background: var(--blog-panel);
    border-radius: var(--blog-radius);
    margin: 24px 0 18px;
}
.filter-panel summary {
    cursor: pointer;
    padding: 15px 22px;
    font-size: 13px;
    font-weight: 600;
}
.filter-panel summary span {
    font-size: 11px;
    font-weight: 400;
    color: var(--blog-muted);
    margin-left: 12px;
}
.filter-body {
    padding: 0 22px 4px;
}
.filter-row {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    border-top: 1px solid var(--blog-line);
    padding: 13px 0;
}
.filter-label {
    padding-top: 6px;
    font-size: 12px;
    color: var(--blog-muted);
    min-width: 65px;
}
.tag-count {
    opacity: 0.7;
    font-size: 11px;
    margin-left: 4px;
}
@media (max-width: 640px) {
    .filter-panel summary {
        padding: 14px;
    }
    .filter-body {
        padding: 0 14px;
    }
    .filter-row {
        gap: 6px;
    }
    .filter-label {
        min-width: 55px;
        font-size: 11px;
    }
}
</style>
