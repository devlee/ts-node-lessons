import * as React from 'react';

import * as styles from '@client/components/app/style.pcss';

class App extends React.PureComponent {
  public render() {
    console.log('[Component Render] App');
    return (
      <div className={styles.root}>Hello World 1</div>
    );
  }
}

export default App;
