'use strict';

const React = require('react');
const { render } = require('react-dom');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute, hashHistory } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');
const thunkMiddleware = require('redux-thunk');
const { MongoClient } = require('mongodb');

const App = require('./components');
const Library = require('./components/library.js');
const reducer = require('./reducers');

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

MongoClient.connect(
  process.env.MONGODB + '/gramo',
  (err, db) => {
    if (err) throw err;

    require('./helpers/db.js').init(db);

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
  });
