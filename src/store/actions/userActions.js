import { auth, firestore } from '../../config/firebase'
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

    const registerSuccess = async user => {
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
    }

    if (googleSignIn) {
      const provider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(provider).then(response => {
        registerSuccess({
          id: response.user.uid,
          name: response.user.displayName,
          email: response.user.email,
          photo: response.user.photoURL,
          createdAt: new Date(),
        })
      })
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          registerSuccess({
            id: userCredential.user.uid,
            name: userCredential.user.email.split('@')[0],
            email: userCredential.user.email,
            photo: 'https://i.stack.imgur.com/34AD2.jpg',
            createdAt: new Date(),
          })
        })
        .catch(error => {
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message,
          })
        })
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    })
  }
}

export const signInAction = (googleSignIn, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const loginSuccess = user => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
      })
      localStorage.setItem('userInfo', JSON.stringify(user))
    }

    if (googleSignIn) {
      const provider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(provider).then(response => {
        loginSuccess({
          id: response.user.uid,
          name: response.user.displayName,
          email: response.user.email,
          photo: response.user.photoURL,
        })
      })
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          loginSuccess({
            id: userCredential.user.uid,
            name: userCredential.user.displayName,
            email: userCredential.user.email,
            photo: 'https://i.stack.imgur.com/34AD2.jpg',
          })
        })
        .catch(error => {
          dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message,
          })
        })
    }
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
