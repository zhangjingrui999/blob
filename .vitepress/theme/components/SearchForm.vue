<script setup>
import { shallowRef, useTemplateRef, watch } from 'vue';

const props = defineProps({ query: { type: String, default: '' }, autofocus: Boolean });
const emit = defineEmits(['submit']);
const value = shallowRef(props.query);
const input = useTemplateRef('input');
watch(
    () => props.query,
    query => {
        value.value = query;
    }
);
defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
    <form class="search-form" role="search" @submit.prevent="emit('submit', value.trim())">
        <span class="search-glyph" aria-hidden="true">⌕</span>
        <input
            ref="input"
            v-model="value"
            type="search"
            maxlength="200"
            aria-label="搜索关键词"
            placeholder="搜索知识、经验或问题…"
            :autofocus="autofocus"
        />
        <button class="button button-primary" type="submit">
            搜索
            <span aria-hidden="true">↗</span>
        </button>
    </form>
</template>

<style scoped>
.search-form {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px;
    border: 1px solid var(--blog-line);
    border-radius: 12px;
    background: var(--blog-panel);
}
.search-form:focus-within {
    border-color: var(--blog-accent);
    box-shadow: 0 0 0 3px var(--blog-soft);
}
.search-glyph {
    font-size: 28px;
    margin-left: 9px;
    color: var(--blog-muted);
}
input {
    flex: 1;
    width: 100%;
    min-width: 0;
    border: 0;
    background: transparent;
    color: var(--blog-text);
    padding: 8px 0;
    font-size: 16px;
}
@media (max-width: 480px) {
    .search-form {
        gap: 5px;
    }
    .search-glyph {
        display: none;
    }
    input {
        padding-left: 6px;
    }
}
</style>
