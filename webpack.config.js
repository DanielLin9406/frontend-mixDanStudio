const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const entries = getEntry('./src/views/**/**.js');
module.exports = {
  // context: path.resolve(__dirname, './src'),
  // entry: entries,
  entry: {
    //app: './main.js',
    //Multiple files, bundled together
    vendor: './src/vendor',
    index:'./src/views/index/index',
    photowork: './src/views/photowork/photowork',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  // devServer:{
  //   contentBase: path.resolve(__dirname, './src'),
  // },
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
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common','vendor'],
      minChunks: 2
    }),
    ...getPlugins('./src/views/**/**.html'),
    new extractTextWebpackPlugin({
      filename: (getPath) =>{
        console.log(getPath('./css/[name].css'));
        return getPath('./css/[name].css').replace('./dist/./css','./css')
      },
      allChunks:true 
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    })    
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