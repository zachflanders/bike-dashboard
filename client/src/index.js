import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const defaultState = {
  appName: 'BikeWalkKC Dashboard'
};

const reducer = function(state = defaultState, action){
  return state;
};

const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store = {store}>
      <App />
    </Provider>
  </ BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
