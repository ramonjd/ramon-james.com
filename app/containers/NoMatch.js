import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class NoMatch extends Component {
    render() {
        return (
            <div>
                <Helmet title='Not Found' />
                Page was not found
            </div>
        )
    }
}
