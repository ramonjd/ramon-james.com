import _throttle from 'lodash/throttle'
import _debounce from 'lodash/debounce'
import events from './dom-events'

export const root = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global) || this
const body = root.document ? root.document.body : {}

export function createMarkup(escapedString) {
    return { __html: escapedString }
}

export function isPageContentReady(page) {
    return page && page.content
}

export function getDimensions(element = body) {
    if (element) {
        const rect = element.getBoundingClientRect()
        return {
            height: rect.bottom - rect.top,
            width: rect.right - rect.left
        }
    }
}

export function getViewportSize(){
    let e = root
    let a = 'inner'
    if (!('innerWidth' in root )) {
      a = 'client'
      e = root.document.documentElement || root.document.body
    }
    return { width : e[ `${a}Width` ] , height : e[ `${a}Height` ] }
}

export function getDocumentScrollTop() {
    return (root.document && root.document.documentElement && root.document.documentElement.scrollTop) || body && body.scrollTop
}

const scroll = _throttle(() => {
    events.emit(root, 'scroll.throttle', { scroll: body.scrollTop })
}, 10)

const resize = _debounce(() => {
    events.emit(root, 'resize.debounced', { dimensions: getViewportSize() })
}, 100)

export function addScrollListener() {
    events.on(root, 'scroll', scroll)
}
export function removeScrollListenter() {
    events.off(root, 'scroll', scroll)
}

export function addResizeListener() {
    events.on(root, 'resize', resize)
}
export function removeResizeListenter() {
    events.off(root, 'resize', resize)
}
