import React, { PropTypes, Component } from 'react'
import Nav from './Nav'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Header.scss')
}

const Header = ({}) => {
    return (
        <header className='header header--scroll-and-fix'>
            <Nav />
        </header>
    )
}

Header.propTypes = {}

export default Header
