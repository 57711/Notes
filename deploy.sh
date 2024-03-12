#!/usr/bin/env sh

set -e

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git config --global user.email "imsbt@outlook.com"
git config --global user.name "paul"

git push -f git@github.com:57711/Notes.git master:dist-pages

cd -