export const PAGE_INVALID = 'PAGE_INVALID'
export const PAGE_FETCHING = 'PAGE_FETCHING'
export const PAGE_FETCHED = 'PAGE_FETCHED'
export const PAGE_FETCH_FAILED = 'PAGE_FETCH_FAILED'

function fetchPage(pageId) {
    return (dispatch) => {
        dispatch({ type: PAGE_FETCHING, pageId })
        return fetch(`http://localhost:3000/pages/${pageId}.json`)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => dispatch({ type: PAGE_FETCHED, pageId, result }),
                (error) => dispatch({ type: PAGE_FETCH_FAILED, pageId, error })
            )
    }
}

function shouldFetchPage(state, pageId) {
    const page = state.pages[pageId]

    if (!page ||
        page.readyState === PAGE_FETCH_FAILED ||
        page.readyState === PAGE_INVALID) {
        return true
    }

    return false
}

export function fetchPageIfNeeded(pageId) {
    return (dispatch, getState) => {
        if (shouldFetchPage(getState(), pageId)) {
            return dispatch(fetchPage(pageId))
        }
        return false
    }
}
