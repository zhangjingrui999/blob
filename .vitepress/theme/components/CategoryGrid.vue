<script setup>
import { withBase } from 'vitepress';
import { categories, moduleUrl } from '../../content.config.js';
</script>

<template>
    <div class="category-grid">
        <section v-for="(area, index) in categories" :key="area.id" class="category-card">
            <div class="category-top">
                <span class="category-symbol" aria-hidden="true">{{ ['{ }', '&lt;/&gt;', '[ : ]', '>_'][index] }}</span>
                <span class="category-number">0{{ index + 1 }}</span>
            </div>
            <span class="category-code">{{ area.code }}</span>
            <h3>{{ area.name }}</h3>
            <p>{{ area.description }}</p>
            <div class="category-modules">
                <template v-for="node in area.children" :key="node.id">
                    <div v-if="node.children" class="category-group">
                        <span>{{ node.name }}</span>
                        <div>
                            <a v-for="leaf in node.children" :key="leaf.id" :href="withBase(moduleUrl(leaf.id))">{{
                                leaf.name
                            }}</a>
                        </div>
                    </div>
                    <a v-else :href="withBase(moduleUrl(node.id))"
                        >{{ node.name }}
                        <span aria-hidden="true">↗</span>
                    </a>
                </template>
            </div>
        </section>
    </div>
</template>

<style scoped>
.category-symbol {
    white-space: nowrap;
}
.category-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
}
.category-card {
    padding: 24px 22px;
    background: var(--blog-panel);
    border: 1px solid var(--blog-line);
    border-radius: var(--blog-radius);
    transition:
        border-color 0.2s,
        transform 0.2s;
}
.category-card:hover {
    border-color: var(--blog-accent);
    transform: translateY(-3px);
}
.category-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}
.category-symbol {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    color: var(--blog-accent);
    font: 19px var(--blog-mono);
    background: var(--blog-soft);
    border-radius: 10px;
}
.category-number {
    font: 12px var(--blog-mono);
    color: var(--blog-muted);
}
.category-code {
    overflow-wrap: anywhere;
    font: 9px var(--blog-mono);
    letter-spacing: 1.5px;
    color: var(--blog-muted);
}
.category-card h3 {
    font-size: 21px;
    margin: 5px 0;
}
.category-card p {
    font-size: 12px;
    color: var(--blog-muted);
    margin: 0 0 20px;
}
.category-modules {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    flex-wrap: wrap;
}
.category-modules a {
    display: inline-flex;
    gap: 9px;
    font-size: 12px;
    padding: 4px 9px;
    border: 1px solid var(--blog-line);
    border-radius: 5px;
}
.category-modules a:hover {
    background: var(--blog-soft);
    border-color: var(--blog-accent);
}
.category-modules a span {
    color: var(--blog-muted);
}
.category-group {
    width: 100%;
}
.category-group > span {
    display: block;
    color: var(--blog-muted);
    font-size: 11px;
    margin: 0 0 5px;
}
.category-group > div {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
@media (max-width: 1000px) {
    .category-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (max-width: 480px) {
    .category-grid {
        gap: 10px;
    }
    .category-card {
        padding: 17px 13px;
    }
    .category-card p {
        min-height: 40px;
    }
    .category-modules a {
        padding: 4px 7px;
    }
    .category-top {
        margin-bottom: 18px;
    }
}
</style>
