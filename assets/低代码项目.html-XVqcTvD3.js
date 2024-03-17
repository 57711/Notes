import{_ as i,o as l,c as a,e}from"./app-7D7ZZLlA.js";const r={},h=e('<h1 id="低代码" tabindex="-1"><a class="header-anchor" href="#低代码" aria-hidden="true">#</a> 低代码</h1><h2 id="选型" tabindex="-1"><a class="header-anchor" href="#选型" aria-hidden="true">#</a> 选型</h2><ol><li>渲染器 dom（iframe）， canvas 选择</li></ol><p>dom</p><ul><li>pros <ul><li>如果最终渲染成 html，可以真实呈现，</li><li>页面调优 debug</li><li>处理事件容易。</li></ul></li><li>cons <ul><li>屏幕尺寸兼容性需要处理。</li><li>浏览器渲染慢</li></ul></li></ul><p>canvas</p><ul><li>props <ul><li>可以<strong>统一缩放</strong>，能实现微调，</li><li>可以进行<strong>图形操作</strong>，</li><li>画幅稳定</li></ul></li><li>cons <ul><li>事件处理麻烦一点，需要转换</li></ul></li></ul><p>融合 dom 和 canvas</p><ul><li>渲染器 canvas，产出 dom，缺点就是编辑时和产出会不一致（dom 样式和 canvas），增加开发。导出 html 可以作为其中一个功能。</li><li>渲染器 canvas，产出 svg，svg 本身也是 dom 结构。</li></ul><ol start="2"><li>利用 dom 方案，CSS 隔离方案选择</li></ol><ul><li>用内联样式，</li><li>用 iframe（样式隔离，数据隔离，可以跨域），</li><li>独立哈希名（需要编译时处理）。</li></ul><ol start="3"><li>利用现有前端框架</li></ol><p>vue 有模版语法，渲染 dom 更方便。</p><h2 id="整体运行结构与架构设计" tabindex="-1"><a class="header-anchor" href="#整体运行结构与架构设计" aria-hidden="true">#</a> 整体运行结构与架构设计</h2><ol><li>基础数据概念：datasource dataview dimensions metrics columns</li><li>基础分片概念：组件、模版、模块、事件、网络</li><li>基础数据源配置设置</li><li>低代码系统整体架构设计：数据源配置 + 物料仓库搭建 + 渲染引擎设计 + 配置面板搭建</li><li>统一协议串联</li></ol><h2 id="渲染引擎设计" tabindex="-1"><a class="header-anchor" href="#渲染引擎设计" aria-hidden="true">#</a> 渲染引擎设计</h2><ol><li>渲染引擎框架设计</li><li>渲染引擎模块分类：网络 + 数据 + 结构 + 组件加载</li><li>渲染引擎实现</li></ol><h3 id="编辑器渲染" tabindex="-1"><a class="header-anchor" href="#编辑器渲染" aria-hidden="true">#</a> 编辑器渲染</h3><h3 id="组件渲染" tabindex="-1"><a class="header-anchor" href="#组件渲染" aria-hidden="true">#</a> 组件渲染</h3><h2 id="组件组装与数据导入" tabindex="-1"><a class="header-anchor" href="#组件组装与数据导入" aria-hidden="true">#</a> 组件组装与数据导入</h2><h3 id="组件物料仓库设计" tabindex="-1"><a class="header-anchor" href="#组件物料仓库设计" aria-hidden="true">#</a> 组件物料仓库设计</h3><ol><li>解耦组件加载和搭建</li><li>组件仓库物料堆设计</li><li>组件接口设计与暴露</li></ol><h3 id="加载数据源配置" tabindex="-1"><a class="header-anchor" href="#加载数据源配置" aria-hidden="true">#</a> 加载数据源配置</h3><ol><li>数据源配置开发</li><li>数据源加载 + 页面传参 + 计算变量</li><li>数据协议以及导入</li></ol><h2 id="配置面板" tabindex="-1"><a class="header-anchor" href="#配置面板" aria-hidden="true">#</a> 配置面板</h2><h3 id="拖拽布局系统-画布" tabindex="-1"><a class="header-anchor" href="#拖拽布局系统-画布" aria-hidden="true">#</a> 拖拽布局系统 画布</h3><ol><li>拖拽布局与内容提取</li><li>拖拽布局模式设计</li><li>实现多层级数据流 &amp; 逻辑流画布</li></ol><h3 id="组件配置-配置面板" tabindex="-1"><a class="header-anchor" href="#组件配置-配置面板" aria-hidden="true">#</a> 组件配置 配置面板</h3><ol><li>基于 json-schema 驱动的模式配置</li><li>用“配置”来“配置”“配置系统”</li><li>微内核架构中的“双内核”实现</li></ol>',29),d=[h];function o(n,s){return l(),a("div",null,d)}const c=i(r,[["render",o],["__file","低代码项目.html.vue"]]);export{c as default};
