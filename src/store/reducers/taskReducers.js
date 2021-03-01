import {
  TASK_COMPLETE_FAIL,
  TASK_COMPLETE_REQUEST,
  TASK_COMPLETE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_MODAL_TOGGLE,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
} from '../constants/taskConstants'

export const taskReducer = (state = {}, action) => {
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
    case TASK_COMPLETE_REQUEST:
      return {
        loading: true,
      }
    case TASK_COMPLETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case TASK_COMPLETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TASK_DELETE_REQUEST:
      return {
        loading: true,
      }
    case TASK_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case TASK_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const taskDeleteModalReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case TASK_DELETE_MODAL_TOGGLE:
      return { isOpen: !state.isOpen }
    default:
      return state
  }
}
