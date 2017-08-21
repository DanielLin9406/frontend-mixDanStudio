const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';

const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const commonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const cleanWebpackPlugin = require('clean-webpack-plugin'); //清除dist資料夾
const uglifyJSPlugin = require('uglifyjs-webpack-plugin'); //去空白行最小化
// const browserSyncPlugin = require('browser-sync-webpack-plugin'); //瀏覽器同步更新 webpack --watch
// const manifestPlugin = require('webpack-manifest-plugin'); //hash code
const entries = getEntry('./src/views/**/**.js');

module.exports = {
  entry: entries,
  // entry: {
  //   index:'./src/views/index/index',
  //   photowork: './src/views/photowork/photowork',
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name]-[chunkhash].js',
    publicPath:DEV_MODE?'http://localhost:8080/':'',
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
              pretty:DEV_MODE,
            },
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.art$/,
        use:[
          {
            loader: "art-template-loader",
            options: {
              // art-template options (if necessary)
              // @see https://github.com/aui/art-template
            }            
          },
        ],
        exclude: /node_modules/,
      },
      { 
        test: /\.(svg|jpg|png|gif|ico)$/,
        use:[
          {
            loader: "url-loader",
            options:{
              limit:2048, //小於2048的圖檔，自動變成base64字串
              name:'./asset/[name].[hash].[ext]'
            } 
          }
        ] 
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
    ...getPlugins('./src/views/**/**.html'),
    new commonsChunkPlugin({
      names: "commons",
      filename:"./js/commons-[chunkhash].js", 
      minChunks: 0,
    }),
    new extractTextWebpackPlugin({
      filename: (getPath) =>{
        return getPath('./css/[name]-[contenthash].css').replace('./dist/./css','./css')
      },
      allChunks:true 
    }),
    // new manifestPlugin({
    //   fileName: 'hashMapping.json',
    //   manifestVariable: "webpackManifest",
    //   inlineManifest: true
    // }),
    new cleanWebpackPlugin(['dist']),
    new uglifyJSPlugin(),
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
  // console.log(pathName)  --->   [ './src/views/index/index.js', './src/views/login/login.js' ]
  let temp, entries = {}
  pathName.map(val => {
    // temp = val.split('/').splice(-3)
    temp = path.basename(val, '.js')   // ---> index   login
    entries[temp] = val
  })
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