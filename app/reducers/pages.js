import {
    PAGE_INVALID,
    PAGE_FETCHING,
    PAGE_FETCHED,
    PAGE_FETCH_FAILED
} from '../actions/pages'

export default function pages(state = {}, action) {
    switch (action.type) {
        case PAGE_FETCHING:
            return Object.assign({}, state, {
                [action.pageId]: {
                    readyState: PAGE_FETCHING
                }
            })
        case PAGE_FETCH_FAILED:
            return Object.assign({}, state, {
                [action.pageId]: {
                    readyState: PAGE_FETCH_FAILED,
                    error: action.error
                }
            })
        case PAGE_FETCHED:
            return Object.assign({}, state, {
                [action.pageId]: {
                    readyState: PAGE_FETCHED,
                    content: action.result
                }
            })
        default:
            return state
    }
}
