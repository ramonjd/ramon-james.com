import React from 'react'

if (process.env.WEBPACK_BUILD) {
    require('../styles/VitruvianMan.scss')
}

const VitruvianMan = () => {
    return (
        <div className='VitruvianMan'>
            <svg className='svg--logo' x='0px' y='0px' viewBox='0 0 1024 768'>
                <title>Ramon James logo</title>
                <desc>Vitruvian man stick figure</desc>
                    <g className='svg__group--logo svg__group--logo--bg'>
                    <line className='svg__line--logo' x1='494.5' y1='360' x2='494.5' y2='506'/>
                    <line className='svg__line--logo' x1='530.5' y1='365' x2='530.5' y2='502'/>
                    <line className='svg__line--logo' x1='508.6' y1='380.5' x2='590.8' y2='298.4'/>
                    <line className='svg__line--logo' x1='515.5' y1='380.5' x2='429.5' y2='294.6'/>
                </g>
                <g className='svg__group--logo svg__group--logo--fg'>
                    <line className='svg__line--logo' x1='530.6' y1='358.6' x2='419' y2='470.2'/>
                    <line className='svg__line--logo' x1='494.5' y1='359.6' x2='604.1' y2='469.2'/>
                    <line className='svg__line--logo' x1='397' y1='372.5' x2='627' y2='372.5'/>
                    <circle className='svg__circle--logo' cx='512.1' cy='321' r='34.4'/>
                    <circle className='svg__circle--logo' cx='512' cy='384.6' r='122.4'/>
                </g>
            </svg>
        </div>
    )
}

VitruvianMan.propTypes = {
}

export default VitruvianMan
