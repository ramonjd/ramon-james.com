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

// export function handleMouseMove(event) {
//     return  { x: event.clientX, y: event.clientY }
// }
//
// export function handleTouchMove(event) {
//     event.preventDefault();
//     return { x: event.touches[0].pageX, y: event.touches[0].pageY }
// }
