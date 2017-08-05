const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const browserSyncPlugin = require('browser-sync-webpack-plugin'); //瀏覽器同步更新 webpack --watch
const cleanWebpackPlugin = require('clean-webpack-plugin'); //清除dist資料夾
const uglifyJSPlugin = require('uglifyjs-webpack-plugin'); //去空白行最小化
// const manifestPlugin = require('webpack-manifest-plugin'); //hash code
// const webpackChunkHash = require("webpack-chunk-hash"); 
// const entries = getEntry('./src/views/**/**.js');

module.exports = {
  // context: path.resolve(__dirname, './src'),
  // entry: entries,
  entry: {
    //app: './main.js',
    vendor: './src/vendor.js',
    index:'./src/views/index/index',
    photowork: './src/views/photowork/photowork',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      // 提取sass less 或者 stylus  通过extractTextWebpackPlugin来提取
      // https://github.com/webpack-contrib/extract-text-webpack-plugin#extracting-sass-or-less
      {
        test: /\.(sass|scss)$/,
        use: extractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.art$/,
        loader: "art-template-loader",
        options: {
          // art-template options (if necessary)
          // @see https://github.com/aui/art-template
        }
      },
      { 
        test: /\.(svg| jpg |png)$/, 
        loader: "file-loader",
        options:{
          name:'[name].[hash].[ext]'
        } 
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'], // vendor libs + extracted manifest
      minChunks: Infinity
    }),
    ...getPlugins('./src/views/**/**.html'),
    new extractTextWebpackPlugin({
      filename: (getPath) =>{
        return getPath('./css/[name].css').replace('./dist/./css','./css')
      },
      allChunks:true 
    }),
    new browserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
    // new webpackChunkHash(),
    // new manifestPlugin({
    //   fileName: 'hashMapping.json',
    //   manifestVariable: "webpackManifest",
    //   inlineManifest: true
    // }),
    new cleanWebpackPlugin(['dist']),
    new uglifyJSPlugin(),
  ],
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
};

/**
 * 获取入口的函数
 */
function getEntry(globPath) {
  let pathName = glob.sync(globPath)
  // console.log(pathName)  --->   [ './src/views/index/index.js', './src/views/login/login.js' ]
  let temp, entries = {}
  pathName.map(val => {
    // temp = val.split('/').splice(-3)
    // console.log(temp)
    temp = path.basename(val, '.js')   // ---> index   login
    entries[temp] = val
  })
  // console.log(entries)
  return entries
}

/**
 * 配置plugins
 */
function getPlugins(globPath) {
  let pathName = glob.sync(globPath);

  let arrOption = []
  let option = {}
  pathName.map(val => {
    option = {
      template: val,
      filename: path.basename(val),
      chunks: [path.basename(val, '.html')]
      //特别需要注意的是chunks是一个数组
    }
    arrOption.push(new htmlWebpackPlugin(option))
  })
  
  return arrOption
}