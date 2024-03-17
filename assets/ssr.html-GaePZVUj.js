import{_ as n,o as s,c as a,e as t}from"./app-7D7ZZLlA.js";const e={},p=t(`<h1 id="ssr" tabindex="-1"><a class="header-anchor" href="#ssr" aria-hidden="true">#</a> ssr</h1><h2 id="基本结构" tabindex="-1"><a class="header-anchor" href="#基本结构" aria-hidden="true">#</a> 基本结构</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// app.js (在服务器和客户端之间共享)</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createSSRApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createSSRApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;button @click=&quot;count++&quot;&gt;{{ count }}&lt;/button&gt;</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// client.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./app.js&#39;</span>

<span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// server.js (不相关的代码省略)</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./app.js&#39;</span>

server<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 来托管客户端文件 client.js</span>

server<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">renderToString</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">html</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
        &lt;head&gt;
            &lt;title&gt;Vue SSR Example&lt;/title&gt;
            &lt;script type=&quot;importmap&quot;&gt;
            {
            &quot;imports&quot;: {
                &quot;vue&quot;: &quot;http://.../vue.js&quot;,
            }
            }
            &lt;/script&gt;
            &lt;!-- 加载vue --&gt;
        &lt;/head&gt;
        &lt;body&gt;
            &lt;div id=&quot;app&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>html<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div&gt;
            &lt;script type=&quot;module&quot; src=&quot;/client.js&quot;&gt;&lt;/script&gt;
            &lt;!-- 加载客户端入口文件 --&gt;
        &lt;/body&gt;
        &lt;/html&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h2><ul><li>服务端无响应性</li><li>只有created， beforeCreate 或者setup 钩子，内部不能有<strong>异步</strong>或者有<strong>副作用</strong>代码</li><li>不同平台api不同</li><li>跨请求状态污染</li></ul><h3 id="跨请求状态污染" tabindex="-1"><a class="header-anchor" href="#跨请求状态污染" aria-hidden="true">#</a> 跨请求状态污染</h3><p>在<strong>每个请求中为整个应用创建一个全新的实例</strong>，包括 router 和全局 store</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// app.js （在服务端和客户端间共享）</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createSSRApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./store.js&#39;</span>

<span class="token comment">// 每次请求时调用</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createSSRApp</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span>
  <span class="token comment">// 对每个请求都创建新的 store 实例</span>
  <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span>
  <span class="token comment">// 提供应用级别的 store</span>
  app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">&#39;store&#39;</span><span class="token punctuation">,</span> store<span class="token punctuation">)</span> <span class="token comment">// provide 注入</span>
  <span class="token comment">// 也为激活过程暴露出 store</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> app<span class="token punctuation">,</span> store <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="两种获取数据方式" tabindex="-1"><a class="header-anchor" href="#两种获取数据方式" aria-hidden="true">#</a> 两种获取数据方式</h2><ol><li><p>接口内部获取数据，之后用props注入到组件中渲染，返回渲染好的html，数据注入到外部对象</p><p>激活的时候从外部对象拿数据</p></li><li><p>组件内部直接获取数据，vue中<code>serverPrefetch()</code>, 在渲染前的异步生命周期</p><p>数据注入到外部对象， 激活的时候从外部对象拿数据, <code>store.replaceState()</code> 替换到store中</p></li></ol>`,12),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","ssr.html.vue"]]);export{r as default};
