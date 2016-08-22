import React, { Component } from 'react'
import config from '../config/'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Root.scss')
}

export default class Root extends Component {

    renderInitialState() {
        const { initialState } = this.props
        if (initialState) {
            const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`
            return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />
        }
        return null
    }

    renderEnvironment() {
        const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`
        return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />
    }

    renderVendorJS() {
        return <script src='/vendor.min.js'></script>
    }

    renderCSS() {
        return <link href='/app.css' rel='stylesheet' type='text/css' />
    }

    render() {
        const { head, content } = this.props

        return (
            <html>
                <head>
                    { head.title.toComponent() }
                    { head.meta.toComponent() }
                    { head.link.toComponent() }
                    <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
                    <link rel='icon' type='image/png' href='/images/favicon.png' />
                    <meta name='description' content={ config.siteContent.description } />
                    <meta name='keywords' content={ config.siteContent.keywords } />
                    { process.env.NODE_ENV === 'production' ? this.renderCSS() : null }
                </head>
                <body>
                    <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
                    { this.renderEnvironment() }
                    { this.renderInitialState() }
                    { head.script.toComponent() }
                    { process.env.NODE_ENV === 'production' ? this.renderVendorJS() : null }
                    <script src={ process.env.NODE_ENV === 'development' ? '/app.js' : '/app.min.js' }></script>
                </body>
            </html>
        )
    }
}
