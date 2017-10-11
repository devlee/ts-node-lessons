import * as path from 'path';

import * as webpack from 'webpack';

import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import { cloneDeep } from 'lodash';

import baseConfig, { cssLoader, getTsRule, postcssLoader } from './webpack.base.config';

const baseDir = path.resolve(__dirname, '../../..');
const { optimize } = webpack;
const { CommonsChunkPlugin } = optimize;
const extractCSS = new ExtractTextPlugin('vendor.css');
const extractPostCSS = new ExtractTextPlugin('client.css');
const newBaseConfig = cloneDeep(baseConfig);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const isDev = process.env.NODE_ENV === 'development';

const config: webpack.Configuration = {
  ...newBaseConfig,
  devtool: 'eval',
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
    ...newBaseConfig.output,
    filename: '[name].js',
    path: path.resolve(baseDir, './bundle/lesson3'),
  },
};

const pcssRuleWithEx = {
  test: /\.pcss$/,
  use: extractPostCSS.extract({
    fallback: 'style-loader',
    use: [
      cssLoader,
      postcssLoader,
    ],
  }),
};

const pcssRuleWithOutEx = {
  test: /\.pcss$/,
  use: [
    {
      loader: 'style-loader',
    },
    cssLoader,
    postcssLoader,
  ],
};

const pcssRule = isDev ? pcssRuleWithOutEx : pcssRuleWithEx;

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
  new CommonsChunkPlugin({
    filename: 'vendor.js',
    name: 'vendor',
  }),
);

if (!isDev) {
  config.plugins.push(extractPostCSS);
}

export default config;
