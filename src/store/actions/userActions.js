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
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

export const signInAction = () => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    // const [user] = useAuthState(auth)
    // const usersQuery = firestore.collection('users')
    // const userTodosQuery = firestore
    //   .collection('users')
    //   .doc(user?.uid)
    //   .collection('todos')
    // const [users] = useCollection(usersQuery)
    // const [todos] = useCollection(userTodosQuery)

    // useEffect(() => {
    //   if (user) {
    //     todos?.docs.forEach(doc => console.log(doc.data()))
    //     users?.docs.forEach(doc => console.log(doc.data()))
    //   }
    // }, [todos, users])
    const user = {}
    const provider = new firebase.auth.GoogleAuthProvider()
    console.log('hi')
    await auth.signInWithPopup(provider).then(response => {
      console.log(response.user.displayName)
      user.id = response.user.uid
      user.name = response.user.displayName
      user.email = response.user.email
      user.photo = response.user.photoURL
    })

    // await firestore.collection('users').doc(auth.currentUser.uid).set({
    //   id: auth.currentUser.uid,
    //   name: auth.currentUser.displayName,
    //   email: auth.currentUser.email,
    //   photo: auth.currentUser.photoURL,
    // })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: 'Error',
    })
  }
}

export const logoutAction = () => dispatch => {
  auth.signOut().then(_ => console.log('Signed out'))
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/signin'
}

// export const register = (name, email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_REGISTER_REQUEST,
//     })

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//     const { data } = await axios.post(
//       '/api/users',
//       { name, email, password },
//       config
//     )

//     dispatch({
//       type: USER_REGISTER_SUCCESS,
//       payload: data,
//     })

//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     })

//     localStorage.setItem('userInfo', JSON.stringify(data))
//   } catch (error) {
//     dispatch({
//       type: USER_REGISTER_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }
