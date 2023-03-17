import 'webpack-dev-server';
import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import mainConfig from './webpack.config';
import { DIST_BUILD, SRC_RENDERER, DIST_BUILD_NODE_MODULES } from './paths';

const devConfig: Configuration = {
  devtool: 'inline-source-map',
  mode: 'production',
  target: ['web', 'electron-renderer'],
  entry: [path.join(SRC_RENDERER, 'index.tsx')],
  output: {
    path: DIST_BUILD,
    publicPath: './',
    filename: 'renderer.js',
    library: {
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.s?(c|a)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1
            }
          },
          'sass-loader'
        ],
        include: /\.module\.s?(c|a)ss$/
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.s?(c|a)ss$/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }]
              },
              titleProp: true,
              ref: true
            }
          },
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      filename: path.join('index.html'),
      template: path.join(SRC_RENDERER, 'index.html'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      isBrowser: false,
      env: 'production',
      isDevelopment: false,
      nodeModules: DIST_BUILD_NODE_MODULES
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  }
};

module.exports = merge(mainConfig, devConfig);
