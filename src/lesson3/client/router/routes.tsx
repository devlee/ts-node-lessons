import * as React from 'react';

import { Route } from 'react-router';

import * as LoadHomePage from 'bundle-loader?lazy&name=[hash:6]!../components/home-page';

import * as LoadAboutPage from 'bundle-loader?lazy&name=[hash:6]!../components/about-page';

// 使用分片和同构是一个矛盾的地方，使用分片在同构时将无法发挥react 16新的注水功能

import HomePage2 from '../components/home-page';

import AboutPage2 from '../components/about-page';

import Bundle from '../components/bundle';

export const HomePage = () => (
  <Bundle load={LoadHomePage}>
    {
      (Comp: any) => <Comp />
    }
  </Bundle>
);

export const AboutPage = () => (
  <Bundle load={LoadAboutPage}>
    {
      (Comp: any) => <Comp />
    }
  </Bundle>
);

export default () => (
  <div>
    <Route exact={true} path="/" component={HomePage2} />
    <Route path="/about" component={AboutPage2} />
  </div>
);
