import webpack, { Configuration } from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import { SRC } from './paths';

const ENV = process.env.NODE_ENV || 'development';

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
  ],
  externals: {
    sqlite3: 'sqlite3'
  }
};

export default mainConfig;
