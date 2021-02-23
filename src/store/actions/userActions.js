import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants'
import { auth, firestore } from '../../firebase/config'
import firebase from 'firebase/app'

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
  document.location.href = '/signin'
  localStorage.removeItem('userInfo')
}

export const registerAction = () => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const user = {}
    const provider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(provider).then(response => {
      user.id = response.user.uid
      user.name = response.user.displayName
      user.email = response.user.email
      user.photo = response.user.photoURL
    })

    await firestore.collection('users').doc(auth.currentUser.uid).set(user)

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
