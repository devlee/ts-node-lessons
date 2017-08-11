import * as Koa from 'koa';
import * as webpack from 'webpack';

import koaWebpackDevMiddleware from './koa-webpack-dev-middleware';
import webpackClientConfig from './webpack.client.config';

export default (app: Koa) => {
  webpackClientConfig.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
  );
  const clientCompiler = webpack(webpackClientConfig);
  const { output } = webpackClientConfig;
  const devMiddlewareOptions = {
    publicPath: output.publicPath,
    stats: {
      chunks: false,
      colors: true,
    },
  };
  app.use(koaWebpackDevMiddleware(clientCompiler, devMiddlewareOptions));
};
