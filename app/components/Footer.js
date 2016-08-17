import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Footer.scss')
}

const Footer = () => {
    return (
        <div className='Footer'>
            <footer>
                <div className='flex__container--text flex__container--text--section'>
                    <h2 className='flex__container--text--item'>
                        Get in touch
                    </h2>
                    <div className='flex__container--text--item'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Email:</p>
                        <p>GitHub https://github.com/ramonjd/ramon-james.com</p>
                        <p>LinkedIn https://uk.linkedin.com/in/ramonjames</p>
                        <div className="partisan">
    <svg className="partisan__bg" viewBox="0 0 500 188" preserveAspectRatio="none" width="100%" height="100%" ariaHidden="true">
        <polygon points="0 154 123.39 0 235.78 14.79 365.6 28.9 436.24 114.93 500 188 0 188 0 154" fill="#bed730"/>
        <polygon points="0 188 108.84 18.17 347.91 26.79 500 188 365.6 28.9 123.39 0 0 154 0 188" fill="#dde465"/>
    </svg>
    <a className="partisan__link" href="https://goo.gl/oECseP" rel="nofollow">
        <img className="partisan__img" src="img/Partisan_Bushel.png" alt="Bushel: Easily manage all your Apple devices at work"/>
        <h3 className="partisan__title">Bushel: Easily manage all your Apple devices at work</h3>
    </a>
</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

Footer.propTypes = {}

export default Footer
