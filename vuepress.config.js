import { defineUserConfig, defaultTheme } from 'vuepress';
import { searchProPlugin } from 'vuepress-plugin-search-pro';
import Catalog from './plugins/appendCatalog';
import KaTeX from './plugins/katex';
import Homepage from './plugins/homepage';
import { generateSidebar } from './utils/index';
import path from 'path';

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'DevNote',
  description: "Paul's VuePress notes",
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    sidebar: generateSidebar(),
  }),
  alias: {
    '@': path.resolve(__dirname, './'),
  },
  plugins: [
    searchProPlugin({
      indexContent: true,
      queryHistoryCount: 0,
      autoSuggestions: false,
    }),
    KaTeX(),
    Homepage,
    Catalog,
  ],
});
