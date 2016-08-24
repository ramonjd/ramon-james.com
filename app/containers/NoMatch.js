import React, { Component } from 'react'
import Helmet from 'react-helmet'
if (process.env.WEBPACK_BUILD) {
    require('../styles/NoMatch.scss')
}
export default class NoMatch extends Component {
    render() {
        return (
            <div className='NoMatch'>
                <Helmet title='Not Found' />
                <section className='flex__container--text flex__container--text--section'>
                    <h1 className='flex__container--text--item heading__section--h1'>
                        404
                    </h1>
                    <img className='img--404' src='/images/rampant-onion.jpg' alt='Rampant Onion says 404!' />
                </section>
            </div>
        )
    }
}
