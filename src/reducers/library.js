'use strict';

const merge = (obj1, obj2) => Object.assign({}, obj1, obj2);

const libraryState = {
  mixtapes: [],
};

const libraryReducer = (state = libraryState, action) => {
  switch (action.type) {
    case 'ADD_MIXTAPE':
      return merge(state, {
        mixtapes: state.mixtapes.concat(action.payload),
      });

    case 'GET_MIXTAPES':
      return merge(state, {
        mixtapes: action.payload,
      });

    default:
      return state;
  }
};

module.exports = libraryReducer;
