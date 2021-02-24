import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
} from '../constants/taskConstants'

export const taskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return {
        loading: true,
      }
    case TASK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case TASK_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
