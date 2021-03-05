import firebase from 'firebase/app'
import { firestore } from '../../firebase/config'
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

export const createTask = (project, task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    console.log({ project })

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .doc(task.id)
      .set(task)

    const increment = firebase.firestore.FieldValue.increment(1)

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .update({ completedTasks: increment })

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

export const completeTask = (project, task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_COMPLETE_REQUEST,
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
      .update({ isComplete: true })
      .then(() => {
        console.log('Document successfully completed!')
      })

    const decrement = firebase.firestore.FieldValue.increment(-1)

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .update({ completedTasks: decrement })

    dispatch({
      type: TASK_COMPLETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: TASK_COMPLETE_FAIL,
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

    console.log(project, task)

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

export const getAllTasks = search => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASKS_REQUEST,
    })

    const {
      userLogin: { userInfo },
      projectList: { projects },
    } = getState()

    const queries = []
    const all = []

    const { field, condition, query } = search

    projects.forEach(proj => {
      queries.push(
        firestore
          .collection('users')
          .doc(userInfo?.id)
          .collection('projects')
          .doc(proj.title)
          .collection('tasks')
          .where(field, condition, query)
          .get()
      )
    })

    Promise.all(queries)
      .then(results => {
        results.forEach(i => i.docs.forEach(doc => all.push(doc.data())))
      })
      .then(() => {
        dispatch({
          type: TASKS_SUCCESS,
          payload: all,
        })
      })
  } catch (error) {
    dispatch({
      type: TASKS_FAIL,
      payload: error,
    })
  }
}
