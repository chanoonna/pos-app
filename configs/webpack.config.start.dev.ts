import 'webpack-dev-server';
import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { spawn } from 'child_process';
import { merge } from 'webpack-merge';
import mainConfig from './webpack.config';
import { DIST_BUILD, SRC_RENDERER, DIST_BUILD_NODE_MODULES } from './paths';

const PORT = process.env.PORT || 8080;

const devConfig: Configuration = {
  devtool: 'inline-source-map',
  mode: 'development',
  target: ['web', 'electron-renderer'],
  entry: [path.join(SRC_RENDERER, 'index.tsx')],
  output: {
    path: DIST_BUILD,
    publicPath: '/',
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
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                'postcss-flexbugs-fixes',
                [
                  'postcss-preset-env',
                  {
                    autoprefixer: {
                      flexbox: 'no-2009'
                    },
                    stage: 3
                  }
                ],
                'postcss-normalize'
              ]
            }
          }
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
      NODE_ENV: 'development'
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
      env: process.env.NODE_ENV,
      isDevelopment: true,
      nodeModules: DIST_BUILD_NODE_MODULES
    }),
    new ReactRefreshWebpackPlugin(),
    new CaseSensitivePathsPlugin()
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  devServer: {
    port: PORT,
    compress: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      publicPath: '/'
    },
    historyApiFallback: {
      verbose: true
    },
    setupMiddlewares(middlewares) {
      const preloadProcess = spawn('npm', ['run', 'build:dev'], {
        shell: true,
        stdio: 'inherit'
      })
        .on('close', (code: number) => process.exit(code))
        .on('error', (spawnError) => console.error(spawnError));

      let args = ['run', 'start:main'];
      if (process.env.MAIN_ARGS) {
        args = args.concat(
          ['--', ...process.env.MAIN_ARGS.matchAll(/"[^"]+"|[^\s"]+/g)].flat()
        );
      }
      spawn('npm', args, {
        shell: true,
        stdio: 'inherit'
      })
        .on('close', (code: number) => {
          preloadProcess.kill();
          process.exit(code);
        })
        .on('error', (spawnError) => console.error(spawnError));
      return middlewares;
    }
  }
};

module.exports = merge(mainConfig, devConfig);
