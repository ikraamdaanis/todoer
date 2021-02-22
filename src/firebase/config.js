import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyCmL-pX9YxvzWvTdGTM3-FR3h73hc-2z-w',
  authDomain: 'todoist-clone-f45be.firebaseapp.com',
  projectId: 'todoist-clone-f45be',
  storageBucket: 'todoist-clone-f45be.appspot.com',
  messagingSenderId: '48685736229',
  appId: '1:48685736229:web:dc52643f91914ee4ffbacc',
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()
