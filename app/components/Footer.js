import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import Rainbow from './Rainbow'
import ScrollListener from 'react-scroll-listener'
import { isClient, getDocumentHeight, getViewportSize } from '../utils/'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Footer.scss')
}

// let Velocity
//
// if (isClient() === true) {
//     Velocity = require('velocity-animate')
// }
// Velocity(this.refs.rainbowArc1, {
//     translateZ: 0, // Force HA by animating a 3D property
//     translateX: '200px',
//     rotateZ: '45deg'
// }, 'easeInSine')

const FooterScrollListener = new ScrollListener()

export default class Footer extends Component {
    static propTypes = {
    }
    constructor() {
        super()
        this.state = {
            scrollTriggered: false
        }
        this.myScrollStartHandler = this.myScrollStartHandler.bind(this)
    }
    componentDidMount() {
        FooterScrollListener.addScrollStartHandler('footer.scroll', this.myScrollStartHandler)
    }
    componentWillUnmount() {
        FooterScrollListener.removeScrollStartHandler('footer.scroll')
    }
    myScrollStartHandler() {
        const windowDimensions = getViewportSize()
        const documentHeight = getDocumentHeight()
        const scrollPosition = FooterScrollListener.scrollTop + windowDimensions.height
        const triggerPoint = documentHeight - 200

        if (this.state.scrollTriggered === false &&
            scrollPosition > triggerPoint) {
            console.log('on')
            this.setState({
                scrollTriggered: true
            })
        } else if (this.state.scrollTriggered === true &&
            scrollPosition < triggerPoint) {
            console.log('off')
            this.setState({
                scrollTriggered: false
            })
        }
    }
    render() {
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
                        </div>
                    </div>
                    <div className='container__svg' aria-hidden='true'>
                        <svg className='svg__mountain__base svg__mountain__base--left' width='50%' viewBox='0 0 1000 200' preserveAspectRatio='xMinYMin slice' >
                            <polygon id='mountain_left_1' points='3 199 976 199 834 112 567 113 314 72 313 73 192 89 2 53' fill='#1A4C68'/>
                        </svg>
                        <svg className='svg__mountain__base svg__mountain__base--left--over' width='50%' viewBox='0 0 1000 200' preserveAspectRatio='xMinYMin slice' >
                            <polygon id='mountain_left_3' points='3 199 976 199 834 112 567 113 314 72 313 73 192 89 2 53' fill='#909599'/>
                        </svg>

                        <svg className='svg__mountain__base svg__mountain__base--right' width='50%' viewBox='0 0 1000 200' preserveAspectRatio='xMinYMin slice' >
                            <polygon id='mountain_right_1' points='990 193 988 176 989 16 919 21 793 57 722 40 641 72 487 73 410 39 300 101 191 104 6 198' fill='#1A4C68'/>
                        </svg>
                        <svg className='svg__mountain__base svg__mountain__base--right--over' width='50%' viewBox='0 0 1000 200' preserveAspectRatio='xMinYMin slice' >
                            <polygon id='mountain_right_3' points='990 193 988 176 989 16 919 21 793 57 722 40 641 72 487 73 410 39 300 101 191 104 6 198' fill='#909599'/>
                        </svg>
                        <Rainbow scrollTriggered={ this.state.scrollTriggered } />
                    </div>
                </footer>
            </div>
        )
    }
}
