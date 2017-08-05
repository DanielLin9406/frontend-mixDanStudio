混丹工作室 Native JS ES6化 
---

工具：Npm + Babel + Wepack + SASS + Flexbox + CSS3 + ES6 + Art-template


Run Server
---
 
```
npm run dev
(webpack-dev-server --devtool eval --progress --colors --inline --hot --content-base dist/ --config webpack.config.dev.js)
-> http://localhost:8080/webpack-dev-server/(pageName)
```

Pack, Watch and Uglify
---
 
```
npm run build
(webpack --watch)
```