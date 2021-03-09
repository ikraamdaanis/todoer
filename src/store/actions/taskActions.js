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
    dispatch(getTaskStats())
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
    dispatch(getTaskStats())
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
    dispatch(getTaskStats())
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
    dispatch(getTaskStats())
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

export const getTaskStats = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_STATS_REQUEST,
    })

    const {
      userLogin: { userInfo },
      projectList: { projects },
    } = getState()

    const allProjectsQuery = []
    const allIncompleteTasks = {}

    await projects.forEach(proj => {
      allProjectsQuery.push(
        firestore
          .collection('users')
          .doc(userInfo?.id)
          .collection('projects')
          .doc(proj.title)
          .collection('tasks')
          .where('isComplete', '==', false)
          .get()
      )
    })

    Promise.all(allProjectsQuery)
      .then(results => {
        const allTasks = []
        results.forEach((project, index) => {
          const data = []
          project.docs.forEach(task => {
            data.push(task.data())
            allTasks.push(task.data())
          })
          allIncompleteTasks[projects[index].title] = data
        })
        allIncompleteTasks.Today = allTasks.filter(
          task => task.dueDate === format(new Date(), 'yyyy-MM-dd')
        )

        allIncompleteTasks.Upcoming = allTasks.filter(
          task =>
            new Date(task.dueDate) > new Date(format(new Date(), 'yyyy-MM-dd'))
        )
      })
      .then(() => {
        dispatch({
          type: TASK_STATS_SUCCESS,
          payload: allIncompleteTasks,
        })
      })
  } catch (error) {
    dispatch({
      type: TASK_STATS_FAIL,
      payload: error,
    })
  }
}
