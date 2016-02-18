'use strict';

const merge = require('merge');

const initialState = {
  error: null,
  isFetching: false,
  items: [],
};

const mixtapeReducer = (state = initialState, action) => {
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
        items: action.payload,
      });

    default:
      return state;
  }
};

module.exports = mixtapeReducer;
