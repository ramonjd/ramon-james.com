import React from 'react'
import { createMarkup, isPageContentReady } from '../utils/'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Loading.scss')
}
const Loading = () => {
    return (
        <div className='Loading'>
            <div className='flex__container--text'>
                <div>
                    <i className='material-icons md-24 icon__loading--animated icon__loading--animated--left'>format_align_right</i>
                    <small>Loading...</small>
                    <i className='material-icons md-24 icon__loading--animated icon__loading--animated--right'>format_align_left</i>
                </div>
            </div>
        </div>
    )
}
Loading.propTypes = {}
export default Loading
