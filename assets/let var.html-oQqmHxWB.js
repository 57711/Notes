import{_ as n,o as a,c as s,e}from"./app-7D7ZZLlA.js";const t={},c=e(`<h1 id="let-var" tabindex="-1"><a class="header-anchor" href="#let-var" aria-hidden="true">#</a> let var</h1><h2 id="var-let-区别" tabindex="-1"><a class="header-anchor" href="#var-let-区别" aria-hidden="true">#</a> var let 区别</h2><p><code>var</code> 有提升，<code>let</code> 没有提升，(预编译过程中)</p><p><code>var</code> 函数或全局作用域。<code>let</code> 块作用域。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a<span class="token punctuation">;</span>
<span class="token comment">// 1. 声明</span>
<span class="token comment">// 2. 初始化</span>
<span class="token comment">// 3. 赋值为undefined</span>

<span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: Cannot access &#39;a&#39; before initialization</span>
  <span class="token comment">// let 在块内只是声明了， 但是没有初始化和赋值。暂时性死区</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="let-编译为-var" tabindex="-1"><a class="header-anchor" href="#let-编译为-var" aria-hidden="true">#</a> let 编译为 var</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 会被编译为</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">{</span>
  <span class="token keyword">var</span> _a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="同时用-let-var" tabindex="-1"><a class="header-anchor" href="#同时用-let-var" aria-hidden="true">#</a> 同时用 let var</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// c alrady been declared. let c 的声明提升了</span>
  <span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),l=[c];function p(o,i){return a(),s("div",null,l)}const d=n(t,[["render",p],["__file","let var.html.vue"]]);export{d as default};
