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
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAIL,
  TASKS_CLEAR,
} from '../constants/taskConstants'

export const taskReducer = (state = {}, { type, payload }) => {
  switch (type) {
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
        error: payload,
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
        error: payload,
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
        error: payload,
      }
    default:
      return state
  }
}

export const taskListReducer = (state = { tasks: [] }, { type, payload }) => {
  switch (type) {
    case TASKS_REQUEST:
      return {
        loading: true,
      }
    case TASKS_SUCCESS:
      return {
        loading: false,
        tasks: payload,
      }
    case TASKS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case TASKS_CLEAR:
      return {}
    default:
      return state
  }
}
