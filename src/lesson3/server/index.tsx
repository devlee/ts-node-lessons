import * as Koa from 'koa';

import * as compress from 'koa-compress';

import * as React from 'react';

import { renderToString } from 'react-dom/server';

import App from '../client/components/app';

import WebpackDevServer from '../webpack/webpack-dev-server';

const app = new Koa();

app.use(compress());

WebpackDevServer(app);

// response
app.use(async (ctx) => {
  const { url } = ctx.req;
  if (url !== '/') {
    return ctx.body = '';
  }
  const html = Math.random() > 0.5 ? renderToString(<App />) : '';
  ctx.body = `
    <!DOCTYPE html>
    <html lang="zh-cn">
      <head>
        <meta name="theme-color" content="#317EFB"/>
        <title>hello world</title>
        <link rel="stylesheet" type="text/css" href="/assets/lesson3/vendor.css" />
        <link rel="stylesheet" type="text/css" href="/assets/lesson3/client.css" />
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
