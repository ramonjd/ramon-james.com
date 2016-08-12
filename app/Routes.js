import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'
import NoMatch from './containers/NoMatch'

export default (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path="*" component={NoMatch} />
    </Route>
)
