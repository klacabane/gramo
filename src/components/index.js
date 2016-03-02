'use strict';

const React = require('react');

const Menu = require('./menu.js');

class App extends React.Component {
  render() {
    return (
      <div className='ui grid'>
        <Menu />

        <div className='thirteen wide column'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = App;
