import {
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_MODAL_TOGGLE,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_CLEAR,
  PROJECT_TASKS_DETAILS_REQUEST,
  PROJECT_TASKS_DETAILS_SUCCESS,
  PROJECT_TASKS_DETAILS_FAIL,
  PROJECT_TASKS_DETAILS_CLEAR,
} from '../constants/projectConstants'

export const projectCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PROJECT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case PROJECT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PROJECT_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const projectCreateModalReducer = (
  state = { isOpen: false },
  { type }
) => {
  switch (type) {
    case PROJECT_CREATE_MODAL_TOGGLE:
      return { isOpen: !state.isOpen }
    default:
      return state
  }
}

export const projectListReducer = (
  state = { projects: [] },
  { type, payload }
) => {
  switch (type) {
    case PROJECT_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case PROJECT_DETAILS_SUCCESS:
      return {
        loading: false,
        projects: payload,
      }
    case PROJECT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case PROJECT_DETAILS_CLEAR:
      return {}
    default:
      return state
  }
}

export const projectTasksReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PROJECT_TASKS_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case PROJECT_TASKS_DETAILS_SUCCESS:
      return {
        loading: false,
        tasks: payload,
      }
    case PROJECT_TASKS_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case PROJECT_TASKS_DETAILS_CLEAR:
      return {}
    default:
      return state
  }
}
