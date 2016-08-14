import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Hero from '../components/Hero'
import Header from '../components/Header'
import events from '../utils/dom-events.js'
import {
    addResizeListener,
    removeResizeListenter,
    addScrollListener,
    removeScrollListenter,
    getViewportSize,
    root } from '../utils/'

if (process.env.WEBPACK_BUILD) {
    require('../styles/App.scss')
}

class App extends Component {
    constructor(props) {
        super(props)
        this.headerShouldStick = this.headerShouldStick.bind(this)
        this.state = {
            heroHeight: 0
        }
    }

    componentDidMount() {
        addScrollListener()
        addResizeListener()
        this.setHeroHeight(getViewportSize())
        events.on(root, 'resize.debounced', e => {
            this.setHeroHeight(e.dimensions)
        })
    }

    componentWillUnmount() {
        events.off(root, 'resize.debounced', e => {
            this.setHeroHeight(e.dimensions)
        })
        removeScrollListenter()
        removeResizeListenter()
    }

    headerShouldStick(scrollTop, headerElement){
        //console.log(scrollTop, getDimensions(headerElement))
        // when scroll >= height of header
        return (scrollTop >= headerElement.offsetTop && scrollTop >= this.state.heroHeight) ? true : false
    }

    setHeroHeight(dimensions) {
        const { height } = dimensions
        if (height > 350) {
            this.setState({
                heroHeight: height
            })
        }
    }

    render() {
        const { location } = this.props
        console.log('location', location)
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
            <Hero heroHeight={ this.state.heroHeight }/>
            <Header headerShouldStick={ this.headerShouldStick }/>
            <main>
                { this.props.children }
            </main>
            <footer>Footer</footer>
          </div>
        )
    }
}

export default App
