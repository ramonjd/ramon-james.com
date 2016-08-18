import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

if (process.env.WEBPACK_BUILD) {
    require('../styles/Footer.scss')
}

const Footer = () => {
    return (
        <div className='Footer'>
            <footer>
                <div className='flex__container--text flex__container--text--section'>
                    <h2 className='flex__container--text--item'>
                        Get in touch
                    </h2>
                    <div className='flex__container--text--item'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Email:</p>
                        <p>GitHub https://github.com/ramonjd/ramon-james.com</p>
                        <p>LinkedIn https://uk.linkedin.com/in/ramonjames</p>
                    </div>
                </div>
                <div className='container__svg' aria-hidden='true'>
                    <svg className='svg__mountain__base svg__mountain__base--left' width='50%' viewBox='0 0 1000 200' preserveAspectRatio='xMinYMin slice' >
                        <polygon id='mountain_left_1' points='3 199 976 199 834 112 567 113 314 72 313 73 192 89 2 53' fill='#1A4C68'/>
                    </svg>
                    <svg className='svg__mountain__base svg__mountain__base--left--over' width='50%' viewBox='0 0 1000 200' preserveAspectRatio='xMinYMin slice' >
                        <polygon id='mountain_left_3' points='3 199 976 199 834 112 567 113 314 72 313 73 192 89 2 53' fill='#909599'/>
                    </svg>

                    <svg className='svg__mountain__base svg__mountain__base--right' width='50%' viewBox='0 0 1000 200' preserveAspectRatio='xMinYMin slice' >
                        <polygon id='mountain_right_1' points='990 193 988 176 989 16 919 21 793 57 722 40 641 72 487 73 410 39 300 101 191 104 6 198' fill='#1A4C68'/>
                    </svg>
                    <svg className='svg__mountain__base svg__mountain__base--right--over' width='50%' viewBox='0 0 1000 200' preserveAspectRatio='xMinYMin slice' >
                        <polygon id='mountain_right_3' points='990 193 988 176 989 16 919 21 793 57 722 40 641 72 487 73 410 39 300 101 191 104 6 198' fill='#909599'/>
                    </svg>

                    <svg className='svg__rainbow' width='30%' viewBox='331 93 660 325' preserveAspectRatio='xMidYMid meet'>
                        <path d='M365,416a299.500417362,299.500417362,0,0,1,599,1' stroke='#1A4C68' id='rainbow_arc_1' />
                        <path d='M398,417a265.500522,265.500522,0,1,1,531,1' stroke='#D75461' id='rainbow_arc_2' />
                        <path d='M433,418a231.000685,231.000685,0,1,1,462,-1' stroke='#909599' id='rainbow_arc_3' />
                        <path d='M467,419a196.51059,196.51059,0,1,1,393,-4' stroke='#FBE5D3' id='rainbow_arc_4' />
                        <path d='M501,419a163.013435,163.013435,0,1,1,326,-4' stroke='#F7F2F9' id='rainbow_arc_5'/>
                    </svg>

                </div>
            </footer>
        </div>
    )
}

Footer.propTypes = {}

export default Footer
