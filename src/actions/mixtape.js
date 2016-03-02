'use strict';

const mixtapes = require('../mixtapes.js');

const actions = {
  searchMixtape(term) {
    return (dispatch) => {
      dispatch({type: 'SEARCH_MIXTAPES'});

      return mixtapes.search(term)
        .then(result => {
          return dispatch({
            type: 'SEARCH_MIXTAPES_SUCCESS',
            payload: result,
          })
        })
        .catch(error => {
          return dispatch({
            type: 'SEARCH_MIXTAPES_ERROR',
            error,
          });
        });
    };
  },

  getMixtapes() {
    return (dispatch) => {

    };
  },
};

module.exports = actions;
