'use strict';

const mixtapes = require('../helpers/mixtapes.js');
const db = require('../helpers/db.js');

const actions = {
  searchMixtape(term) {
    return (dispatch) => {
      dispatch({ type: 'SEARCH_MIXTAPE' });

      return mixtapes.search(term)
        .then(result => {
          return dispatch({
            type: 'SEARCH_MIXTAPE_SUCCESS',
            payload: result,
          })
        })
        .catch(error => {
          return dispatch({
            type: 'SEARCH_MIXTAPE_ERROR',
            error,
          });
        });
    };
  },

  getMixtapes() {
    return (dispatch) => {

    };
  },

  /**
   * @param {Item}
   */
  downloadMixtape(mixtape) {
    return (dispatch) => {
      dispatch({ type: 'PREPARE_DOWNLOAD', payload: mixtape.title });

      db.insertItem(mixtape.toDbFmt())
        .then(item => {
          dispatch({
            type: 'ADD_DOWNLOAD',
            payload: item,
          });
          return mixtapes.download(item);
        })
        .then(item => {
          dispatch({
            type: 'DOWNLOAD_SUCCESS',
            payload: item,
          });
        })
        .catch(error => {
          dispatch({
            error,
            type: 'DOWNLOAD_ERROR',
          });
        });
    };
  },
};

module.exports = actions;
