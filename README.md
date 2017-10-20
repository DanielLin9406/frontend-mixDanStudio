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

```
切版順序
先切PC再網手機切 media使用min-width調整 當開始進行手機版時 只需更改在手機上需要調整的css屬性
並將相同的PC屬性設定值 保留至media query pc的範圍內，如此一來便可以確保pc設置在大螢幕時 會覆寫手機
