import * as path from 'path';

import * as webpack from 'webpack';

const baseDir = path.resolve(__dirname, '../../..');
const { optimize } = webpack;
const { CommonsChunkPlugin } = optimize;
const config: webpack.Configuration = {
  cache: false,
  devtool: 'source-map',
  entry: {
    client: [
      './src/lesson3/client/index.tsx',
    ],
    vendor: [
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
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(baseDir, './bundle/lesson3'),
    publicPath: "/assets/lesson3/",
  },
  plugins: [
    new CommonsChunkPlugin({
      filename: 'vendor.js',
      name: 'vendor',
    }),
  ],
  resolve: {
    alias: {
      'react': path.resolve(baseDir, './node_modules/react/dist/react.js'),
      'react-dom': path.resolve(baseDir, './node_modules/react-dom/dist/react-dom.min.js'),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};

export default config;
