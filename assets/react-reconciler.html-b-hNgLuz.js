import{_ as l,r as c,o as n,c as a,a as e,d as o,b as r,e as i}from"./app-7D7ZZLlA.js";const d={},s=e("h1",{id:"自定义-react-renderer",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#自定义-react-renderer","aria-hidden":"true"},"#"),o(" 自定义 react renderer")],-1),p=e("p",null,"在 completeWork，commitWork 阶段，可以自定义 createInstance 等 hostConfig。利用 react-reconciler 库",-1),u={href:"https://agent-hunt.medium.com/hello-world-custom-react-renderer-9a95b7cd04bc",target:"_blank",rel:"noopener noreferrer"},h=i('<p><code>reactReconciler(hostConfig)</code>, hostConfig 对象包含以下方法</p><ul><li><p>complete 阶段</p><ul><li>在 mount/update 的情况下，调用 <code>createInstance</code> 生成宿主对象</li><li>在 mount/update 的情况下，调用 <code>createTextInstance</code> 生成文本节点</li></ul></li><li><p>complete 阶段完成时：</p><ul><li>在 mount 的情况下，调用 <code>finalizeInitialChildren</code> 处理 props 的属性;</li><li>在 update 的情况下，调用 <code>prepareUpdate</code> 处理更新的 props 属性，生成 effectList;</li></ul></li><li><p>Mutation 阶段</p><ul><li><p>Placement:</p><ul><li>如果是 hostRoot(根节点)，会调用<code>appendChildToContainer</code></li><li>如果是 hostComponent(宿主节点)，会调用<code>appendChild</code></li></ul></li><li><p>Update:</p><ul><li>如果是 element 节点 <code>commitUpdate</code></li><li>如果是文本节点<code>commitTextUpdate</code></li></ul></li><li><p>Deletion:</p><ul><li>如果是 hostRoot(根节点)，会调用<code>removeChildFromContainer</code></li><li>如果是 hostComponent(宿主节点)，会调用<code>removeChild</code></li></ul></li></ul></li></ul><h2 id="vue-中" tabindex="-1"><a class="header-anchor" href="#vue-中" aria-hidden="true">#</a> vue 中</h2>',3),m=e("code",null,"@vue/runtime-core",-1),_=e("code",null,"createRenderer",-1),f={href:"https://www.cnblogs.com/soonK/p/14590869.html",target:"_blank",rel:"noopener noreferrer"},C={href:"https://vuejs-course.com/blog/a-custom-renderer-for-vue-3",target:"_blank",rel:"noopener noreferrer"};function v(b,x){const t=c("ExternalLinkIcon");return n(),a("div",null,[s,p,e("p",null,[e("a",u,[o("Hello World Custom React Renderer"),r(t)])]),h,e("p",null,[o("vue 中使用"),m,o(" 中的 "),_,o(" 方法 "),e("a",f,[o("vue3 自定义渲染-实现 canvas"),r(t)]),e("a",C,[o("A Custom Renderer for Vue 3"),r(t)])])])}const k=l(d,[["render",v],["__file","react-reconciler.html.vue"]]);export{k as default};
