import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'unstated';

import App from './App';
import * as serviceWorker from './serviceWorker';

render(
  <Provider>
    <App />
  </Provider>, 
  document.getElementById('root')
);
serviceWorker.unregister();