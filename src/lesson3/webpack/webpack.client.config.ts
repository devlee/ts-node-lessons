import * as path from 'path';

import * as webpack from 'webpack';

import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import baseConfig, { cssLoader, getTsRule, postcssLoader } from './webpack.base.config';

const baseDir = path.resolve(__dirname, '../../..');
const { optimize } = webpack;
const { CommonsChunkPlugin } = optimize;
const extractCSS = new ExtractTextPlugin('vendor.css');
const extractPostCSS = new ExtractTextPlugin('client.css');

const config: webpack.Configuration = {
  ...baseConfig,
  devtool: 'source-map',
  entry: {
    client: [
      './src/lesson3/client/index.tsx',
    ],
    vendor: [
      './src/lesson3/client/style/index.css',
      'react',
      'react-dom',
    ],
  },
  output: {
    ...baseConfig.output,
    filename: '[name].js',
    path: path.resolve(baseDir, './bundle/lesson3'),
  },
};

const pcssRule = {
  test: /\.pcss$/,
  use: extractPostCSS.extract({
    fallback: 'style-loader',
    use: [
      cssLoader,
      postcssLoader,
    ],
  }),
};

const cssRule = {
  test: /\.css$/,
  use: extractCSS.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
    ],
  }),
};

(config.module as any).rules.push(
  getTsRule('./src/lesson3/webpack/tsconfig.json'),
  pcssRule,
  cssRule,
);

config.plugins.push(
  extractCSS,
  extractPostCSS,
  new CommonsChunkPlugin({
    filename: 'vendor.js',
    name: 'vendor',
  }),
);

export default config;
