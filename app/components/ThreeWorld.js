import React, { Component, Proptypes } from 'react'
import world from '../world/'
if (process.env.WEBPACK_BUILD) {
    require('../styles/ThreeWorld.scss')
}
export default class ThreeWorld extends Component {
    componentDidMount() {
        world()
    }
    render() {
        return (
            <div className="ThreeWorld">
                <div className="score" id="score">
                    <div className="score__content" id="level">
                        <div className="score__label">level</div>
                        <div className="score__value score__value--level" id="levelValue">1</div>
                        <svg className="level-circle" id="levelCircle" viewBox="0 0 200 200">
                        <circle id="levelCircleBgr" r="80" cx="100" cy="100" fill="none" stroke="#d1b790" strokeWidth="24px" />
                        <circle id="levelCircleStroke" r="80" cx="100" cy="100" fill="none" stroke="#68c3c0" strokeWidth="14px" strokeDasharray="502" />
                        </svg>
                    </div>
                    <div className="score__content" id="dist">
                        <div className="score__label">distance</div>
                        <div className="score__value score__value--dist" id="distValue">000</div>
                    </div>
                    <div className="score__content" id="energy">
                        <div className="score__label">energy</div>
                        <div className="score__value score__value--energy" id="energyValue">
                            <div className="energy-bar" id="energyBar"></div>
                        </div>
                    </div>
                </div>
                <div id="world"></div>
            </div>
        )
    }
}
