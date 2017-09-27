import * as React from 'react';

import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from './components/app/index';

function renderApp() {
  render(
    (
      <AppContainer>
        <App />
      </AppContainer>
    ),
    document.getElementById('app'),
  );
}

window.onload = () => {
  renderApp();

  if ((module as any).hot) {
    (module as any).hot.accept('./components/app/index', () => {
      const NextApp = require('./components/app/index').default;
      render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        document.getElementById('app'),
      );
    });
  }
};
