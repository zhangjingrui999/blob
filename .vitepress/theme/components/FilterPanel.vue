<script setup>
import { computed } from 'vue';
import { categories, contentTypes, label, modules } from '../../content.config.js';

const props = defineProps({ state: { type: Object, required: true }, tags: { type: Array, default: () => [] } });
const emit = defineEmits(['change']);
const rows = computed(() => {
    const result = [
        { key: 'type', title: '内容类型', items: contentTypes },
        { key: 'area', title: '技术领域', items: categories }
    ];
    const area = categories.find(item => item.id === props.state.area);
    if (area) {
        const groups = area.children.filter(item => item.children);
        if (groups.length) result.push({ key: 'group', title: '技术分组', items: groups });
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
</script>

<template>
    <details class="filter-panel" open>
        <summary>
            筛选内容
            <span>分类 / 模块 / 标签</span>
        </summary>
        <div class="filter-body">
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
            <div v-if="state.type === 'experience' && tags.length" class="filter-row">
                <span class="filter-label">经验标签</span>
                <div class="chip-group" role="group" aria-label="经验标签（多选时同时满足）">
                    <button
                        v-for="tag in tags"
                        :key="tag.name"
                        class="chip"
                        :aria-pressed="state.tags.includes(tag.name)"
                        @click="
                            emit(
                                'change',
                                'tags',
                                state.tags.includes(tag.name)
                                    ? state.tags.filter(item => item !== tag.name)
                                    : [...state.tags, tag.name]
                            )
                        "
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
