'use strict';

const React = require('react');
const classNames = require('classnames');

class MusicFinder extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
      // index of the selected item
      index: 0,
    };
  }

  handleKeyUp(e) {
  }

  render() {
    return (
      <div id='musicfinder' className='fixed'>
        <div className='ui form attached fluid segment'>
          <div className={
            classNames('ui left icon large transparent input', {
              loading: false,
            })
          }>
            <i className='search icon'></i>
            <input 
              id='musicfinder-input'
              placeholder='Music' />
          </div>
        </div>
        {
          this.state.show ?
            <div className='ui attached yellow message'>
              <div className='content'>
                {
                  this.props.results.map((result, i) => {
                    return <ResultRow
                      key={i}
                      item={result}
                      onClick={this.handleKeyUp} />;
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
      <div></div>
    );
  }
}

module.exports = MusicFinder;
