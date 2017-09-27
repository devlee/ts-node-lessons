import * as React from 'react';

import * as ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from './components/app/index';

function renderApp(Comp) {
  (ReactDOM as any).hydrate(
    (
      <AppContainer>
        <Comp context={{ insertCss: () => { /*nothing*/ }}}/>
      </AppContainer>
    ),
    document.getElementById('app'),
  );
}

window.onload = () => {
  renderApp(App);

  if ((module as any).hot) {
    (module as any).hot.accept('./components/app/index', () => {
      const NextApp = require('./components/app/index').default;
      renderApp(NextApp);
    });
  }
};
