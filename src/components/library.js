'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const MusicFinder = require('./musicfinder.js');

const Item = require('../item.js');

const actions = require('../actions/mixtape.js');

class Library extends React.Component {
  componentDidMount() {
    /* fetchMixtapes */
  }

  render() {
    return (
      <div className='ui grid'>
        <MusicFinder />

        <div>
        {
          this.props.mixtapes.map((mixtape, i) => {
            return <div key={i}>
              <span>{ mixtape.title }</span>
              <span>{ mixtape.artist }</span>
            </div>;
          })
        }
        </div>
      </div>
    );
  }
}

const stateToProps = (state, props) => {
  return {
    error: state.library.error,
    isFetching: state.library.isFetching,
    mixtapes: state.library.mixtapes,
  };
};

const dispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

module.exports = connect(stateToProps, dispatchToProps)(Library);
