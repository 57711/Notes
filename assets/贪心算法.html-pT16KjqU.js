import{_ as u,r as e,o as g,c as f,a as n,d as t,b as s,w as a,e as c}from"./app-7D7ZZLlA.js";const x={},y=c('<h1 id="greedy" tabindex="-1"><a class="header-anchor" href="#greedy" aria-hidden="true">#</a> Greedy</h1><p>作出<strong>当前</strong>看来最好的选择</p><p>简单地说，问题能够分解成<strong>子问题</strong>来解决，<strong>子问题的最优解能递推到最终问题的最优解</strong>。这种子问题最优解成为最优子结构。</p><p>贪心算法与动态规划的不同在于它对每个子问题的解决方案都做出选择，<strong>不能回退</strong>。动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退功能。</p><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>',5),w={href:"https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"最多持有1股， 每天可以买卖无数次，贪心最好（仅针对这个条件）",-1),N=n("strong",null,"解1",-1),b={class:"katex"},v={class:"katex-mathml"},M=c('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0913em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8413em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">N</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span>',1),O=n("strong",null,"解2",-1),L={class:"katex"},V={class:"katex-mathml"},z=c('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mclose">)</span></span></span>',1),B=n("strong",null,"解2",-1),E={class:"katex"},C={class:"katex-mathml"},D=c('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mclose">)</span></span></span>',1);function G(I,S){const _=e("ExternalLinkIcon"),l=e("mi"),o=e("mo"),h=e("mn"),d=e("msup"),p=e("mrow"),r=e("annotation"),m=e("semantics"),i=e("math");return g(),f("div",null,[y,n("ul",null,[n("li",null,[n("a",w,[t("股票持股"),s(_)])])]),k,n("p",null,[N,t("： DFS， 相当于所有的情况遍历一遍。"),n("span",b,[n("span",v,[s(i,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(m,null,{default:a(()=>[s(p,null,{default:a(()=>[s(l,null,{default:a(()=>[t("O")]),_:1}),s(o,{stretchy:"false"},{default:a(()=>[t("(")]),_:1}),s(d,null,{default:a(()=>[s(h,null,{default:a(()=>[t("2")]),_:1}),s(l,null,{default:a(()=>[t("N")]),_:1})]),_:1}),s(o,{stretchy:"false"},{default:a(()=>[t(")")]),_:1})]),_:1}),s(r,{encoding:"application/x-tex"},{default:a(()=>[t("O(2^N)")]),_:1})]),_:1})]),_:1})]),M])]),n("p",null,[O,t("：Greedy, "),n("span",L,[n("span",V,[s(i,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(m,null,{default:a(()=>[s(p,null,{default:a(()=>[s(l,null,{default:a(()=>[t("O")]),_:1}),s(o,{stretchy:"false"},{default:a(()=>[t("(")]),_:1}),s(l,null,{default:a(()=>[t("N")]),_:1}),s(o,{stretchy:"false"},{default:a(()=>[t(")")]),_:1})]),_:1}),s(r,{encoding:"application/x-tex"},{default:a(()=>[t("O(N)")]),_:1})]),_:1})]),_:1})]),z])]),n("p",null,[B,t("：DP, 更通用 "),n("span",E,[n("span",C,[s(i,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(m,null,{default:a(()=>[s(p,null,{default:a(()=>[s(l,null,{default:a(()=>[t("O")]),_:1}),s(o,{stretchy:"false"},{default:a(()=>[t("(")]),_:1}),s(l,null,{default:a(()=>[t("N")]),_:1}),s(o,{stretchy:"false"},{default:a(()=>[t(")")]),_:1})]),_:1}),s(r,{encoding:"application/x-tex"},{default:a(()=>[t("O(N)")]),_:1})]),_:1})]),_:1})]),D])])])}const P=u(x,[["render",G],["__file","贪心算法.html.vue"]]);export{P as default};
