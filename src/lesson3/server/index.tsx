import * as Koa from 'koa';

import * as React from 'react';

import { renderToString } from 'react-dom/server';

import App from '../client/components/app';

import WebpackDevServer from '../webpack/webpack-dev-server';

const app = new Koa();

WebpackDevServer(app);

// response
app.use(async ctx => {
  const { url } = ctx.req;
  if (url !== '/') {
    return ctx.body = '';
  }
  const html = renderToString(<App />);
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>hello world</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="/assets/lesson3/vendor.js"></script>
        <script src="/assets/lesson3/client.js"></script>
      </body>
    </html>
  `;
});

app.listen(3000, () => {
  console.log('koa app start at port 3000');
});
