import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import "tachyons"; // modulo de class de css 
import App from './containers/App';

// redux
import { searchRobots, requestRobots } from './reducers';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';
// redux-logger -- Middleware
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// redux-thunk ------
import thunkMiddleware from 'redux-thunk';



const logger = createLogger();

const rootReducer = combineReducers({ searchRobots, requestRobots });
const store =
  createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
serviceWorker.unregister();
