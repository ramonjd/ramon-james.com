import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import AboutPage from './containers/AboutPage'
//import NotFoundPage from './components/NotFoundPage.js'
//
//    <Route path="*" component={NotFoundPage}/>
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
  </Route>
)
