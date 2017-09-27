import * as React from 'react';

import { renderToString } from 'react-dom/server';

import App from '../client/components/app/index';

import { AppContainer } from 'react-hot-loader';

export default {
  render() {
    const css = [];
    const context = { insertCss: (...styles) => styles.forEach((s) => css.push(s._getCss())) };
    const html = renderToString((
      <AppContainer>
        <App context={context} />
      </AppContainer>
    ));
    console.log(css);
    const style = css.join('');
    return {
      html,
      style,
    };
  },
};
