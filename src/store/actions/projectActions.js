import { firestore } from '../../firebase/config'
import {
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
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
      .set({ title: project })

    // await firestore
    //   .collection('users')
    //   .doc(userInfo?.id)
    //   .collection('projects')
    //   .doc(project)
    //   .collection('todos')
    //   .doc()
    //   .set({ description: 'The First Todo' })

    let projects = null

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .get()
      .then(res => (projects = res.docs.map(docs => docs.id)))

    console.log(projects)

    dispatch({
      type: PROJECT_CREATE_SUCCESS,
      payload: projects,
    })
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload: error,
    })
  }
}
