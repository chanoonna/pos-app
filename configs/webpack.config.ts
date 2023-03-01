import webpack, { Configuration } from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import path from 'path';

const ROOT = path.join(__dirname, '../');
const SRC = path.join(ROOT, 'src');

const mainConfig: Configuration = {
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
              moduleResolution: 'node'
            }
          }
        }
      }
    ]
  },

  output: {
    path: SRC,
    library: {
      type: 'commonjs2'
    }
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [SRC, 'node_modules'],
    plugins: [new TsconfigPathsPlugins()]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ]
};

export default mainConfig;
