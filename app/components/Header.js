import React, { PropTypes, Component } from 'react'
import Nav from './Nav'
import classNames from 'classnames'
import events from '../utils/dom-events.js'
import { getDimensions, root, getDocumentScrollTop } from '../utils/'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Header.scss')
}

const getHeaderHeight = (headerElement) => {
    return getDimensions(headerElement).height
}

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerShouldStick: false,
            headerHeight: 0
        }
    }
    setHeaderShouldStick(scrollTop) {
        const { headerShouldStick } = this.props
        this.setState({
            headerShouldStick: headerShouldStick(scrollTop + this.state.headerHeight, this.refs.header)
        })
    }
    componentDidMount() {
        this.setState({
            headerHeight: getHeaderHeight(this.refs.header)
        })
        events.on(root, 'scroll.throttle', e => {
            this.setHeaderShouldStick(e.scroll)
        })
    }
    componentWillUnmount() {
        events.off(root, 'scroll.throttle', e => {
            this.setHeaderShouldStick(e.scroll)
        })
    }

    render() {
        const headerClasses = classNames({
            'header': true,
            'header header--scroll-and-fix': this.state.headerShouldStick
        })
        return (
            <div className='Header'>
                <header ref='header' className={ headerClasses }>
                    <Nav />
                </header>
            </div>
        )
    }
}


//
// const Header = ({ scrollTop }) => {
//
//
//
//     return (
//         <div className='Header'>
//             <div className='header--scroll-and-fix--placeholder'></div>
//             <header className='header'>
//                 <Nav />
//             </header>
//         </div>
//     )
// }
//
// Header.propTypes = {}
//
// export default Header
