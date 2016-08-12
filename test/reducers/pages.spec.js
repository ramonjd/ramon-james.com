import {expect, assert} from 'chai'
import pages from '../../app/reducers/pages'
import {
  PAGE_INVALID,
  PAGE_FETCHING,
  PAGE_FETCHED,
  PAGE_FETCH_FAILED
} from '../../app/actions/pages'


describe('page reducers', () => {
    it('should return the initial state', () => {
        expect(
            pages(undefined, {})
        ).to.deep.equal({})
    })


    it('should handle PAGE_FETCHED', () => {
        expect(
            pages(undefined, {
                type: PAGE_FETCHED,
                result: 12345,
                pageId: 'goat'
            })
        ).to.deep.equal({
            goat: {
               content: 12345,
               readyState: PAGE_FETCHED
          }
        })
    })

    it('should handle PAGE_FETCH_FAILED', () => {
        expect(
            pages(undefined, {
                type: PAGE_FETCH_FAILED,
                error: 12345,
                pageId: 'goat',
                error: 'cat'
            })
        ).to.deep.equal({
            goat: {
               readyState: PAGE_FETCH_FAILED,
               error: 'cat'
          }
        })
    })

    it('should handle PAGE_FETCHING', () => {
        expect(
            pages(undefined, {
                type: PAGE_FETCHING,
                pageId: 'goat'
            })
        ).to.deep.equal({
            goat: {
               readyState: PAGE_FETCHING,
          }
        })
    })
})
