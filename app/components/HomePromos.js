import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { createMarkup } from '../utils/'

if (process.env.WEBPACK_BUILD) {
    require('../styles/HomePromos.scss')
}

const HomePromos = ({ page }) => {
    const flexContainerItemClasses = classNames({
        'flex__container__item block--background--color5': true
    })
    return (
        <div className='HomePromos'>
            <div className='container container__page--home'>
                <div className='row row--margin flex__container'>
                    <article className='flex__container__item' dangerouslySetInnerHTML={ createMarkup(page.content.body) }></article>
                </div>
                <div className='flex__container--text flex__container--text--section'>
                    <h2 className='flex__container--text--item heading__section--h2'>
                        Work
                    </h2>
                </div>
                <div className='row flex__container container__content--promos'>
                    <div className={ flexContainerItemClasses }>
                        <a href='/writing'>
                            <div className='block__promo'>
                                <div className='block__promo--content'>
                                    <h3>Sandbanker</h3>
                                    <p>A novel</p>
                                </div>
                            </div>
                            <img src='/images/sandbanker.jpg' alt='Abstract beach background for Sandbanker - A coming of age novel'/>
                        </a>
                    </div>
                    <div className={ flexContainerItemClasses }>
                        <a href='http://illustratedshorts.com/category/short-stories/'>
                            <div className='block__promo'>
                                <div className='block__promo--content'>
                                    <h3>Short stories</h3>
                                    <p>Shorts, flash fiction, poetry <i className='material-icons md-inline'>launch</i></p>
                                </div>
                            </div>
                            <img src='/images/victorian-gentleman-wearing-shorts.jpg' alt='Victorian Gentleman wearing shorts'/>
                        </a>
                    </div>
                </div>
                <div className='row flex__container container__content--promos'>
                    <div className={ flexContainerItemClasses }>
                        <a href='http://illustratedshorts.com/the-bubble-my-first-and-befittingly-ignored-entry-to-the-2015-observercapecomica-graphic-short-story-competition/'>
                            <div className='block__promo'>
                                <div className='block__promo--content'>
                                    <h3>The Bubble</h3>
                                    <p>When will it burst? <i className='material-icons md-inline'>launch</i></p>
                                </div>
                            </div>
                            <img src='/images/the-bubble.jpg' alt='The Bubble - Entry to the Observer Comic Competition'/>
                        </a>
                    </div>
                    <div className={ flexContainerItemClasses }>
                        <a href='http://illustratedshorts.com/illustrations/'>
                            <div className='block__promo'>
                                <div className='block__promo--content'>
                                    <h3>Illustration</h3>
                                    <p className='block--animate--right'>Doodles and digital art <i className='material-icons md-inline'>launch</i></p>
                                </div>
                            </div>
                            <img src='/images/amsterdam.jpg' alt='Amsterdam rides a bike'/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

HomePromos.propTypes = {
    page: PropTypes.object
}

export default HomePromos
