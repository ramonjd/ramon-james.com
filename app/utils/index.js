import _throttle from 'lodash/throttle'
import _debounce from 'lodash/debounce'
import _each from 'lodash/each'

const isClient = typeof document !== 'undefined'
const body = isClient ? document.body : null

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
    let e = window
    let a = 'inner'
    if (!('innerWidth' in window)) {
        a = 'client'
        e = document.documentElement || document.body
    }
    return {
        width: e[`${a}Width`],
        height: e[`${a}Height`]
    }
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