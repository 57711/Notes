import{_ as n,o as s,c as a,e as t}from"./app-7D7ZZLlA.js";const o={},e=t(`<h1 id="原型链" tabindex="-1"><a class="header-anchor" href="#原型链" aria-hidden="true">#</a> 原型链</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Object 本身是函数,是构造器，原型是Function.prototype</span>

Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>Object<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>

<span class="token comment">// 同理Function也是构造器，原型是Function.prototype</span>

Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>Function<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>

<span class="token comment">// 所有构造器的原型都是Function.prototype</span>

<span class="token comment">// Constructor.prototype.constructor 指向 Constructor 本身</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Function<span class="token punctuation">;</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Object<span class="token punctuation">;</span>

<span class="token comment">// Constructo.constructor 指向 原型链上的constructor</span>

<span class="token class-name">Function</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Function<span class="token punctuation">;</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Function<span class="token punctuation">;</span>
<span class="token comment">// 相当于 Object._proto__.constructor === Function.prototype.constructor === Function;</span>
<span class="token comment">// Function.__proto__ === Function.prototype</span>

<span class="token comment">// Function.prototype 是唯一一个type是function， 但是原型是Object.prorotype</span>
<span class="token comment">// 所有的构造器也都是一个普通 JS 对象</span>

<span class="token keyword">typeof</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">;</span>

<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>

<span class="token comment">// Object.prototype 的原型是null</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[e];function p(i,l){return s(),a("div",null,c)}const r=n(o,[["render",p],["__file","原型链.html.vue"]]);export{r as default};
