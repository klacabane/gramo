'use strict';

const merge = (obj1, obj2) => Object.assign({}, obj1, obj2);

const downloadState = {
  error: null,
  preparing: [],
  downloading: [],
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
      return merge(state, {
        downloading: _.reject(state.downloading, (m) => m.id === action.payload.id),
      });

    case 'DOWNLOAD_ERROR':
      return merge(state, {
        error: action.error,
      });

    default:
      return state;
  }
};

module.exports = downloadReducer;
