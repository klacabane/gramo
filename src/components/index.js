'use strict';

const React = require('react');

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='header'></div>
        {this.props.children}
      </div>
    );
  }
}

module.exports = App;
