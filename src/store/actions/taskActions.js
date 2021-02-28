import { firestore } from '../../firebase/config'
import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
} from '../constants/taskConstants'

export const createTask = (project, task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .doc(task.id)
      .set(task)

    dispatch({
      type: TASK_CREATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: error,
    })
  }
}

export const deleteTask = (project, task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .doc(task)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
      })

    dispatch({
      type: TASK_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: error,
    })
  }
}
