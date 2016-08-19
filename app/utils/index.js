import _throttle from 'lodash/throttle'
import _debounce from 'lodash/debounce'
import _each from 'lodash/each'

export function isClient() {
    return typeof document !== 'undefined'
}

const body = isClient() ? document.body : null

export function createMarkup(escapedString) {
    return { __html: escapedString }
}

export function isPageContentReady(page) {
    return page && page.content
}

export function getDimensions(element = body) {
    const dimensions = {}
    if (element) {
        const rect = element.getBoundingClientRect()
        dimensions.height = rect.bottom - rect.top
        dimensions.width = rect.right - rect.left
    }
    return dimensions
}

export function getViewportSize() {
    let element = window
    let prefix = 'inner'
    if (!('innerWidth' in element)) {
        prefix = 'client'
        element = document.documentElement || document.body
    }
    return {
        width: element[`${prefix}Width`],
        height: element[`${prefix}Height`]
    }
}

export function getDocumentHeight() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    )
}

export function getDocumentScrollTop() {
    return (isClient &&
        document.documentElement &&
        document.documentElement.scrollTop) || body && body.scrollTop
}

export function getPageFromLocation(location) {
    const splitPath = location.pathname.split('/')
    return splitPath[1] || 'home'
}

// const scroll = _throttle(() => {
//     events.emit(window, 'scroll.throttle', { scroll: body.scrollTop })
// }, 10)
//
// const resize = _debounce(() => {
//     events.emit(window, 'resize.debounced', { dimensions: getViewportSize() })
// , 100)
//
// export function addScrollListener() {
//     events.on(window, 'scroll', scroll)
// }
//
// export function removeScrollListenter() {
//     events.off(window, 'scroll', scroll)
// }
//
// export function addResizeListener() {
//     events.on(window, 'resize', resize)
// }
//
// export function removeResizeListenter() {
//     events.off(window, 'resize', resize)
// }
