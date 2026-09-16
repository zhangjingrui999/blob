<script setup>
import { withBase } from 'vitepress';
</script>
<template>
    <footer class="site-footer">
        <div class="footer-inner">
            <a :href="withBase('/')"
                >&lt;/&gt; Code Blog
                <span>一个菜鸟程序员的脚步</span>
            </a>
            <span>用记录连接知识 · 用实践积累经验</span>
        </div>
    </footer>
</template>
