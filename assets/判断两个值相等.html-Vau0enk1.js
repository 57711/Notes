import{_ as a,o as s,c as n,e}from"./app-7D7ZZLlA.js";const l={},i=e(`<h1 id="判断两个值相等-object-is" tabindex="-1"><a class="header-anchor" href="#判断两个值相等-object-is" aria-hidden="true">#</a> 判断两个值相等/==/===/Object.is</h1><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> ==</h2><p>== 有强制类型转换</p><ul><li><p>两边相同类型</p><ul><li>对象/Symbol： 看引用</li><li>数值/字符串/布尔值： 看值</li><li>特例： +0 == -0 ， NaN != NaN</li></ul></li><li><p>两边不同类型</p><ul><li>一边为 null / undefined， 另一边也必须为 null / undefined</li><li>一边为对象，一边基本，对象用 tostring <code>{}.toString() =&gt; ‘[object Object]’,</code><br><code>[1,2].toString() =&gt; ‘1,2’</code></li><li>两边为不同基本类型 <ul><li>Symbol =&gt; false</li><li>Boolean =&gt; Number</li><li>其余优先转换为 number， 最终比较 number</li></ul></li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 转换顺序：</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token string">&#39;&#39;</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token string">&#39;&#39;</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> ===</h2><p>=== 只比较同类型，不同类型一律 false</p><h2 id="object-is" tabindex="-1"><a class="header-anchor" href="#object-is" aria-hidden="true">#</a> Object.is()</h2><ul><li><p>比较规则同===， 只有+0， -0 不同</p></li><li><p>对象需要相同引用</p></li><li><p>symbol 也需要相同引用</p></li><li><p>数字</p><ul><li>同为+0， -0， NaN</li><li>Object.is(+0, +0) =&gt; true</li><li>Object.is(+0, -0) =&gt; false</li><li>Object.is(+0, 0) =&gt; true</li><li>Object.is(-0, 0) =&gt; false</li><li>Object.is(NaN, NaN) true</li></ul></li></ul>`,9),t=[i];function c(o,p){return s(),n("div",null,t)}const u=a(l,[["render",c],["__file","判断两个值相等.html.vue"]]);export{u as default};
