'use strict';

const React = require('react');
const { Link } = require('react-router');
const classNames = require('classnames');
const { connect } = require('react-redux');

class Menu extends React.Component {
  render() {
    return (
      <div className='three wide column'>
        <div>GRAMO</div>
        <div className='ui secondary fluid vertical menu'>
          {
            this.props.tabs.map((tab, i) => {
              return <Link
                key={i}
                to={tab.path}
                className={
                  classNames({
                    active: (tab.path === this.props.location),
                  }, 'item')
                }>
                {tab.label}
              </Link>;
            })
          }
        </div>
      </div>
    );
  }
}

Menu.defaultProps = {
  tabs: [
    {label: 'LIBRARY', icon: 'music', path: '/'},
  ],
};

const stateToProps = (state, props) => {
  console.log(state)
  return {
    location: state.routing.locationBeforeTransitions ? state.routing.locationBeforeTransitions.pathname : '/',
  };
};

module.exports = connect(stateToProps)(Menu);
