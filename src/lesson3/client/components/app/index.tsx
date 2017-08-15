import * as React from 'react';

import * as styles from '@client/components/app/style.pcss';

import * as png from '@client/style/image/react-ts.png';

import * as webp from '@client/style/image/react-ts.webp';

import * as gif from '@client/style/image/redux-observable.gif';

import * as svg from '@client/style/image/ts-logo.svg';

import * as jpg from '@client/style/image/TypeScript.jpg';

import Image from '../image';

class App extends React.PureComponent {
  public render() {
    console.log('[Component Render] App');
    const images = {
      gif,
      jpg,
      png,
      svg,
      webp,
    };
    return (
      <div className={styles.root}>
        Hello World
        <ul>
          {
            Object.keys(images).map((k) => (
              <li key={k}>
                <Image className={styles.img} src={images[k]} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
