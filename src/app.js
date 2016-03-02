'use strict';

const React = require('react');
const { render } = require('react-dom');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute, hashHistory } = require('react-router');
const { syncHistoryWithStore, routerReducer } = require('react-router-redux');
const thunk = require('redux-thunk');

const App = require('./components');
const Library = require('./components/library.js');
const reducers = require('./reducers');

const logger = store => next => action => {
  console.log('dispatching', action.type)
  const result = next(action)
  console.log('Next state:', store.getState())
  return result;
};

let store = createStore(
  combineReducers({
    search: reducers.search, 
    routing: routerReducer,
  }),
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(hashHistory, store)}>
      <Route path='/' component={App}>
        <IndexRoute component={Library} />
      </Route>
    </Router>
  </Provider>, 
  document.getElementById('container')
);
