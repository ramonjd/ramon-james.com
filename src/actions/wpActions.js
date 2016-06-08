import * as actionTypes from '../constants/actionTypes'
import axios from 'axios'


function wpRequest() {
    return {
        type: actionTypes.WP_REQUEST
    }
}

function wpSuccess(data) {
    return {
        type: actionTypes.WP_SUCCESS,
        data
    }
}

function wpFailure() {
    return {
        type: actionTypes.WP_FAILURE
    }
}


export function getPageData(url) {
  return (dispatch, getState) => {
    dispatch(wpRequest())
    return axios
      .get(url)
      .then(res => dispatch(wpSuccess(res.data)))
      .catch(err => dispatch(wpFailure(err)))
  }
}
