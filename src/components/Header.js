
import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

export default class Header extends Component {
    render() {
        return (
          <header role="banner">
              <h1>App</h1>
              <IndexLink to="/">Home</IndexLink>
              <Link to="about">About</Link>
          </header>
        )
    }
}
