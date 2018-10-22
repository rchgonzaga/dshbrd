import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'unstated'

import App from './App'
import * as serviceWorker from './serviceWorker'

import { ApiProvider } from "./state/Api"

render(
  <ApiProvider>
    <App />
  </ApiProvider>, 
  document.getElementById('root')
)
serviceWorker.unregister()