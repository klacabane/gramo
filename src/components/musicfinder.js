'use strict';

const React = require('react');
const classNames = require('classnames');
const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const actions = require('../actions/mixtape.js');

class MusicFinder extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    const s = (t) => {
      this.props.searchMixtape(t)
        .then(() => {
          this.setState({
            show: true,
          });
        });
    }
    s('slime season')
  }

  handleKeyUp(e) {
  }

  render() {
    return (
      <div id='musicfinder' className='ten wide column'>
          <div className={
            classNames('ui inverted transparent fluid icon input', {
              loading: this.props.isFetching,
            })
          }>
            <input 
              id='musicfinder-input'
              placeholder='Music' />
            <i className='search link icon'></i>
          </div>
          <div className='ui inverted divider'></div>
        {
          this.state.show && !this.props.isFetching ?
            <div className='ui message'>
                <div className='ui middle aligned divided list'>
                {
                  this.props.results.map((result, i) => {
                    return <ResultRow
                      key={i}
                      item={result} />;
                  })
                }
              </div>
            </div>
            : ''
        }
      </div>
    );
  }
}

class ResultRow extends React.Component {
  render() {
    return (
      <div className='item'>
        <div className='right floated content'>
          <div className='ui small icon buttons'>
            <button className='ui button'>
              <i className='download icon'></i>
            </button>
          </div>
        </div>
        <img className='ui tiny image' src={this.props.item.cover} />
        <div className='content'>
          <div className='header'>{this.props.item.title}</div>
          Title
        </div>
      </div>
    );
  }
}

const stateToProps = (state, props) => {
  return {
    error: state.search.error,
    isFetching: state.search.isFetching,
    results: state.search.results,
  };
};

const dispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

module.exports = connect(stateToProps, dispatchToProps)(MusicFinder);
