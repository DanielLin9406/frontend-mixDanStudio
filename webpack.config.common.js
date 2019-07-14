import 'dotenv/config';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import stringify from 'stringify-object-values';

import glob from 'glob';
import path from 'path';
import { paths } from './webpack.const';
import env from './webpack.env';

function getPlugins(globPath) {
  let pathName = glob.sync(globPath);
  let arrOption = [];
  let option = {};

  pathName.map(val => {
    option = {
      template: val,
      filename: path.basename(val).replace('.pug', '.html'),
      chunks: [path.basename(val, '.pug')]
    };
    arrOption.push(new htmlWebpackPlugin(option));
  });

  return arrOption;
}

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.art$/,
        use: [
          {
            loader: 'art-template-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|JPG)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'static/assets/images',
              publicPath: 'static/assets/images'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|ttc)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[name].[ext]',
              outputPath: 'static/assets/fonts',
              publicPath: 'static/assets/fonts'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/assets/svg',
            publicPath: 'static/assets/svg'
          }
        }
      }
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   MO: 'moment',
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    new webpack.DefinePlugin(stringify(env.variables)),
    new webpack.HashedModuleIdsPlugin(),
    ...getPlugins('./src/views/**/**.pug')
  ],
  resolve: {
    alias: {
      '@app/api': paths.apiDir,
      '@app/const': paths.constDir,
      '@app/layout': paths.layoutDir,
      '@app/image': paths.imageDir,
      '@app/components': paths.componentsDir,
      '@app/pages': paths.pagesDir,
      '@app/shared': paths.sharedDir,
      '@app/modules': paths.modulesDir
    }
  }
};
export default commonConfig;
