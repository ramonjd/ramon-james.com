import {expect, assert} from 'chai'
import configureStore from '../../app/configureStore'
import {
  PAGE_INVALID,
  PAGE_FETCHING,
  PAGE_FETCHED,
  PAGE_FETCH_FAILED
} from '../../app/actions/pages'

describe('store', () => {

    it('can set an intial state', () => {
        let store = configureStore({ pages: { test: 123 }})
        assert.deepEqual(store.getState().pages, { test: 123 })
    })

    it('it sets store state for PAGE_FETCHED', () => {

        let store = configureStore({
            pages: {}
        })

        store.dispatch({
            type: PAGE_FETCHED,
            pageId: 'test',
            result: 'bingo'
        })

        assert.deepEqual(store.getState().pages, {
            test: {
                content: 'bingo',
                readyState: PAGE_FETCHED
            }
        })
    })
})
