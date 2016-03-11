'use strict';

const db = require('../helpers/db.js');

module.exports = {
  getMixtapes(filters) {
    return (dispatch) => {
      dispatch({type: 'GET_MIXTAPES'});
      return db.getMixtapes(filters)
        .then(items => {
          return dispatch({type: 'MIXTAPES_SUCCESS', payload: items});
        })
    };
  },
};
