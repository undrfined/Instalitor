import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import {Provider} from "react-redux";
import rootReducer from "./reducers/index";
import {composeWithDevTools} from "redux-devtools-extension";

export interface RootState {
    todos: any[]
}
const store = createStore(rootReducer, composeWithDevTools(
    // applyMiddleware(...middleware),
    // other store enhancers if any
))

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
