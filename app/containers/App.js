import React, { Component } from 'react'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import { StickyContainer, Sticky } from 'react-sticky'
import Header from '../components/Header'

if (process.env.WEBPACK_BUILD) {
    require('../styles/App.scss')
}

class App extends Component {

    constructor(props) {
        super(props)
        this.handleStickyStateChange = this.handleStickyStateChange.bind(this)
        this.state = { headerStuck: false }
    }

    handleStickyStateChange(headerStuckState) {
        this.setState({ headerStuck: headerStuckState })
    }

    render() {
        const { location } = this.props
        console.log('location', location)
        const stickyClasses = classNames({
            'sticky--stuck': this.state.headerStuck === true
        })
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
            <StickyContainer>
                <Sticky topOffset={200} className={ stickyClasses } onStickyStateChange={ this.handleStickyStateChange }>
                    <Header headerStuck={ this.state.headerStuck }/>
                </Sticky>
                <main>
                    { this.props.children }
                </main>
                <footer>Footer</footer>
            </StickyContainer>
          </div>
        )
    }
}

export default App
