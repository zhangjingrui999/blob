<script setup>
import { withBase } from 'vitepress';
</script>
<template>
    <section class="hero">
        <div class="hero-copy">
            <div class="hero-label">
                <span class="status-dot" />持续学习，持续构建
                <span class="hero-version">CODE / NOTES</span>
            </div>
            <h1>让知识有迹可循，<br />让<span>经验持续生长。</span></h1>
            <p>整理技术的脉络，记录解决问题的过程。 <br />从一行代码出发，构建自己的知识体系。</p>
            <div class="hero-actions">
                <a class="button button-primary" :href="withBase('/basics/')">探索知识库 ↗</a>
                <a class="button button-secondary" :href="withBase('/experience/')">阅读实践经验 →</a>
            </div>
            <div class="hero-bottom">// THINK CLEARLY. BUILD STEADILY.</div>
        </div>
        <div class="hero-art" aria-hidden="true">
            <div class="orbit" />
            <div class="art-label">KNOWLEDGE SYSTEM</div>
            <div class="code-window">
                <div class="window-bar">
                    <span />
                    <span />
                    <span />
                    <i>developer / journey</i>
                </div>
                <div class="code-body">
                    <div>
                        <em>01</em>
                        <span class="syntax">const</span> journey = {
                    </div>
                    <div><em>02</em>　 learn: <span class="string">'理解原理'</span>,</div>
                    <div><em>03</em>　 build: <span class="string">'动手实践'</span>,</div>
                    <div>
                        <em>04</em>　 share:
                        <span class="string">'记录与分享'</span>
                    </div>
                    <div><em>05</em>}</div>
                    <div class="code-comment"><em>06</em>// 每一次积累，都算数。</div>
                </div>
                <div class="window-status">
                    <span class="status-dot" />Always learning
                    <span>UTF-8</span>
                </div>
            </div>
            <div class="art-node node-a">&lt; knowledge /&gt;</div>
            <div class="art-node node-b">{ experience }</div>
        </div>
    </section>
</template>
<style scoped>
.hero {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    align-items: center;
    min-height: 420px;
    padding: 45px 0 56px;
    gap: 35px;
}
.hero-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--blog-accent);
    font-size: 12px;
}
.hero-version {
    margin-left: 12px;
    color: var(--blog-muted);
    font: 10px var(--blog-mono);
    letter-spacing: 1px;
}
.hero h1 {
    font-size: clamp(32px, 3.5vw, 48px);
    letter-spacing: -1.5px;
    line-height: 1.45;
    font-weight: 750;
    margin: 20px 0;
}
.hero h1 span {
    color: var(--blog-accent);
}
.hero p {
    font-size: 15px;
    line-height: 1.95;
    color: var(--blog-muted);
}
.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
}
.hero-bottom {
    margin-top: 28px;
    font: 9px var(--blog-mono);
    letter-spacing: 2px;
    color: var(--blog-muted);
}
.hero-art {
    position: relative;
    min-width: 0;
    height: 345px;
    display: grid;
    align-items: center;
    isolation: isolate;
    background: radial-gradient(ellipse, var(--blog-soft), transparent 68%);
}
.orbit {
    position: absolute;
    width: 290px;
    height: 290px;
    border: 1px dashed var(--blog-line);
    border-radius: 50%;
    left: 14%;
    top: 7%;
    z-index: -1;
}
.code-window {
    position: relative;
    border: 1px solid var(--blog-line);
    border-radius: 12px;
    background: var(--blog-panel);
    box-shadow: 0 18px 65px var(--blog-shadow);
    overflow: hidden;
    transform: rotate(-2deg);
    margin: 0 12px;
}
.window-bar {
    display: flex;
    gap: 5px;
    padding: 15px;
    border-bottom: 1px solid var(--blog-line);
    background: var(--blog-bg);
}
.window-bar > span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--blog-line);
}
.window-bar > span:first-child {
    background: var(--blog-accent);
}
.window-bar i {
    font: 9px var(--blog-mono);
    color: var(--blog-muted);
    margin-left: auto;
}
.code-body {
    padding: 24px 12px;
    font: 12px/2 var(--blog-mono);
}
.code-body em {
    font-style: normal;
    display: inline-block;
    width: 29px;
    text-align: center;
    margin-right: 12px;
    color: var(--blog-muted);
    opacity: 0.65;
}
.syntax {
    color: var(--blog-accent);
}
.string {
    color: var(--blog-teal);
}
.code-comment {
    color: var(--blog-muted);
}
.window-status {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 17px;
    font: 9px var(--blog-mono);
    border-top: 1px solid var(--blog-line);
    color: var(--blog-muted);
}
.window-status > span:last-child {
    margin-left: auto;
}
.art-label {
    position: absolute;
    top: 0;
    left: 18px;
    color: var(--blog-muted);
    font: 9px var(--blog-mono);
    letter-spacing: 2px;
}
.art-node {
    position: absolute;
    background: var(--blog-panel);
    border: 1px solid var(--blog-line);
    border-radius: 6px;
    padding: 8px 12px;
    color: var(--blog-accent);
    font: 10px var(--blog-mono);
    box-shadow: 0 5px 20px var(--blog-shadow);
}
.node-a {
    top: 26px;
    right: 1px;
}
.node-b {
    bottom: 8px;
    left: 28px;
}
@media (max-width: 920px) {
    .hero {
        gap: 15px;
    }
    .code-body {
        font-size: 10px;
        padding-left: 5px;
    }
    .orbit {
        width: 250px;
        height: 250px;
    }
    .hero-version {
        display: none;
    }
}
@media (max-width: 700px) {
    .hero {
        grid-template-columns: 1fr;
        min-height: auto;
        padding: 30px 0 38px;
    }
    .hero h1 {
        font-size: 36px;
    }
    .hero-art {
        display: none;
    }
    .hero p {
        font-size: 14px;
    }
    .hero-bottom {
        margin-top: 22px;
    }
}
@media (max-width: 360px) {
    .hero h1 {
        font-size: 31px;
    }
    .hero-actions {
        gap: 8px;
    }
    .hero-actions .button {
        padding: 11px 14px;
    }
}
</style>
