import path from 'path';
import webpack, { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import mainConfig from './webpack.config';

const ROOT = path.join(__dirname, '../');
const PRELOAD = path.join(ROOT, 'src/preload');
const DIST_PRELOAD = path.join(ROOT, 'dist/app/preload');

const preloadConfig: Configuration = {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-preload',
  entry: path.join(PRELOAD, 'preload.ts'),
  output: {
    path: DIST_PRELOAD,
    filename: 'preload.js',
    library: {
      type: 'umd'
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  watch: true
};

export default merge(mainConfig, preloadConfig);
