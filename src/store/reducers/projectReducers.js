import {
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_DETAILS_CLEAR,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_TASKS_DETAILS_CLEAR,
  PROJECT_TASKS_DETAILS_FAIL,
  PROJECT_TASKS_DETAILS_REQUEST,
  PROJECT_TASKS_DETAILS_SUCCESS,
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
        success: true,
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

export const allProjectsDetailsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case PROJECT_DETAILS_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      }
    case PROJECT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PROJECT_DETAILS_CLEAR:
      return {}
    default:
      return state
  }
}

export const projectTasksDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_TASKS_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case PROJECT_TASKS_DETAILS_SUCCESS:
      return {
        loading: false,
        tasks: [action.payload],
      }
    case PROJECT_TASKS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PROJECT_TASKS_DETAILS_CLEAR:
      return {}
    default:
      return state
  }
}
