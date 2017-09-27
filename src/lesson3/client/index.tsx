import * as React from 'react';

import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from './components/app/index';

function renderApp(Comp) {
  render(
    (
      <AppContainer>
        <Comp context={{ insertCss: () => { /*todo*/ }}}/>
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
