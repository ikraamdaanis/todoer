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
      })
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: error,
    })
  }
}
