import * as Koa from 'koa';

import * as fs from 'fs';

import * as path from 'path';

import * as compress from 'koa-compress';

import WebpackDevServer from '../webpack/webpack-dev-server';

import createBundleRunner from './create-bundle-runner';

const app = new Koa();

app.use(compress());

// 这个就是服务端打包代码（将客户端相关代码打包给服务端使用的代码）运行后返回的相关结果对象
let serverBundleRes = null;

const resolve = (file) => path.resolve(__dirname, file);

// 执行服务端打包代码
function runServerBundle() {
  const bundle = fs.readFileSync(resolve('../../../bundle/lesson3/server/server-bundle.js'), 'utf-8');
  const ssrBundle = '__ssr_bundle__';
  const run = createBundleRunner(ssrBundle, {
    [ssrBundle]: bundle,
  });
  run()
  .then((res) => {
    // 返回结果进行赋值
    serverBundleRes = res;
  })
  .catch((err) => {
    console.error(err);
  });
}

WebpackDevServer(app, runServerBundle);

// response
app.use(async (ctx) => {
  const { url } = ctx.req;

  if (url !== '/') {
    return ctx.body = '';
  }

  const html = Math.random() > 0.5 ? serverBundleRes && serverBundleRes.render() : '';
  ctx.body = `
    <!DOCTYPE html>
    <html lang="zh-cn">
      <head>
        <meta name="theme-color" content="#317EFB"/>
        <title>hello world${html ? ' SSR' : ''}</title>
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
