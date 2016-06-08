import * as actionTypes from '../constants/actionTypes'
import initialState from './initialState'

export default function wp(state = initialState.wp, action) {
  switch (action.type) {
      case actionTypes.WP_REQUEST:
          return Object.assign({}, state, {
              isFetching: true
          })
      case actionTypes.WP_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              lastUpdated : new Date(),
              pageContent : action.data
          })
      default:
          return state
        }
}
