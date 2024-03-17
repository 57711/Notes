import{_ as n,o as s,c as a,e as t}from"./app-7D7ZZLlA.js";const p={},e=t(`<h1 id="ts" tabindex="-1"><a class="header-anchor" href="#ts" aria-hidden="true">#</a> TS</h1><h2 id="类型-type" tabindex="-1"><a class="header-anchor" href="#类型-type" aria-hidden="true">#</a> 类型 type</h2><p>类型的背后是值所拥有的属性和方法。变量引用一个值，每个值都具有类型 type。</p><p>值<code>&#39;red&#39;</code> 类型是 string。拥有所有 string 的方法和属性。</p><p>所以：</p><ul><li>ts 可以帮助判断代码错误</li><li>编码时可以知道内部的数据类型，有哪些方法或属性可用。</li></ul><p>基础类型： number string boolean symbol null undefined void</p><p>对象类型： objects arrays functions classes 自定义的类型</p><p>对象类型可以欺骗 ts。</p><h2 id="类型注释-annotation-推断-inference" tabindex="-1"><a class="header-anchor" href="#类型注释-annotation-推断-inference" aria-hidden="true">#</a> 类型注释 annotation 推断 inference</h2><p>注释：一段代码用来告诉 ts 变量引用的值的类型，我们告诉 ts type 推断：ts 自动找出变量引用值的类型， ts 猜 type</p><p>两个功能对 variables, functions, objects 表现不同</p><p>一般情况都用推断。</p><p>需要注释的情况：</p><ul><li>声明变量，初始化变量在另一行语句。推断在声明变量且初始化的时候才生效，</li><li>函数返回 any，需要明确类型。 <code>json.parse()</code> 返回 any</li><li>变量的类型不能被推断的时候</li></ul><h2 id="tuple" tabindex="-1"><a class="header-anchor" href="#tuple" aria-hidden="true">#</a> tuple</h2><p>混合多种类型的类数组，元素顺序是固定的。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// tuple</span>
<span class="token keyword">const</span> <span class="token literal-property property">pepsi</span><span class="token operator">:</span> <span class="token punctuation">[</span>string<span class="token punctuation">,</span> number<span class="token punctuation">,</span> boolean<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;213&#39;</span><span class="token punctuation">,</span> <span class="token number">321</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// array</span>
<span class="token keyword">const</span> <span class="token literal-property property">pepsi</span><span class="token operator">:</span> <span class="token punctuation">(</span>string <span class="token operator">|</span> number <span class="token operator">|</span> boolean<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;213&#39;</span><span class="token punctuation">,</span> <span class="token number">321</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="interface" tabindex="-1"><a class="header-anchor" href="#interface" aria-hidden="true">#</a> interface</h2><p>定义一个新 type，用来描述 object 中属性名和值的 type</p><h2 id="clases" tabindex="-1"><a class="header-anchor" href="#clases" aria-hidden="true">#</a> clases</h2><p>修饰符，</p><ul><li>public，</li><li>private 只能在当前 class 里被调用</li><li>protected 当前 class 或子 class 里被调用</li></ul><p>子类 constructor 中的 super 相当于父类的 constructor。</p><p>自己构造的 class，可以将在 class 中 new 的实例设置为 private，以便限制使用的范围。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name"><span class="token constant">AA</span></span> <span class="token punctuation">{</span>
  <span class="token comment">// 相当于先在外面声明 val:string，再在constructor 内部赋值this.val = val</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> val<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">someMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">BB</span></span> <span class="token punctuation">{</span>
  <span class="token comment">// BB 的实例将不会访问到instAA，也就不会调用AA 的someMethods，更安全。</span>
  <span class="token keyword">private</span> instAA<span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>instAA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">AA</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">I1</span></span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">I2</span></span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  count<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">temp</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">I1</span> <span class="token operator">|</span> <span class="token constant">I2</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// value 只能拥有I1 I2 共同的方法name</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 更好的做法是标记为只有name的类型</span>

<span class="token keyword">interface</span> <span class="token class-name">IName</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">temp</span><span class="token punctuation">(</span>value<span class="token operator">:</span> IName<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>

<span class="token function">temp</span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 也满足IName类型</span>
<span class="token comment">// 一个值可以满足多种类型。</span>

<span class="token comment">// 抽象类</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">ClassName</span> <span class="token punctuation">{</span>
  <span class="token keyword">abstract</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">ClassName</span> <span class="token keyword">implements</span> <span class="token class-name"><span class="token constant">I1</span></span><span class="token punctuation">,</span> <span class="token constant">I2</span><span class="token punctuation">{</span>
  <span class="token comment">// 内部必须实现所有的interface，和抽象类的方法。</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  count<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 有继承，constructor 内部必须要super</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="主动推断函数的类型" tabindex="-1"><a class="header-anchor" href="#主动推断函数的类型" aria-hidden="true">#</a> 主动推断函数的类型</h2><p>fn 是 async 函数。</p><p>retryFn 的返回类型是 promise，也就是 fn 的返回类型。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">retryFn</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  tryTimes<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tryTimes <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">retryFn</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> tryTimes <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">getPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> aa <span class="token operator">=</span> <span class="token function">retryFn</span><span class="token punctuation">(</span>getPosts<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ts 可以直接推断出aa 的类型 Promise&lt;string[]&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","ts.html.vue"]]);export{r as default};