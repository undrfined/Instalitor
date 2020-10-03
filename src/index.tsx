import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import rootReducer from "./reducers/index";
import {composeWithDevTools} from "redux-devtools-extension";
import { BrowserRouter } from 'react-router-dom';

import "./scss/Button.scss";
import "./scss/Input.scss";
import "./scss/PhotoPicker.scss";
import "./scss/Post.scss";

import "./scss/MainPage.scss";
import "./scss/Header.scss";

import "./scss/LoginPage.scss";
import "./scss/FeedPage.scss";
import "./scss/AddPostPage.scss";
import "./scss/ProfilePage.scss";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunkMiddleware),
    // other store enhancers if any
))

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
