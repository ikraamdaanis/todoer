import {
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
} from '../constants/projectConstants'

export const projectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case PROJECT_CREATE_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      }
    case PROJECT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
