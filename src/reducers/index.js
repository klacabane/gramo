'use strict';

const { combineReducers } = require('redux');
const { routerReducer } = require('react-router-redux');
const searchReducer = require('./search.js');
const downloadReducer = require('./download.js');
const libraryReducer = require('./library.js');

module.exports = combineReducers({
  search: searchReducer, 
  download: downloadReducer,
  library: libraryReducer,
  routing: routerReducer,
});
