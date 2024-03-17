import{_ as n,o as a,c as s,e}from"./app-7D7ZZLlA.js";const t={},o=e(`<h1 id="worker" tabindex="-1"><a class="header-anchor" href="#worker" aria-hidden="true">#</a> worker</h1><h2 id="利用-blob-开启-worker" tabindex="-1"><a class="header-anchor" href="#利用-blob-开启-worker" aria-hidden="true">#</a> 利用 blob 开启 worker</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">getWorker</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">worker</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> code <span class="token operator">=</span> worker<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> blob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)()</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h2><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3><ul><li>并行，独立线程，有独立上下文，不共享内存</li><li>不能访问 window，</li><li>通过序列化消息通信</li></ul><h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3><ul><li>缓存 service worker</li><li>跨窗口 postMessage</li><li>大计算</li><li>网络请求，轮询</li><li>计时，不受 showpage 影响</li><li>文件操作</li></ul>`,8),p=[o];function c(i,l){return a(),s("div",null,p)}const u=n(t,[["render",c],["__file","worker.html.vue"]]);export{u as default};
