import React, { Component, PropTypes } from 'react'
import Nav from './Nav'
import classNames from 'classnames'
import ScrollListener from 'react-scroll-listener'
import { Link } from 'react-router'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Header.scss')
}

const HeaderScrollListener = new ScrollListener()
HeaderScrollListener.scrollTimeoutDelay = 250

export default class Header extends Component {
    static propTypes = {
        currentPage: PropTypes.string
    }
    constructor() {
        super()
        this.state = {
            scrollTriggered: false
        }
        this.myScrollStartHandler = this.myScrollStartHandler.bind(this)
    }
    componentDidMount() {
        HeaderScrollListener.addScrollStartHandler('header.scroll', this.myScrollStartHandler)
    }
    componentWillUnmount() {
        HeaderScrollListener.removeScrollStartHandler('header.scroll')
    }
    myScrollStartHandler() {
        if (this.state.scrollTriggered === false &&
            HeaderScrollListener.scrollTop >= 100) {
            this.setState({
                scrollTriggered: true
            })
        } else if (this.state.scrollTriggered === true &&
            HeaderScrollListener.scrollTop < 100) {
            this.setState({
                scrollTriggered: false
            })
        }
    }
    render() {
        const headerClasses = classNames({
            'header': true,
            'header--extended': this.state.scrollTriggered
        })
        const titleClasses = classNames({
            'text--title': true,
            'text--title--active': this.state.scrollTriggered || this.props.currentPage !== 'home'
        })
        return (
            <div className='Header'>
                <header className={ headerClasses }>
                    <div className={ titleClasses }>
                        <Link to='/'>ramon james</Link>
                    </div>
                    <Nav { ...this.props } />
                </header>
            </div>
        )
    }
}
