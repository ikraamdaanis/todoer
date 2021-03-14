import { firestore } from '../../firebase/config'
import {
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
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

    await firestore.collection('users').doc(userInfo?.id).collection('projects').doc(project).set({
      title: project,
      createdAt: new Date(),
      id: uuidv4(),
    })

    dispatch({
      type: PROJECT_CREATE_SUCCESS,
    })

    setTimeout(() => {
      dispatch({
        type: PROJECT_CREATE_REQUEST,
      })
    }, 300)
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload: error,
    })
  }
}

export const deleteProject = project => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .delete()
      .then(() => {
        console.log('Project successfully deleted!')
      })

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          firestore
            .collection('users')
            .doc(userInfo?.id)
            .collection('projects')
            .doc(project)
            .collection('tasks')
            .doc(doc.id)
            .delete()
        })
      })

    dispatch({
      type: PROJECT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
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
