import { firestore } from '../../firebase/config'
import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
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
      .doc()
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
