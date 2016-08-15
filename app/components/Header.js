import React, { PropTypes } from 'react'
import Nav from './Nav'
import classNames from 'classnames'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Header.scss')
}

const Header = (props) => {
    const headerClasses = classNames({
        'header': true
    })
    return (
        <div className='Header'>
            <header className='header'>
                <Nav { ...props } />
            </header>
        </div>
    )
}

Header.propTypes = {
    currentPage: PropTypes.string
}

export default Header
