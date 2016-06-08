
import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

export default class App extends Component {

    static propTypes = {
        children: PropTypes.element
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="App">
                <header role="banner">
                    <h1>App</h1>
                    <IndexLink to="/">Home</IndexLink>
                    <Link to="about">About</Link>

                </header>
            <main>
                {this.props.children}
            </main>
            </div>
        )
    }
}
