import * as React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import * as styles from '@client/components/home-page/style.pcss';

import * as png from '@client/style/image/react-ts.png';

import * as webp from '@client/style/image/react-ts.webp';

import * as gif from '@client/style/image/redux-observable.gif';

import * as svg from '@client/style/image/ts-logo.svg';

import * as jpg from '@client/style/image/TypeScript.jpg';

import Image from '../image';

import { Link } from 'react-router-dom';

@withStyles(styles)
class HomePage extends React.PureComponent<any, any> {
  public render() {
    console.log('[Component Render] App');
    const images = {
      gif: {
        lazy: true,
        value: gif,
      },
      jpg: {
        lazy: true,
        value: jpg,
      },
      png: {
        lazy: true,
        value: png,
      },
      svg: {
        lazy: false,
        value: svg,
      },
      webp: {
        lazy: true,
        value: webp,
      },
    };
    return (
      <div className={styles.root}>
        Hello World
        <ul>
          {
            Object.keys(images).map((k) => (
              <li key={k}>
                <Image className={styles.img} src={images[k].value} lazy={images[k].lazy} />
              </li>
            ))
          }
        </ul>
        <Link to="/about">about</Link>
      </div>
    );
  }
}

export default HomePage;
