'use strict';

const merge = (obj1, obj2) => Object.assign({}, obj1, obj2);

const searchState = {
  error: null,
  isFetching: false,
  results: [],
};

const searchReducer = (state = searchState, action) => {
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

module.exports = searchReducer;
