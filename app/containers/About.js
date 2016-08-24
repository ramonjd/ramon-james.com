import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as PageActions from '../actions/pages'
import { getPage } from '../selectors/'
import { createMarkup, isPageContentReady, showConsoleMessage } from '../utils/'
import Loading from '../components/Loading'

if (process.env.WEBPACK_BUILD) {
    require('../styles/About.scss')
}

const pageId = 'about'

function mapStateToProps(state) {
    return {
        page: getPage(state.pages, pageId)
    }
}

@connect(mapStateToProps)
export default class About extends Component {

    static readyOnActions(dispatch) {
        return Promise.all([
            dispatch(PageActions.fetchPageIfNeeded(pageId))
        ])
    }

    componentDidMount() {
        About.readyOnActions(this.props.dispatch)
        showConsoleMessage()
    }

    renderPage() {
        const { page } = this.props
        if (!isPageContentReady(page)) {
            return (<Loading />)
        }
        return (
            <div className='container container__page'>
                <div>
                    <img className='img--bio-pic' src='/images/ramon-bio-pic.png' alt='Ramon bio pic' />
                    <h1 className='heading heading__page' dangerouslySetInnerHTML={ createMarkup(page.content.title) }></h1>
                </div>
                <article dangerouslySetInnerHTML={ createMarkup(page.content.body) }></article>
            </div>
            )
    }

    render() {
        return (
            <div className="About">
                <Helmet title='about' />
                { this.renderPage() }
            </div>
            )
    }
}
