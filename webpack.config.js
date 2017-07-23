const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

// webpack插件 按照指定模版生成html文件
// https://github.com/jantimon/html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin');
// webpack插件 将css文件单独打包到css文件，而不是写在js文件中（因为webpack将一切都视为模块，所以默认会打包到js文件中）
// https://github.com/webpack-contrib/extract-text-webpack-plugin
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

//获取入口js
const entries = getEntry('./src/views/**/**.js');
module.exports = {
  // context: path.resolve(__dirname, './src'),
  entry: entries,
  // entry: {
    // app: './main.js',
    // Multiple files, bundled together
    // app:['./home.js','./events.js','./vendor.js'],
  // },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
  devServer:{
    contentBase: path.resolve(__dirname, './src'),
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
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },      
    ],
    // rules: [
    //   {
    //     test: /\.css$/,
    //     use: ['style-loader', 'css-loader'],
    //   },
    //   {
    //     test: /\.(sass|scss)$/,
    //     use: [
    //       'style-loader',
    //       'css-loader',
    //       'sass-loader',
    //     ]
    //   },
    //   // Loaders for other file types can go here
    // ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'js/commons.js',
      minChunks: 2,
    }),
    ...getPlugins('./src/views/**/**.html'),
    new extractTextWebpackPlugin('./css/[name].css')
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