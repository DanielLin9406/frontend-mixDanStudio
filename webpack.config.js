const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const fileSystem = require("fs");
const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';

const commonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const providePlugin = require('webpack/lib/ProvidePlugin'); //vendor alias
const definePlugin = require('webpack/lib/DefinePlugin'); //自定義變數
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin'); //清除dist資料夾
const uglifyJSPlugin = require('uglifyjs-webpack-plugin'); //去空白行最小化
// const browserSyncPlugin = require('browser-sync-webpack-plugin'); //瀏覽器同步更新 webpack --watch
// const manifestPlugin = require('webpack-manifest-plugin'); //hash code
// const entries = getEntry('./src/views/**/**.js');

module.exports = {
  entry: {
    vendor:['moment'],
    index:'./src/views/index/index.js',
    photowork:'./src/views/photowork/photowork.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: DEV_MODE ? './js/[name].js' :'./js/[name]-[chunkhash].js',
    publicPath:DEV_MODE?'http://localhost:8080/':'',
  },
  resolve:{
    extensions:[".js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use:{
          loader:'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader:'css-loader',
            options:{
              sourceMap:true
            },
          },
          {
            loader:'sass-loader',
            options:{
              sourceMap:true
            },
          }],
        }),
        exclude: /node_modules/,
      },
      {
        test:/\.pug$/,
        use:[{
            loader:'html-loader',
          },
          {
            loader:'pug-html-loader',
            options:{
              pretty:true,
            },
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.art$/,
        use:[
          {
            loader: "art-template-loader"          
          },
        ],
        exclude: /node_modules/,
      },
      {
        test:/\.html$/,
        use:[
          // {
          //   loader:"file-loader",
          //   options:{name:'[name].[ext]'}
          // },
          // {
          //   loader:"extract-loader"
          // },
          {
            loader:"html-loader"
          }
        ]
      },
      { 
        test: /\.(svg|jpg|png|gif|ico)$/,
        use:[
          {
            loader: "url-loader", //or file-loader
            options:{
              limit:2048, //小於2048的圖檔，自動變成base64字串
              name:"./asset/[name].[ext]"
            } 
          }
        ],
        include:path.resolve('src/assets') 
      },
      {
        test: /\.json$/,
        use:[
          {
            loader: 'json-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    ...getPlugins('./src/views/**/**.pug'),
    new commonsChunkPlugin({
      // 第三方套件 vendor
      // 共用模組 common
      names: ["common","vendor"],
      chunks: ['common', 'index', 'photowork'],
      minChunks: 2,
    }),
    new extractTextWebpackPlugin({
      //產生css:
      // 1. extract-loader
      // 2. extract-text-webpack-plugin
      //多入口文件 require 多少隻scss就產生多少隻css 
      filename: (getPath) =>{
        return getPath('./css/[name]-[contenthash].css').replace('./dist/./css','./css')
      },
      allChunks:true 
    }),
    new providePlugin({
      MO:'moment'
    }),
    new definePlugin({
      WEB_URL:JSON.stringify(DEV_MODE?'http://localhost':'http://data.com')
    }),
    // new manifestPlugin({
    //   fileName: 'hashMapping.json',
    //   manifestVariable: "webpackManifest",
    //   inlineManifest: true
    // }),
    new cleanWebpackPlugin(['dist']),
    // new uglifyJSPlugin(),
    function () {
      this.plugin("done", function (statsData) {
        var stats = statsData.toJson();
        if (!stats.errors.length) {
          let globPath = './src/views/**/**.pug';
          let htmlFileArr = glob.sync(globPath);
          htmlFileArr.forEach(function(htmlFileFullPath) {
            let htmlPathFileName = path.join(__dirname, 'dist', htmlFileFullPath.split("/").pop().replace('.pug', '.html'));
            let html = fileSystem.readFileSync(htmlPathFileName, "utf8");
            let htmlOutput = html.replace(
              /<script\s+src=\.\/js\/vendor\.js/i,
              "<script type='text/javascript' src=" + stats.assetsByChunkName.vendor).replace(
              /<script\s+src=\.\/js\/common\.js/i,
              "<script type='text/javascript' src=" + stats.assetsByChunkName.common);         
              fileSystem.writeFileSync(htmlPathFileName,htmlOutput);
          }, this);
        }
      });
    },
  ],
  devServer:{
    hot: true,
    contentBase: path.resolve(__dirname, './src'),
    port: 8080, //set reload port
    stats:{
      chunks:false
    }
  }
};

/**
 * 获取入口的函数
 */
function getEntry(globPath) {
  let pathName = glob.sync(globPath)
  let temp = {}
  let entries = [];
  console.log(pathName) // --->   [ './src/views/index/index.js', './src/views/login/login.js' ]
  pathName.map(val => {
    // temp = val.split('/').splice(-3)
    temp = path.basename(val, '.js')   // ---> index   login
    entries[temp] = val;
  })
  console.log(entries);
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
      filename: path.basename(val).replace('.pug', '.html'), // index.html
      chunks: [path.basename(val, '.pug')]
      //特别需要注意的是chunks是一个数组
    }
    arrOption.push(new htmlWebpackPlugin(option))
  })
  
  return arrOption
}