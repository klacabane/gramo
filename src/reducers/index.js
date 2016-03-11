'use strict';

const _ = require('underscore');
const { combineReducers } = require('redux');
const { routerReducer } = require('react-router-redux');

const merge = (obj1, obj2) => Object.assign({}, obj1, obj2);

const initialState = {
  error: null,
  isFetching: false,
  results: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_MIXTAPES':
      return merge(state, {
        error: null,
        isFetching: true,
      });

    case 'SEARCH_MIXTAPES_ERROR':
      return merge(state, {
        error: action.error,
        isFetching: false,
      });

    case 'SEARCH_MIXTAPES_SUCCESS':
      return merge(state, {
        error: null,
        isFetching: false,
        results: action.payload,
      });

    default:
      return state;
  }
};

const downloadState = {
  error: null,
  preparing: [],
  downloading: [],
  mixtapes: [],
};

const downloadReducer = (state = downloadState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'PREPARE_DOWNLOAD':
      return merge(state, {
        preparing: state.preparing.concat(action.payload),
      });

    case 'ADD_DOWNLOAD':
      return merge(state, {
        preparing: _.reject(state.preparing, (m) => m === action.payload.title),
        downloading: state.downloading.concat(action.payload),
      });

    case 'DOWNLOAD_SUCCESS':
      return {
        downloading: _.reject(state.downloading, (m) => m.id === action.payload.id),
        mixtapes: state.mixtapes.concat(action.payload),
      };

    case 'DOWNLOAD_ERROR':
      return merge(state, {
        error: action.error,
      });

    default:
      return state;
  }
};

module.exports = combineReducers({
  search: searchReducer, 
  library: downloadReducer,
  routing: routerReducer,
});
