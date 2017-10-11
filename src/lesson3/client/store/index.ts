import { routerMiddleware } from 'react-router-redux';

import { applyMiddleware, createStore } from 'redux';

import reducers from '../reducers';

export default (history, initialState?: {}) => createStore(
  reducers,
  initialState,
  applyMiddleware(routerMiddleware(history)),
);
