import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from './js/store/store';
import App from "./js/components/App";
render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
