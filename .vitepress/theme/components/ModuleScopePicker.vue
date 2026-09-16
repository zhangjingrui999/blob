<script setup>
import { categories, modules } from '../../content.config.js';
const props = defineProps({ selected: { type: Array, required: true } });
const emit = defineEmits(['change']);
// 模块列表始终来自统一配置，支持跨领域组合而不复制分类数据。
const groups = categories.map(area => ({ ...area, modules: modules.filter(item => item.area === area.id) }));
function toggle(id) {
    emit('change', props.selected.includes(id) ? props.selected.filter(item => item !== id) : [...props.selected, id]);
}
</script>
<template>
    <section class="module-scope" aria-label="搜索模块范围">
        <div class="scope-heading">
            <span
                >模块范围 <small>已选 {{ selected.length }} / {{ modules.length }}</small></span
            >
            <div class="scope-actions">
                <button
                    class="text-link"
                    type="button"
                    @click="
                        emit(
                            'change',
                            modules.map(item => item.id)
                        )
                    "
                >
                    全选
                </button>
                <button class="text-link" type="button" @click="emit('change', [])">清空</button>
            </div>
        </div>
        <div v-for="group in groups" :key="group.id" class="scope-row">
            <span class="scope-name">{{ group.name }}</span>
            <div class="chip-group" role="group" :aria-label="group.name + '模块'">
                <button
                    v-for="module in group.modules"
                    :key="module.id"
                    class="chip"
                    type="button"
                    :aria-pressed="selected.includes(module.id)"
                    @click="toggle(module.id)"
                >
                    {{ module.name }}
                </button>
            </div>
        </div>
    </section>
</template>
<style scoped>
.module-scope {
    margin-top: 18px;
}
.scope-heading,
.scope-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}
.scope-heading {
    font-size: 13px;
    margin-bottom: 8px;
    flex-wrap: wrap;
}
.scope-heading small {
    color: var(--blog-muted);
    margin-left: 6px;
}
.scope-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-top: 1px solid var(--blog-line);
}
.scope-name {
    flex: 0 0 48px;
    padding-top: 6px;
    font-size: 12px;
    color: var(--blog-muted);
}
@media (max-width: 480px) {
    .scope-row {
        flex-direction: column;
        gap: 6px;
    }
    .scope-name {
        flex-basis: auto;
        padding-top: 0;
    }
}
</style>
