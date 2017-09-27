import * as React from 'react';

import App from './app';

import * as PropTypes from 'prop-types';

class AppProvider extends React.PureComponent<any, any> {
  public static propTypes = {
    context: PropTypes.object,
  };

  public static defaultProps = {
    context: {},
  };

  constructor(props) {
    super();
    const { context = {} } = props;
    if ((context as any).insertCss) {
      (this as any).getChildContext = () => (context);
    }
  }

  public render() {
    return (
      <App />
    );
  }
}

(AppProvider as any).childContextTypes = {
  insertCss: PropTypes.func.isRequired,
};

export default AppProvider;
