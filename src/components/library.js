'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const MusicFinder = require('./musicfinder.js');

const actions = require('../actions/library.js');

class Library extends React.Component {
  componentDidMount() {
    /* fetchMixtapes */
  }

  render() {
    return (
      <div className='ui grid'>
        <MusicFinder />
      </div>
    );
  }
}

module.exports = Library;
