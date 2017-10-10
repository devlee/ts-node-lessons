import * as React from 'react';

import AppProvidor from './app-provider';

import ClientApp from './client-app';

class App extends React.PureComponent<any, any> {
  public render() {
    return (
      <AppProvidor {...this.props} Comp={ClientApp} />
    );
  }
}

export default App;
