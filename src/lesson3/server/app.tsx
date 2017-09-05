import * as React from 'react';

import { renderToString } from 'react-dom/server';

import App from '../client/components/app';

export default {
  render() {
    return renderToString(<App />);
  },
};
