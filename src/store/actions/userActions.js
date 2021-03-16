import { auth, firestore } from '../../firebase/config'
import firebase from 'firebase/app'
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants'
import { PROJECT_DETAILS_CLEAR } from '../constants/projectConstants'
import { v4 as uuidv4 } from 'uuid'

export const registerAction = (googleSignIn, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const user = {}

    if (googleSignIn) {
      const provider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(provider).then(response => {
        user.id = response.user.uid
        user.name = response.user.displayName
        user.email = response.user.email
        user.photo = response.user.photoURL
        user.createdAt = new Date()
      })
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log(auth.currentUser)
          user.id = userCredential.user.uid
          user.name = userCredential.user.email.split('@')[0]
          user.email = userCredential.user.email
          user.photo = 'https://i.stack.imgur.com/34AD2.jpg'
          user.createdAt = new Date()
        })
        .catch(error => {
          console.log(error.message)
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message,
          })
        })
    }

    await firestore.collection('users').doc(auth.currentUser.uid).set(user)

    await firestore.collection('users').doc(user.id).collection('projects').doc('Inbox').set({
      title: 'Inbox',
      createdAt: new Date(),
      id: uuidv4(),
    })

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: user,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })

    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    })
  }
}

export const signInAction = () => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const user = {}
    const provider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(provider).then(response => {
      console.log(response.user.displayName)
      user.id = response.user.uid
      user.name = response.user.displayName
      user.email = response.user.email
      user.photo = response.user.photoURL
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })

    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    })
  }
}

export const logoutAction = () => dispatch => {
  auth.signOut().then(_ => console.log('Signed out'))
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: PROJECT_DETAILS_CLEAR })
  document.location.href = '/login'
  localStorage.removeItem('userInfo')
  localStorage.removeItem('allProjects')
}
