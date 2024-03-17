import{_ as p,r as e,o,c,a as n,d as s,b as i,e as a}from"./app-7D7ZZLlA.js";const l="/Notes/images/js-context.png",u={},k=a('<h1 id="上下文-预编译" tabindex="-1"><a class="header-anchor" href="#上下文-预编译" aria-hidden="true">#</a> 上下文/预编译</h1><h2 id="上下文" tabindex="-1"><a class="header-anchor" href="#上下文" aria-hidden="true">#</a> 上下文</h2><p>变量的作用域链与定义时的环境有关，与执行时无关。</p><ul><li><p>全局上下文创建阶段</p><ol><li>window 作为全局上下文对象</li><li>设置 this 指向 window</li><li>声明变量和函数，安排内存空间</li><li>var 变量赋值 undefined</li><li>放去作用域链</li></ol></li><li><p>全局上下文执行阶段 一行行执行，遇到函数创建 函数上下文</p></li><li><p>函数上下文创建</p><ol><li>arguments 作为上下文</li><li>this 指向函数调用</li><li>函数上下文执行之后从作用域链弹出</li><li>每次调用函数都创建函数上下文</li></ol></li></ul><p>var 和 let 不同处理：</p><ul><li>var 声明的放到变量环境 variable environment</li><li>let 声明的放到词法环境 lexical environment</li></ul><p><img src="'+l+'" alt="js-context"></p><h2 id="预编译" tabindex="-1"><a class="header-anchor" href="#预编译" aria-hidden="true">#</a> 预编译</h2><h3 id="全局预编译" tabindex="-1"><a class="header-anchor" href="#全局预编译" aria-hidden="true">#</a> 全局预编译</h3>',9),r=n("li",null,"创建全局上下文对象，window；",-1),d={href:"/js/let%20var.html",target:"_blank",rel:"noopener noreferrer"},v=n("li",null,"函数声明提前，函数会覆盖相同的变量名。",-1),m=n("li",null,"预编译结束，开始执行第一行代码。",-1),b=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//输出 function test() {};</span>
<span class="token keyword">var</span> test <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//输出 100;</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//输出 100;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数预编译" tabindex="-1"><a class="header-anchor" href="#函数预编译" aria-hidden="true">#</a> 函数预编译</h3><ol><li>创建函数上下文</li><li>找形参，变量声明，赋值 undefined</li><li>实参，形参相统一</li><li>函数声明，赋值函数体</li><li>从开始执行</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//1  输出 function b(){}</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2  输出 0</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//3  输出 function a(){}</span>
  <span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">test1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 1. 创建函数上下文</span>
<span class="token comment">// 2. 找形参和变量声明， a: undefined, b: undefined</span>
<span class="token comment">// 3. 带入实参，a: 1, b: undefined</span>
<span class="token comment">// 4. 函数声明，a: fn, b: fn</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>预编译函数，但是在 if 中，只会将函数名设为 undefined，但是函数不挂载函数，根声明变量表现一致。需要执行到 if 内部再定义函数!</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function-variable function">g</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;f&#39;</span><span class="token punctuation">,</span> f<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 全局的f，f(){return true}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;g&#39;</span><span class="token punctuation">,</span> g<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 函数内部提升的g，undefined，</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里f是赋值表达式，不是函数声明，不会提升。只是赋值给外部的f</span>
    <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 这里是函数声明g，会提升，但是在if 中，赋值为undefined。</span>
    <span class="token keyword">function</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果if内的语句执行了，g函数就初始化了，这里就是g函数了</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;g2&#39;</span><span class="token punctuation">,</span> g<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// g(){return true}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><ul><li>同名变量， 采用先声明的</li><li>同名函数， 采用后声明的</li><li>同名函数和变量， 采用函数</li></ul><h2 id="iife" tabindex="-1"><a class="header-anchor" href="#iife" aria-hidden="true">#</a> IIFE</h2><ol><li>IIFE 函数名</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> test <span class="token operator">=</span> <span class="token string">&#39;outer&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  test <span class="token operator">=</span> <span class="token string">&#39;inner&#39;</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 打印 function test</span>
<span class="token comment">// test 在IIFE作用域已经声明为函数，函数名称是只读的，不能被修改</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>IIFE 作用域</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token punctuation">(</span>y <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 相当于不加括号 var x = y = 1;</span>
  <span class="token comment">// y是全局的，x是iife内的</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> z<span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>z<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Uncaught ReferenceError: x is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>IIFE 内预编译/变量提升</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> friendName <span class="token operator">=</span> <span class="token string">&#39;World&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> friendName <span class="token operator">===</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> friendName <span class="token operator">=</span> <span class="token string">&#39;Jack&#39;</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Goodbye &#39;</span> <span class="token operator">+</span> friendName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello &#39;</span> <span class="token operator">+</span> friendName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// var friendName 被预编译到iife内，为undefined</span>
<span class="token comment">// Goodbye Jack</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="针对作用域优化" tabindex="-1"><a class="header-anchor" href="#针对作用域优化" aria-hidden="true">#</a> 针对作用域优化</h2><ul><li>不使用 with</li><li>减少作用域查找的深度，避免全局查找。</li></ul><p>避免全局查找</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">updateUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> imgs <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> imgs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    imgs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>document<span class="token punctuation">.</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> image </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> msg <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;msg&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  msg<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;Update complete.&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// document 会一致找到全局作用域，for中使用更是恐怖</span>

<span class="token keyword">function</span> <span class="token function">updateUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> doc <span class="token operator">=</span> document<span class="token punctuation">;</span> <span class="token comment">// document 保存在局部变量。</span>
  <span class="token keyword">let</span> imgs <span class="token operator">=</span> doc<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> imgs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    imgs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>doc<span class="token punctuation">.</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> image </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> msg <span class="token operator">=</span> doc<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;msg&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  msg<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;Update complete.&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19);function f(g,h){const t=e("ExternalLinkIcon");return o(),c("div",null,[k,n("ol",null,[r,n("li",null,[s("变量声明提前，var 变量赋值为 undefined，let 声明的不初始化（"),n("a",d,[s("let var 区别"),i(t)]),s("）")]),v,m]),b])}const w=p(u,[["render",f],["__file","上下文.html.vue"]]);export{w as default};
