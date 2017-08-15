import * as path from 'path';

import * as webpack from 'webpack';

/**
 * path
 */
const baseDir = path.resolve(__dirname, '../../..');

/**
 * rule
 */
const imageRule = {
  test: /\.(png|jpg|gif|svg|webp)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]',
      },
    },
  ],
};

export const getTsRule = (configFileName) => ({
  test: /\.tsx?$/,
  use: [
    {
      loader: 'awesome-typescript-loader',
      options: {
        configFileName,
      },
    },
  ],
});

/**
 * loader
 */
export const cssLoader = {
  loader: 'css-loader',
  options: {
    camelCase: true,
    importLoaders: 1,
    localIdentName: '[path][name]---[local]---[hash:base64:5]',
    modules: true,
  },
};

export const postcssLoader = {
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
};

const config: webpack.Configuration = {
  cache: false,
  module: {
    rules: [
      imageRule,
    ],
  },
  output: {
    publicPath: "/assets/lesson3/",
  },
  plugins: [
  ],
  resolve: {
    alias: {
      '@client': path.resolve(baseDir, './src/lesson3/client'),
      'react': path.resolve(baseDir, './node_modules/react/dist/react.js'),
      'react-dom': path.resolve(baseDir, './node_modules/react-dom/dist/react-dom.min.js'),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};

export default config;
