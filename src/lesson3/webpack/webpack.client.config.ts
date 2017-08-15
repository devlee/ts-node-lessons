import * as path from 'path';

import * as webpack from 'webpack';

import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

const baseDir = path.resolve(__dirname, '../../..');
const { optimize } = webpack;
const { CommonsChunkPlugin } = optimize;
const extractCSS = new ExtractTextPlugin('vendor.css');
const extractPostCSS = new ExtractTextPlugin('client.css');
const config: webpack.Configuration = {
  cache: false,
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
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: './src/lesson3/webpack/tsconfig.json',
            },
          },
        ],
      },
      {
        test: /\.pcss$/,
        use: extractPostCSS.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg||gif|svg|webp)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(baseDir, './bundle/lesson3'),
    publicPath: "/assets/lesson3/",
  },
  plugins: [
    extractCSS,
    extractPostCSS,
    new CommonsChunkPlugin({
      filename: 'vendor.js',
      name: 'vendor',
    }),
  ],
  resolve: {
    alias: {
      '@client': path.resolve(baseDir, './src/lesson3/client'),
      'react': path.resolve(baseDir, './node_modules/react/dist/react.js'),
      'react-dom': path.resolve(baseDir, './node_modules/react-dom/dist/react-dom.min.js'),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  stats: {
    errorDetails: true,
  },
};

export default config;
