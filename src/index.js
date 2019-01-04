import React from "react"
import { render } from "react-dom"

import App from "./App"
import * as serviceWorker from "./serviceWorker"

import { ApiProvider } from "./state/Api"


import { Provider } from "mobx-react";
import UiStore from "./stores/UiStore";
import Timer from "./stores/Timer"


render(
  <ApiProvider>
    <Provider UiStore={UiStore} Timer={Timer}>
      <App />
    </Provider>
  </ApiProvider>,
  document.getElementById("root")
)
serviceWorker.unregister()
