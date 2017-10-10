import * as React from 'react';

import createHistory from 'history/createBrowserHistory';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';

import configureStore from '../store';

const history = createHistory();

const store = configureStore(history);

class ClientRouter extends React.PureComponent<any, any> {
  public render() {
    console.log('[render] ./src/router/client.tsx');
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {this.props.children}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default ClientRouter;
