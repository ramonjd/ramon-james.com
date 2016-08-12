import React, { Component } from 'react'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Root.scss')
}

class Root extends Component {

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

    render() {
        const { head, content } = this.props

        return (
            <html>
                <head>
                    { head.title.toComponent() }
                    { head.meta.toComponent() }
                    { head.link.toComponent() }
                </head>
                <body>
                    <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
                    { this.renderEnvironment() }
                    { this.renderInitialState() }
                    { head.script.toComponent() }
                    <script src={process.env.NODE_ENV === 'development' ? '/app.js' : '/app.min.js'}></script>
                </body>
            </html>
        )
    }
}

export default Root
