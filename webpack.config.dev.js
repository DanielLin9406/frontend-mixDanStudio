import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import commonConfig from './webpack.config.common';

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/views/index/index.js',
    photowork: './src/views/photowork/photowork.js'
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    library: 'globalObject'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          // { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  optimization: {
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
  plugins: [new BundleAnalyzerPlugin()],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true
  }
};

export default merge(commonConfig, devConfig);
