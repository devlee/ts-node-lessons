import * as path from 'path';

import * as webpack from 'webpack';

import * as nodeExternals from 'webpack-node-externals';

import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

const baseDir = path.resolve(__dirname, '../../..');
const { optimize } = webpack;
const { CommonsChunkPlugin } = optimize;
const config: webpack.Configuration = {
  cache: false,
  devtool: false,
  entry: {
    server: [
      './src/lesson3/server/index.tsx',
    ],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: './src/lesson3/webpack/tsconfig.server.json',
            },
          },
        ],
      },
      {
        test: /\.pcss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')({
                  path: path.join(baseDir, './src/lesson3/client/style'),
                }),
                require('postcss-cssnext'),
                require('postcss-nested'),
              ],
            },
          },
        ],
      },
    ],
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(baseDir, './bundle/lesson3/server'),
    publicPath: '/assets/lesson3/',
  },
  plugins: [
    new ExtractTextPlugin('vendor.css'),
  ],
  resolve: {
    alias: {
      '@client': path.resolve(baseDir, './src/lesson3/client'),
      'react': path.resolve(baseDir, './node_modules/react/dist/react.js'),
      'react-dom': path.resolve(baseDir, './node_modules/react-dom/dist/react-dom.min.js'),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: 'node',
};

export default config;
