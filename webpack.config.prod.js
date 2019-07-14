import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import commonConfig from './webpack.config.common';
import RepalceImagePath from './webpack.plugin';
import { paths } from './webpack.const';

const publicConfig = {
  mode: 'production',
  entry: {
    index: './src/views/index/index.js',
    photowork: './src/views/photowork/photowork.js'
  },
  output: {
    path: paths.buildDir,
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
    library: 'globalObject'
  },
  optimization: {
    minimizer: [new UglifyJSPlugin(), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: {
      name: entrypoint => `manifest.${entrypoint.name}`
    }
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules\/[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //       priority: -1
    //     }
    //   }
    // }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
              localIdentName: '[local]-[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(['build']),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[name].[hash].css',
      allChunks: false
    }),
    new WebpackAssetsManifest(),
    new RepalceImagePath()
  ]
};

export default merge(commonConfig, publicConfig);
