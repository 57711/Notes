import fs from "fs";
import path from "path";

function generateNav(parentPath) {
  let dirs = fs.readdirSync(`./docs/${parentPath}`, { encoding: "utf8" });
  return dirs
    .filter((item) => item.endsWith(".md"))
    .map((item) => `/${parentPath}/${item}`);
}

export function getDirectory(rootPath) {
  let dir = fs.readdirSync(path.resolve(rootPath), { withFileTypes: true });
  return dir.filter((item) => item.isDirectory() && !item.name.startsWith("."));
}

export function generateSidebar() {
  const allDirectory = getDirectory("docs");
  const sidebar = {};
  allDirectory.forEach((direct) => {
    sidebar[`/${direct.name}`] = [
      {
        text: direct.name,
        children: generateNav(direct.name),
      },
    ];
  });
  return sidebar;
}
