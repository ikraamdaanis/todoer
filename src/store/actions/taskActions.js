import { format } from 'date-fns'
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
  TASK_STATS_REQUEST,
  TASK_STATS_SUCCESS,
  TASK_STATS_FAIL,
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

export const completeTask = (task, project) => async (dispatch, getState) => {
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

export const incompleteTask = (task, project) => async (dispatch, getState) => {
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
      .update({ isComplete: false })
      .then(() => {
        console.log('Document successfully not completed!')
      })

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

export const deleteTask = (task, project) => async (dispatch, getState) => {
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
    const allTasks = []

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
        results.forEach(project =>
          project.docs.forEach(doc => allTasks.push(doc.data()))
        )
      })
      .then(() => {
        dispatch({
          type: TASKS_SUCCESS,
          payload: allTasks,
        })
      })
  } catch (error) {
    dispatch({
      type: TASKS_FAIL,
      payload: error,
    })
  }
}

export const getTaskStats = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_STATS_REQUEST,
    })

    const {
      userLogin: { userInfo },
      projectList: { projects },
    } = getState()

    const allTasks = []
    await projects.forEach(proj => {
      firestore
        .collection('users')
        .doc(userInfo?.id)
        .collection('projects')
        .doc(proj.title)
        .collection('tasks')
        .onSnapshot(snapshot => {
          const data = []
          snapshot.docs.forEach(task => {
            const currentTask = task.data()
            const taskExists = allTasks.find(item => item.id === task.id)

            if (taskExists && currentTask.project) {
              const index = allTasks.findIndex(item => item.id === task.id)
              allTasks[index] = { ...taskExists, ...currentTask }
              data.push({ ...taskExists, ...currentTask })
            } else {
              allTasks.push(currentTask)
              data.push(currentTask)
            }
          })

          dispatch({
            type: TASK_STATS_SUCCESS,
            payload: {
              [proj.title]: data,
            },
          })

          dispatch({
            type: TASK_STATS_SUCCESS,
            payload: {
              overdue: allTasks.filter(
                task =>
                  task.dueDate &&
                  task.dueDate !== format(new Date(), 'yyyy-MM-dd') &&
                  new Date(task.dueDate) <
                    new Date(format(new Date(), 'yyyy-MM-dd'))
              ),

              today: allTasks.filter(
                task => task.dueDate === format(new Date(), 'yyyy-MM-dd')
              ),

              upcoming: allTasks.filter(
                task =>
                  new Date(task.dueDate) >
                  new Date(format(new Date(), 'yyyy-MM-dd'))
              ),
            },
          })
        })
    })
  } catch (error) {
    dispatch({
      type: TASK_STATS_FAIL,
      payload: error,
    })
  }
}
