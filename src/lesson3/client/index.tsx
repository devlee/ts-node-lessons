import * as React from 'react';

import { render } from 'react-dom';

import App from './components/app';

function renderApp() {
  render(
    (
      <App />
    ),
    document.getElementById('app'),
  );
}

window.onload = () => {
  renderApp();
};
