import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav () {
  return (
    <div className='navbar-container'>
      <h1>Book.Library</h1>
      <ul className='navbar'>
        <li>
          <NavLink exact activeClassName='active' to='/'>
            Library
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='active' to='/add'>
            Add a Book
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Nav;