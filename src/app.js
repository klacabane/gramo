'use strict';

const React = require('react');
const { render } = require('react-dom');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk');

const App = require('./components');
const reducer = require('./reducers');

const logger = store => next => action => {
  console.log('dispatching', action.type)
  const result = next(action)
  console.log('Next state:', store.getState())
  return result;
};

let store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('container')
);
