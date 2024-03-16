import { createPage } from '@vuepress/core';
import { getDirectory } from '../utils';

export default {
  name: 'vuepress-plugin-default-homepage',
  // 初始化之后，所有的页面已经加载完毕
  async onInitialized(app) {
    // 如果主页不存在
    if (app.pages.every((page) => page.path !== '/')) {
      const allDirectory = getDirectory(app.options.source);
      // 创建一个主页
      let content = allDirectory
        .map((item) => {
          let name = item.name;
          name = name.charAt(0).toUpperCase() + name.slice(1);
          return `[${name}](./${item.name})`;
        })
        .join('\n\n');
      const homepage = await createPage(app, {
        path: '/',
        Key: '主页',
        // 设置 frontmatter
        frontmatter: {
          layout: 'Layout',
        },
        // 设置 markdown 内容
        content: `# Welcome ${app.options.title}\n\n${content}`,
      });
      // 把它添加到 `app.pages`
      app.pages.push(homepage);
    }
  },
};
