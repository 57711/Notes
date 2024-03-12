#!/usr/bin/env sh

set -e
pnpm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:57711/Notes.git master:dist-pages

cd -