import * as path from 'path';

import * as webpack from 'webpack';

import * as nodeExternals from 'webpack-node-externals';

import { cloneDeep } from 'lodash';

import baseConfig, { cssLoader, getTsRule, postcssLoader } from './webpack.base.config';

const baseDir = path.resolve(__dirname, '../../..');
const newBaseConfig = cloneDeep(baseConfig);
const config: webpack.Configuration = {
  ...newBaseConfig,
  devtool: false,
  entry: {
    server: [
      './src/lesson3/server/app.tsx',
    ],
  },
  externals: [nodeExternals()],
  node: {
    __dirname: true,
    __filename: true,
  },
  output: {
    ...newBaseConfig.output,
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(baseDir, './bundle/lesson3/server'),
  },
  target: 'node',
};

const pcssRule = {
  test: /\.pcss$/,
  use: [
    'isomorphic-style-loader',
    cssLoader,
    postcssLoader,
  ],
};

(config.module as any).rules.push(
  getTsRule('./src/lesson3/webpack/tsconfig.server.json'),
  pcssRule,
);

export default config;
