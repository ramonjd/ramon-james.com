import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as PageActions from '../actions/pages'
import { getPage } from '../selectors/'
import { createMarkup, isPageContentReady } from '../utils/'

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
    }

    renderPage() {
        const { page } = this.props
        if (!isPageContentReady(page)) {
            return <p>Loading...</p>
        }
        return (
            <div className='container'>
                <div>
                    <h1>{ page.content.title }</h1>
                </div>
                <article dangerouslySetInnerHTML={ createMarkup(page.content.body) }></article>
            </div>
            )
    }

    render() {
        return (
            <div className="About">
                <Helmet title='about' />
                <div className='hero-module hero-module--about'></div>
                { this.renderPage() }
            </div>
            )
    }
}