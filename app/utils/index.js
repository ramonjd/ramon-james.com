export function createMarkup(escapedString) {
    return { __html: escapedString }
}

export function isPageContentReady(page) {
    return page && page.content
}
