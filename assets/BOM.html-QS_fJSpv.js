import{_ as a,o as n,c as s,e}from"./app-7D7ZZLlA.js";const t={},o=e(`<h1 id="bom" tabindex="-1"><a class="header-anchor" href="#bom" aria-hidden="true">#</a> BOM</h1><h2 id="location" tabindex="-1"><a class="header-anchor" href="#location" aria-hidden="true">#</a> location</h2><p>属性</p><ul><li><code>location.href</code> 完整路径</li><li><code>location.origin</code> https://www.baidu.com</li><li><code>location.host</code></li><li><code>location.port</code></li><li><code>location.protocol</code></li><li><code>location.pathname</code></li><li><code>location.search</code></li><li><code>location.hash</code></li></ul><p>方法</p><ul><li><code>location.assign()</code> 会跳转过去，可以用返回按钮跳到之前页面</li><li><code>location.replace()</code> 会替换当前浏览历史并且跳转, 不能再用返回按钮</li><li><code>location.reload()</code></li><li><code>location.toString()</code></li></ul><h3 id="history-hash-路由" tabindex="-1"><a class="header-anchor" href="#history-hash-路由" aria-hidden="true">#</a> history / hash 路由</h3><p>history 做 SPA 需要服务器将所有地址都代理到一个页面</p><p>hash history.pushState() 会话历史栈增加了一个条目。</p><h3 id="url-处理" tabindex="-1"><a class="header-anchor" href="#url-处理" aria-hidden="true">#</a> url 处理</h3><ul><li>正则</li><li>利用 api 处理</li></ul><h2 id="history" tabindex="-1"><a class="header-anchor" href="#history" aria-hidden="true">#</a> history</h2><p>会话历史栈</p><p>属性</p><ul><li><code>history.state</code> 获取栈顶到值，</li></ul><p>方法</p><ul><li><code>history.replaceState()</code> 替换当前状态</li><li><code>history.pushState()</code> 增加条目，触发 popstate</li></ul><p>事件</p><p>onpopstate，会被 <code>history.back(), history.forward</code> 和返回前进按钮触发。</p><h2 id="navigator" tabindex="-1"><a class="header-anchor" href="#navigator" aria-hidden="true">#</a> navigator</h2><p>浏览器系统信息,硬件操作。做数据采集埋点</p><ul><li><code>navigator.userAgent</code> 读取 UA，兼容性</li><li><code>navigator.clipboard</code> 剪切板</li></ul><h2 id="screen" tabindex="-1"><a class="header-anchor" href="#screen" aria-hidden="true">#</a> screen</h2><p>兼容性不同大小屏幕。</p><p>获取区域大小</p><ul><li><code>window.innerHeight/innerWidth</code></li><li><code>document.documentElement.clientWidth/clientHeight</code></li><li>offsetWidth 外框 = clientWidth 内框 + 滚动条 + 边框</li><li>scrolTop/scrollLeft 滚动绝对距离,offsetLeft/offsetTop 滚动相对距离</li><li>el.getBoundingClientRect() IE 会多出 2px</li></ul><h2 id="事件" tabindex="-1"><a class="header-anchor" href="#事件" aria-hidden="true">#</a> 事件</h2><p>捕获，冒泡，addEventListener 默认冒泡，true 为捕获</p><ul><li>event.stopPropergation() 阻止继续冒泡或捕获</li><li>event.preventDefault()</li><li>event.stopImmediatePropagation() 一个 el 上挂了多个监听器监听同一个事件，会阻止之后的回调触发</li><li>attachEvent IE 非标准，可以直接在 el.[<code>on\${event}</code>]</li></ul><h2 id="ajax" tabindex="-1"><a class="header-anchor" href="#ajax" aria-hidden="true">#</a> ajax</h2><h3 id="xmlhttprequest" tabindex="-1"><a class="header-anchor" href="#xmlhttprequest" aria-hidden="true">#</a> XMLHttpRequest</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> async<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// data 需要encodeURIComponent转码</span>
xhr<span class="token punctuation">.</span>readyStatus<span class="token punctuation">;</span> <span class="token comment">// 4为完成请求</span>

xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatuschange</span><span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyStatus <span class="token operator">===</span> <span class="token number">4</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    xhr<span class="token punctuation">.</span>responseText
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
xhr<span class="token punctuation">.</span>timeout <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function-variable function">ontimeout</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="fetch" tabindex="-1"><a class="header-anchor" href="#fetch" aria-hidden="true">#</a> fetch</h2>`,33),i=[o];function c(l,p){return n(),s("div",null,i)}const d=a(t,[["render",c],["__file","BOM.html.vue"]]);export{d as default};
