// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider, Subscribe, Container } from 'unstated';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import CounterContainer from './CounterState'

function Counter() {
  return (
    <Subscribe to={[CounterContainer]}>
      {counter => (
        <div>
          <button onClick={() => counter.decrement()}>-</button>
          <span>{counter.state.count}</span>
          <button onClick={() => counter.increment()}>+</button>
        </div>
      )}
    </Subscribe>
  );
}


render(
  <Provider>
    <Counter />
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();