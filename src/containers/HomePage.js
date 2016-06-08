
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as wpActions  from '../actions/wpActions'
import { Link, IndexLink } from 'react-router'
import * as urls from '../constants/urls'
import Header from '../components/Header'

function mapStateToProps(state) {
    const { wp } = state
    return {
        wp
    }
}

function mapDispatchToProps(dispatch) {
    return { actions : bindActionCreators(wpActions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {

    static propTypes = {
        actions : PropTypes.objectOf(PropTypes.func).isRequired,
        pageContent : PropTypes.object
    }

    constructor(props) {
        super(props)
        this.renderHeader = this.renderHeader.bind(this)
    }

    componentWillMount(){
      const { actions } = this.props
      actions.getPageData(urls.HOME)
    }

    renderHeader(){
      const { wp } = this.props
      return (
        <h1>{ wp.pageContent.author.description }</h1>
      )
    }

    render() {
        const { wp } = this.props
        return (
            <div className="Home">
              <Header />
              { wp.pageContent ? this.renderHeader() : <img src="img/favicon.png" /> }
            </div>
        )
    }
}
