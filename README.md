混丹工作室 Native JS ES6化 
---

工具：Npm + Babel + Wepack + Pug + SASS + Flexbox + CSS3 + ES6


Run Server and Development
---
 
```
npm start
(webpack-dev-server --hot --devtool eval-source-map)
-> http://localhost:8080/webpack-dev-server/(pageName)
```

Pack, Uglify and Production
---
 
```
npm run build
(cross-env NODE_ENV=production webpack -p --progress)
```