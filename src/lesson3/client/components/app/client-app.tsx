import * as React from 'react';

import { Route } from 'react-router';

import ClientRouter from '../../router/client';

import Routes from '../../router/routes';

class ClientApp extends React.PureComponent<any, any> {
  public render() {
    return (
      <ClientRouter>
        <Routes />
      </ClientRouter>
    );
  }
}

export default ClientApp;
