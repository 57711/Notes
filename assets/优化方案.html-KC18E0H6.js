import{_ as s,r as o,o as n,c,a as l,d as i,b as u,e}from"./app-7D7ZZLlA.js";const a={},r=l("h1",{id:"优化方案",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#优化方案","aria-hidden":"true"},"#"),i(" 优化方案")],-1),_=l("p",null,"优化第一步是确定指标。",-1),d=e("<li><p>业务优化，收益最大的功能先优化</p></li><li><p>结构优化 (编码之前)</p><ul><li>开发流程优化 <ul><li><strong>设计更重要</strong>，代码之前的优化，先设计并 review，设计包括 <ul><li>功能目标</li><li>需要的设计</li><li>需要的组件，逻辑关系</li><li>需要的数据接口</li></ul></li><li>代码注释，模块</li><li>结偶，避免代码过度集中</li><li>ts 看情况用，ui 层面慎用</li></ul></li><li>设计优化，ui 统一</li></ul></li>",2),h={href:"/frontend/%E4%BC%98%E5%8C%96.html",target:"_blank",rel:"noopener noreferrer"},p=e("<ul><li>加载， <ul><li>少请求，小体积 <ul><li>压缩合并文件，减少请求数 <ul><li>splitChunk 合并 css，js，</li><li>图片用 Data URI scheme，base64 直接嵌入 html/css <code>data:;base64,...</code></li><li>同域下的 js 下载合并，用逗号<code>&lt;sctipt src=&quot;//b.com/a.js,b.js&quot;&gt;</code></li></ul></li><li>CDN 静态服务器，加速静态资源</li></ul></li><li>多缓存 <ul><li>http2 <ul><li>缓存：http stream 中 push 进额外的 js，请求一个 html 会同时下载额外的 js，页面需要 js 时走缓存</li><li>nginx 配置开启 http2</li><li>tcp 浏览器连接个数限制，可以多域名</li></ul></li><li>DNS 缓存 浏览器，操作系统，局域网，ISP 都会有 DNS 缓存</li></ul></li><li>预加载 <ul><li>利用空闲时间加载.</li><li>新业务上线前预加载，使新业务有缓存。</li></ul></li><li>懒加载 <ul><li>DOM 和 js 可以先隐藏元素，或者用不会渲染的元素<code>&lt;script type=&quot;非脚本&quot;&gt;</code></li><li>图片可以懒加载，滚动事件</li></ul></li></ul></li></ul>",1);function m(f,j){const t=o("ExternalLinkIcon");return n(),c("div",null,[r,_,l("ul",null,[d,l("li",null,[l("p",null,[l("a",h,[i("技术优化"),u(t)]),i("(代码层面，前端性能瓶颈)")]),p])])])}const b=s(a,[["render",m],["__file","优化方案.html.vue"]]);export{b as default};
