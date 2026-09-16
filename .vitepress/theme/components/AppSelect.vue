<script setup>
import { computed, nextTick, onMounted, onUnmounted, shallowRef, useId, useTemplateRef } from 'vue';

const props = defineProps({
    modelValue: { type: String, default: '' },
    options: { type: Array, required: true },
    label: { type: String, required: true }
});
const emit = defineEmits(['update:modelValue']);
const root = useTemplateRef('root');
const trigger = useTemplateRef('trigger');
const listId = useId();
const expanded = shallowRef(false);
const active = shallowRef(0);
const selected = computed(() => props.options.findIndex(option => option.value === props.modelValue));
const caption = computed(() => props.options[selected.value]?.label || '请选择');

// 焦点保留在触发按钮，读屏通过 aria-activedescendant 跟随键盘高亮项。
function open() {
    if (!props.options.length) return;
    active.value = Math.max(selected.value, 0);
    expanded.value = true;
}
function choose(index) {
    const option = props.options[index];
    if (!option) return;
    emit('update:modelValue', option.value);
    expanded.value = false;
    trigger.value?.focus();
}
async function keydown(event) {
    if (event.key === 'Escape' && expanded.value) {
        event.preventDefault();
        event.stopPropagation();
        expanded.value = false;
        return;
    }
    if (event.key === 'Tab') {
        expanded.value = false;
        return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    if (!expanded.value) {
        open();
        return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
        choose(active.value);
        return;
    }
    if (event.key === 'Home') active.value = 0;
    else if (event.key === 'End') active.value = props.options.length - 1;
    else
        active.value =
            (active.value + (event.key === 'ArrowDown' ? 1 : -1) + props.options.length) % props.options.length;
    await nextTick();
    root.value?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
}
function outside(event) {
    if (!root.value?.contains(event.target)) expanded.value = false;
}
function blur(event) {
    if (!root.value?.contains(event.relatedTarget)) expanded.value = false;
}
// 监听器仅在客户端注册，组件卸载时清理，避免跨页面残留。
onMounted(() => document.addEventListener('pointerdown', outside));
onUnmounted(() => document.removeEventListener('pointerdown', outside));
</script>
<template>
    <div ref="root" class="select-control custom-select" @focusout="blur">
        <button
            ref="trigger"
            type="button"
            class="form-select"
            role="combobox"
            aria-haspopup="listbox"
            :aria-label="label"
            :aria-expanded="expanded"
            :aria-controls="listId"
            :aria-activedescendant="expanded ? listId + '-' + active : undefined"
            @click="expanded ? (expanded = false) : open()"
            @keydown="keydown"
        >
            {{ caption }}
        </button>
        <ul v-show="expanded" :id="listId" class="select-options" role="listbox" :aria-label="label">
            <li
                v-for="(option, index) in options"
                :id="listId + '-' + index"
                :key="option.value"
                class="select-option"
                role="option"
                :aria-selected="modelValue === option.value"
                :data-active="active === index"
                @pointermove="active = index"
                @pointerdown.prevent
                @click="choose(index)"
            >
                <span>{{ option.label }}</span>
                <span v-if="modelValue === option.value" class="select-check" aria-hidden="true">✓</span>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.custom-select .form-select {
    text-align: left;
}
.select-options {
    position: absolute;
    z-index: 5;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    min-width: 156px;
    max-height: 240px;
    overflow-y: auto;
    margin: 0;
    padding: 6px;
    list-style: none;
    border: 1px solid var(--blog-line);
    border-radius: 12px;
    background: var(--blog-panel);
    box-shadow:
        0 12px 32px var(--blog-shadow),
        0 3px 10px var(--blog-shadow);
}
.select-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 42px;
    padding: 9px 10px;
    border-radius: 7px;
    color: var(--blog-text);
    font-size: 14px;
    line-height: 1.5;
    cursor: pointer;
    overflow-wrap: anywhere;
}
.select-option + .select-option {
    margin-top: 3px;
}
.select-option[data-active='true'] {
    background: var(--blog-soft);
}
.select-option[aria-selected='true'] {
    color: var(--blog-accent);
    font-weight: 600;
}
.select-check {
    flex-shrink: 0;
    font-size: 14px;
}
</style>
