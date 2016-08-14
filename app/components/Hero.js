import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Hero.scss')
}

export default class Hero extends Component {
    render() {
        const heroClasses = classNames({
            'hero-module': true,
            'hero-module--home': false
        })
        const heroStyles = {
            height:  `${this.props.heroHeight}px`
        }
        return (
            <div className='Hero'>
                <div className={ heroClasses } style={ heroStyles }></div>
            </div>
        )
    }

}
