import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as PageActions from '../actions/pages'
import { getPage } from '../selectors/'
import { createMarkup, isPageContentReady } from '../utils/'

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
    }

    renderPage(page) {
        return (
            <div>
                <div className='row flex__container'>
                    <article className='flex__container__item' dangerouslySetInnerHTML={ createMarkup(page.content.body) }></article>
                </div>
                <div className='row flex__container container__content--promos'>
                    <div className='flex__container__item block--color2'>
                        1
                    </div>
                    <div className='flex__container__item block--color2'>
                        2
                    </div>
                    <div className='flex__container__item block--color2'>
                        3
                    </div>
                    <div className='flex__container__item block--color2'>
                        4
                    </div>
                </div>

            </div>
        )
    }

    render() {
        const { page } = this.props
        if (!isPageContentReady(page)) {
            return (<p>Loading...</p>)
        }
        return (
            <div className='Home'>
                <Helmet title='home' />
                <div className='hero-module hero-module--home'>
                    <div className='flex__container--text flex__container--text--hero'>
                        <h1 className='flex__container--text--item'>
                            { page.content.title }
                            <small>{ page.content.slug }</small>
                        </h1>
                    </div>
                </div>
                { this.renderPage(page) }
            </div>
        )
    }
}
