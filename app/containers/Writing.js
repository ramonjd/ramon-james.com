import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as PageActions from '../actions/pages'
import { getPage } from '../selectors/'
import { createMarkup, isPageContentReady, showConsoleMessage } from '../utils/'
import Loading from '../components/Loading'

const pageId = 'writing'

function mapStateToProps(state) {
    return {
        page: getPage(state.pages, pageId)
    }
}

@connect(mapStateToProps)
export default class Writing extends Component {

    static readyOnActions(dispatch) {
        return Promise.all([
            dispatch(PageActions.fetchPageIfNeeded(pageId))
        ])
    }

    componentDidMount() {
        Writing.readyOnActions(this.props.dispatch)
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
                    <h1 className='heading heading__page' dangerouslySetInnerHTML={ createMarkup(page.content.title) }></h1>
                </div>
                <article dangerouslySetInnerHTML={ createMarkup(page.content.body) }></article>
            </div>
            )
    }

    render() {
        return (
            <div className="Writing">
                <Helmet title='writing' />
                { this.renderPage() }
            </div>
            )
    }
}
