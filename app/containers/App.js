import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Granim from 'granium'
import Header from '../components/Header'
import Footer from '../components/Footer'

import {
    getPageFromLocation
} from '../utils/'

if (process.env.WEBPACK_BUILD) {
    require('../styles/App.scss')
}

class App extends Component {
    componentDidMount() {
        const granimInstance = new Granim({
            element: '#background-animated-gradient',
            name: 'background-animated-gradient',
            direction: 'top-bottom',
            opacity: [1, 1],
            isPausedWhenNotInView: true,
            states : {
              'default-state': {
                  gradients: [
                      ['#AA076B', '#61045F'],
                      ['#02AAB0', '#00CDAC'],
                      ['#DA22FF', '#9733EE']
                  ]
              }
            }
        })
    }
    componentWillUnmount() {}
    render() {
        const { location } = this.props
        const currentPage = getPageFromLocation(location)
        return (
          <div className='App'>
            <Helmet
              title='ramon james'
              titleTemplate='ramon james - %s'
              meta={[
                { 'char-set': 'utf-8' },
                { 'name': 'description', 'content': 'Writer, lawyer, web developer and other stuff' }
              ]}
            />
            <Header currentPage={ currentPage } />
            <main>
                { this.props.children }
            </main>
            <Footer />
          </div>
        )
    }
}

export default App
