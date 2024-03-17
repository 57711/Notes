import{_ as e,o as d,c as n,e as i}from"./app-7D7ZZLlA.js";const t={},a=i(`<h1 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h1><h2 id="rail模型衡量前端性能" tabindex="-1"><a class="header-anchor" href="#rail模型衡量前端性能" aria-hidden="true">#</a> RAIL模型衡量前端性能</h2><table><thead><tr><th>RAIL</th><th>指标</th><th>操作</th></tr></thead><tbody><tr><td>response</td><td>&lt;100ms</td><td>用户事件</td></tr><tr><td>animation</td><td>&lt;16ms</td><td>动画/页面滚动</td></tr><tr><td>idle</td><td>&lt;50ms</td><td>保证主线程足够处理下一个用户事件</td></tr><tr><td>load</td><td>1s</td><td>页面加载</td></tr></tbody></table><h2 id="缓存" tabindex="-1"><a class="header-anchor" href="#缓存" aria-hidden="true">#</a> 缓存</h2><p>nginx 缓存 redis 缓存</p><h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h2><p>动静分离，nginx 做静态资源，nginx 反响代理，负载均衡做动态数据</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># 负载均衡，上位服务器
upstream node.com {
    server 127.0.0.1: 3000
    server 127.0.0.1: 3001
}
server {
    #静态资源
    root /root/static/

    location ~ /dynamic/path/(\\d*) {
        proxy_pass http://node.com/detail?id=$1
        proxy_cache #缓存反向代理
    }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r=[a];function s(l,c){return d(),n("div",null,r)}const h=e(t,[["render",s],["__file","优化.html.vue"]]);export{h as default};
