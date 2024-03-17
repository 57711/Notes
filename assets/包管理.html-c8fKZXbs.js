import{_ as e,o as a,c as i,e as n}from"./app-7D7ZZLlA.js";const o="/Notes/images/硬连接.png",s="/Notes/images/软连接.png",r="/Notes/images/pnpm结构.png",p="/Notes/images/pnpm非扁平化.png",t="/Notes/images/pnpm实际目录.png",l="/Notes/images/npm实际目录.png",d={},c=n('<h1 id="包管理" tabindex="-1"><a class="header-anchor" href="#包管理" aria-hidden="true">#</a> 包管理</h1><h2 id="硬连接-软连接" tabindex="-1"><a class="header-anchor" href="#硬连接-软连接" aria-hidden="true">#</a> 硬连接 &amp; 软连接</h2><p>文件就是指针， 指向外部存储地址</p><h3 id="硬连接" tabindex="-1"><a class="header-anchor" href="#硬连接" aria-hidden="true">#</a> 硬连接</h3><p>不会产生额外的磁盘占用，并且，两个文件都能找到相同的磁盘内容。</p><p><img src="'+o+'" alt="硬连接"></p><h3 id="软连接-符号连接" tabindex="-1"><a class="header-anchor" href="#软连接-符号连接" aria-hidden="true">#</a> 软连接/符号连接</h3><p>b 软连接指向 a，a 指向外部存储</p><p><img src="'+s+'" alt="软连接"></p><h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h3><ul><li>硬链接仅能链接文件，而符号链接可以链接目录</li><li>硬链接是一个实实在在的文件，node 不对其做任何特殊处理，也无法区别对待，实际上，node 根本无从知晓该文件是不是一个硬链接</li><li>硬链接在链接完成后仅和文件内容关联，和之前链接的文件没有任何关系。而符号链接始终和之前链接的文件关联，和文件内容不直接相关。</li><li>符号链接指向的是另一个文件或目录，当 node 执行符号链接下的 JS 文件时，会使用原始路径</li></ul><h2 id="pnpm" tabindex="-1"><a class="header-anchor" href="#pnpm" aria-hidden="true">#</a> pnpm</h2><p>pnpm 使用硬连接和软连接,非扁平化，处理流程</p><ol><li>通过 package.json<strong>查询依赖关系</strong>，得到最终要安装的包：a 和 b <ul><li>已经解析的标记，未解析的查找 lockfile 或者 registry， 获取版本信息</li></ul></li><li>在工程 proj 根目录中查看 a 和 b 是否已经有缓存，如果没有，下载到缓存中，如果有，则进入下一步</li><li>在 proj 中创建 node_modules 目录，并对目录进行结构初始化 <ol><li>代码目录中用<strong>硬连接</strong>放入源码</li><li>每个代码直接依赖用<strong>软连接</strong>放入代码目录</li><li>间接依赖的包用<strong>软连接</strong>放入<code>.pnpm/node_modules</code></li><li>工程的<code>proj/node_modules</code>中用<strong>软连接</strong>放置项目直接依赖</li></ol></li></ol><p><img src="'+r+'" alt="pnpm结构"></p><p><img src="'+p+'" alt="pnpm非扁平化"></p><h2 id="npm" tabindex="-1"><a class="header-anchor" href="#npm" aria-hidden="true">#</a> npm</h2><p>扁平化，npm 安装 axios 的时候,axios 的依赖会放在和 axios 同一级，但是项目中也能直接去应用 axios 的依赖包，造成幽灵依赖。</p><p><img src="'+t+'" alt="pnpm实际目录"> <img src="'+l+'" alt="npm实际目录"></p>',19),h=[c];function m(_,g){return a(),i("div",null,h)}const f=e(d,[["render",m],["__file","包管理.html.vue"]]);export{f as default};
