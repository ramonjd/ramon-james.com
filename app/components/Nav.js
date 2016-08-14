import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Nav.scss')
}

const Nav = ({ listItems }) => {
    return (
        <div className='Nav nav-bar'>
          <nav>
              <ul className='nav_list'>
                  <li className='nav_list__item'><Link to='/'>Home</Link></li>
                  <li className='nav_list__item'><Link to='/'>Writing</Link></li>
                  <li className='nav_list__item'><Link to='/about'>About</Link></li>
                  <li className='nav_list__item'><Link to='/'>Contact</Link></li>
              </ul>
          </nav>
        </div>
    )
}

Nav.propTypes = {}

export default Nav
