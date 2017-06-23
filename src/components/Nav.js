import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav (props) {
  return (
    <div className='navbar-container'>
      <ul className='navbar'>
        <li>
          <NavLink exact activeClassName='active' className='btn-white' to='/'>
            Library
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='active' className='btn-white' to='/add'>
            Add a Book
          </NavLink>
        </li>
        <li>
          <button 
            className='btn-black sign-out-btn'
            onClick={props.signOut}>
              Sign Out
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Nav;