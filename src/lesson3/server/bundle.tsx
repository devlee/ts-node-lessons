import * as React from 'react';

import * as Koa from 'koa';

import { renderToString } from 'react-dom/server';

import { AppContainer } from 'react-hot-loader';

import createHistory from 'history/createMemoryHistory';

import { Provider } from 'react-redux';

import { Route, StaticRouter } from 'react-router';

import configureStore from '../client/store';

import AppProvidor from '../client/components/app/app-provider';

import AboutPage from '../client/components/about-page';

import HomePage from '../client/components/home-page';

export default (ctx: Koa.Context, next) => {
  const css = [];
  const context = { insertCss: (...styles) => styles.forEach((s) => css.push(s._getCss())) };
  const history = createHistory();
  const store = configureStore(history);
  const context2: any = {};

  const Comp = () => (
    <Provider store={store}>
      <StaticRouter location={ctx.url} context={context2}>
        <div>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
        </div>
      </StaticRouter>
    </Provider>
  );

  if (context2.url) {
    ctx.redirect(context2.url);
    return next();
  }

  const html = renderToString((
    <AppContainer>
      <AppProvidor context={context} Comp={Comp} />
    </AppContainer>
  ));

  const style = css.join('');
  ctx.type = 'html';
  ctx.body = `
    <!DOCTYPE html>
    <html lang="zh-cn">
      <head>
        <meta name="theme-color" content="#317EFB"/>
        <title>hello world SSR</title>
        <link rel="stylesheet" type="text/css" href="/assets/lesson3/vendor.css" />
        <style>${style}</style>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="/assets/lesson3/vendor.js"></script>
        <script src="/assets/lesson3/client.js"></script>
      </body>
    </html>
  `;

  next();
};
