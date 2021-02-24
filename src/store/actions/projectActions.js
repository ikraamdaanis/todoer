import firebase from 'firebase/app'
import { firestore } from '../../firebase/config'
import {
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
} from '../constants/projectConstants'

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

    const projects = []

    firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .onSnapshot(snap => {
        snap.forEach(doc => {
          projects.push(doc.data())
          console.log(doc.data())
        })
      })

    console.log(projects)

    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: projects,
    })
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: error,
    })
  }
}
