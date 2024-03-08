import mk from '@aquabx/markdown-it-katex';

export default () => ({
  name: 'vuepress-plugin-katex',
  extendsMarkdown: (md) => {
    console.log('extendsMarkdown');
    md.use(mk);
  },
  onInitialized(app) {
    app.options.head.push([
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css',
      },
    ]);
  },
});
