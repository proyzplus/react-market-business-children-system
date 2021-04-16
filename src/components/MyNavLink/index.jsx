import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class index extends Component {
  render() {
    const { routerList } = this.props;
    return (
      <div>
        {
          routerList.map(item => {
            return (
              <NavLink key={item.id} activeClassName={item.activeClassName} className={item.className} to={item.toPage}>{item.name}</NavLink>
            )
          })
        }
      </div>
    );
  }
}

export default index;
