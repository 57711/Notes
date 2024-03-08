import { getDirectory, generateNav } from '../utils';

export default (app) => {
  const allDirectory = getDirectory(app.options.source);
  const catalogMap = {};

  allDirectory.forEach((direct) => {
    catalogMap[direct.name] = generateNav(direct.name)
      .map((filename) => {
        return `[${filename}](/${direct.name}/${filename.replaceAll(
          ' ',
          '%20'
        )})`;
      })
      .join('\n\n');
  });
  return {
    name: 'vuepress-plugin-catalog',
    extendsMarkdown: (md) => {
      const render = md.render;
      md.render = (...args) => {
        const filename = args[1].filePathRelative || '';
        if (filename.endsWith('/index.md')) {
          args[0] += catalogMap[filename.split('/')[0]];
        }
        return render.call(md, ...args);
      };
    },
  };
};
