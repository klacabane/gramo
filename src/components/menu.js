'use strict';

const React = require('react');
const { Link } = require('react-router');
const classNames = require('classnames');

class Menu extends React.Component {
  render() {
    return (
      <div className='ui secondary vertical menu'>
        {
          this.props.tabs.map((tab, i) => {
            return <Link
              key={i}
              to={tab.path}
              className={
                classNames({
                  active: (i === this.props.active),
                }, 'item')
              }>
              {tab.label}
            </Link>;
          })
        }
      </div>
    );
  }
}

Menu.defaultProps = {
  tabs: [
    {label: 'LIBRARY', icon: 'music', path: '/'},
  ],
};

module.exports = Menu;
