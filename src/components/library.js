'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const Menu = require('./menu.js');

const actions = require('../actions/library.js');

class Library extends React.Component {
  componentDidMount() {
    /* fetchMixtapes */
  }

  render() {
    return (
      <div>
        <Menu active={0} />

        <div>
        {
          this.props.mixtapes.map((mixtape, i) => {
            return <div key={i}>{mixtape.title}</div>;
          })
        }
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    error: state.library.error,
    isFetching: state.library.isFetching,
    mixtapes: state.library.mixtapes,
  };
};

const dispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

module.exports = connect(stateToProps, dispatchToProps)(Library);
