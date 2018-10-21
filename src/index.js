// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider, Subscribe, Container } from 'unstated';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AppStateContainer from './AppStateContainer'

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();