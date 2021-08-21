npm run build

cd dist
git init
git remote add origin https://github.com/ymssx/chat-static.git
git add .
git commit -m 'build'
git push -f origin master