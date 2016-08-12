import { createSelector } from 'reselect'

const getPageFilter = (state, pageId) => {
    return state[pageId]
}

export const getPage = createSelector(
    [getPageFilter],
    (page) => {
        return page
    }
)
