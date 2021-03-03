import { firestore } from '../../firebase/config'
import {
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_MODAL_TOGGLE,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_TASKS_DETAILS_REQUEST,
  PROJECT_TASKS_DETAILS_SUCCESS,
  PROJECT_TASKS_DETAILS_FAIL,
} from '../constants/projectConstants'
import { v4 as uuidv4 } from 'uuid'

export const createProject = project => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .set({
        title: project,
        createdAt: new Date(),
        id: uuidv4(),
      })

    dispatch({
      type: PROJECT_CREATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload: error,
    })
  }
}

export const getAllProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .orderBy('createdAt')
      .onSnapshot(querySnapshot => {
        const data = []
        querySnapshot.forEach(doc => {
          data.push(doc.data())
        })
        dispatch({
          type: PROJECT_DETAILS_SUCCESS,
          payload: data,
        })
        localStorage.setItem('allProjects', JSON.stringify(data))
      })
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: error,
    })
  }
}

export const getProjectTasks = project => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_TASKS_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .orderBy('createdAt')
      .onSnapshot(querySnapshot => {
        const queryTasks = []
        querySnapshot.forEach(doc => {
          queryTasks.push(doc.data())
        })
        dispatch({
          type: PROJECT_TASKS_DETAILS_SUCCESS,
          payload: queryTasks,
        })
      })
  } catch (error) {
    dispatch({
      type: PROJECT_TASKS_DETAILS_FAIL,
      payload: error,
    })
  }
}
