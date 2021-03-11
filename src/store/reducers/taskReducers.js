import {
  TASK_COMPLETE_FAIL,
  TASK_COMPLETE_REQUEST,
  TASK_COMPLETE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAIL,
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

export const taskListReducer = (
  state = { tasks: { today: [], upcoming: [] } },
  { type, payload }
) => {
  switch (type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case TASKS_SUCCESS:
      return {
        loading: false,
        tasks: { ...state.tasks, ...payload },
      }
    case TASKS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
