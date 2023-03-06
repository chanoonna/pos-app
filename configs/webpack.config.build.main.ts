import path from 'path';
import webpack, { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import mainConfig from './webpack.config';
import { SRC, SRC_PRELOAD, DIST_BUILD } from './paths';

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';

const mainBuildConfig: Configuration = {
  devtool: 'inline-source-map',
  mode: isProduction ? 'production' : 'development',
  target: 'electron-preload',
  entry: {
    main: path.join(SRC, 'main.ts'),
    preload: path.join(SRC_PRELOAD, 'preload.ts')
  },
  output: {
    path: DIST_BUILD,
    filename: '[name].js',
    library: {
      type: 'umd'
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: ENV
    }),
    new webpack.LoaderOptionsPlugin({
      debug: !isProduction
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  watch: !isProduction
};

export default merge(mainConfig, mainBuildConfig);
