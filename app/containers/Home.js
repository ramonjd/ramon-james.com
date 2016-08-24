import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as PageActions from '../actions/pages'
import { getPage } from '../selectors/'
import { isPageContentReady, showConsoleMessage } from '../utils/'
import classNames from 'classnames'
import Loading from '../components/Loading'
import HomePromos from '../components/HomePromos'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Home.scss')
}

const pageId = 'home'

function mapStateToProps(state) {
    return {
        page: getPage(state.pages, pageId)
    }
}

@connect(mapStateToProps)
export default class Home extends Component {

    static readyOnActions(dispatch) {
        return Promise.all([
            dispatch(PageActions.fetchPageIfNeeded(pageId))
        ])
    }

    componentDidMount() {
        Home.readyOnActions(this.props.dispatch)
        const Vivus = require('vivus')
        const backgroundSvg = new Vivus(
            'svg-container-home',
            {
                duration: 1000,
                file: '/svg/bg.svg',
                onReady: (obj) => {
                    console.log(obj)
                    obj.parentEl.style.opacity = 0.75
                }
            })
        showConsoleMessage()    
    }

    render() {
        const { page } = this.props
        if (!isPageContentReady(page)) {
            return (<Loading />)
        }
        return (
            <div className='Home'>
                <Helmet title='home' />
                <div id='svg-container-home' />
                <div className='hero-module hero-module--home'>
                    <div className='flex__container--text flex__container--text--hero'>
                        <h1 className='flex__container--text--item'>
                            { page.content.title }
                            <small>{ page.content.slug }</small>
                        </h1>
                    </div>
                </div>
                <HomePromos page={ page }/>
            </div>
        )
    }
}
