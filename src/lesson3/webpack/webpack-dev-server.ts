import * as Koa from 'koa';

import * as webpack from 'webpack';

import koaWebpackDevMiddleware from './koa-webpack-dev-middleware';

import webpackClientConfig from './webpack.client.config';

import bundleServer from './bundle-server';

export default (app: Koa, doneAfterBundleServer) => {
  webpackClientConfig.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
  );
  const clientCompiler = webpack(webpackClientConfig);
  clientCompiler.plugin('done', () => { bundleServer(doneAfterBundleServer); });
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
