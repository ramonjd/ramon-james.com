
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
export default class AboutPage extends Component {

    static propTypes = {
        actions : PropTypes.objectOf(PropTypes.func).isRequired,
        pageContent : PropTypes.object
    }

    constructor(props) {
        super(props)
    }

    componentWillMount(){
      const { actions } = this.props
      actions.getPageData(urls.ABOUT)
    }

    render() {
        const { actions, pageContent } = this.props
        return (
            <div className="About">
              <Header />
              <h1>Aboussst</h1>
            </div>
        )
    }
}
