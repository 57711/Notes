import fs from 'fs';
import path from 'path';

let dir = fs.readdirSync(path.resolve('./docs/vue/'), {
  withFileTypes: true,
});
dir = dir
  .map((item) => `[${item.name.replaceAll(' ', '-')}](/vue/${item.name})`)
  .join('\n\n');
console.log(dir);
