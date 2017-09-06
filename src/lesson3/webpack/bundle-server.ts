
import * as webpack from 'webpack';

import webpackServerConfig from './webpack.server.config';

export default (done) => {
  const serverCompiler = webpack(webpackServerConfig);
  serverCompiler.plugin('done', done);
  serverCompiler.run((err, stats) => {
    if (err) {
      console.error('[ERROR] ./src/lesson3/webpack/bundle-server.ts line11');
    }
  });
};
