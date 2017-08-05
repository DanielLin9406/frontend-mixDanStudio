const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        // 'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
        index:'./src/views/index/index',
        photowork:'./src/views/photowork/photowork',
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
            },
            {
                test: /\.(svg| jpg |png)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[hash].[ext]'
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        ...getPlugins('./src/views/**/**.html'),
        new extractTextWebpackPlugin({
            filename: (getPath) => {
                return getPath('./css/[name].css').replace('./dist/./css', './css')
            },
            allChunks: true
        }),
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, './src'),
        port: 8080  //set reload port
    },
};

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