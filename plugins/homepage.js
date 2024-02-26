import { createPage } from '@vuepress/core';
import { getDirectory } from '../utils';

export default {
  name: 'vuepress-plugin-default-homepage',
  // 初始化之后，所有的页面已经加载完毕
  async onInitialized(app) {
    const allDirectory = getDirectory(app.options.source);
    console.log(allDirectory);
    let content = '';
    allDirectory.forEach((item) => {
      content += `[${item.name}](./${item.name})\n\n`;
    });

    // 如果主页不存在
    if (app.pages.every((page) => page.path !== '/')) {
      // 创建一个主页
      const homepage = await createPage(app, {
        path: '/',
        Key: '主页',
        // 设置 frontmatter
        frontmatter: {
          layout: 'Layout',
        },
        // 设置 markdown 内容
        content: `\
# 欢迎来到 ${app.options.title}

${content}
`,
      });
      // 把它添加到 `app.pages`
      app.pages.push(homepage);
    }
  },
};
