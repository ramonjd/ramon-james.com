import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Rainbow.scss')
}

const Rainbow = ({ scrollTriggered }) => {
    const rainbowClasses = classNames({
        'svg__rainbow': true,
        'svg__rainbow--active': scrollTriggered === true
    })
    return (
        <div className='Rainbow'>
            <svg className={ rainbowClasses } width='30%' viewBox='331 93 660 325' preserveAspectRatio='xMidYMid meet'>
                <path d='M365,416a299.500417362,299.500417362,0,0,1,599,1' stroke='#1A4C68' />
                <path d='M398,417a265.500522,265.500522,0,1,1,531,1' stroke='#D75461' />
                <path d='M433,418a231.000685,231.000685,0,1,1,462,-1' stroke='#909599' />
                <path d='M467,419a196.51059,196.51059,0,1,1,393,-4' stroke='#FBE5D3' />
                <path d='M501,419a163.013435,163.013435,0,1,1,326,-4' stroke='#F7F2F9' />
            </svg>
        </div>
    )
}

Rainbow.propTypes = {
    scrollTriggered: PropTypes.bool
}

export default Rainbow
