import * as React from 'react';

import * as PropTypes from 'prop-types';

class AppProvider extends React.PureComponent<any, any> {
  public static propTypes = {
    Comp: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
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
    const { Comp } = this.props;
    return (
      <Comp />
    );
  }
}

(AppProvider as any).childContextTypes = {
  insertCss: PropTypes.func.isRequired,
};

export default AppProvider;
