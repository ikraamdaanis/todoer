import { useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { firestore } from '../../firebase/config'

export const Home = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userTodosQuery = firestore
    .collection('users')
    .doc(userInfo?.id)
    .collection('todos')
  const [todos] = useCollection(userTodosQuery)

  useEffect(() => {
    if (!userInfo) history.push('/signin')
  }, [userInfo])

  return (
    <div>
      <h1>Home</h1>
      {todos?.docs.map(todo => (
        <p key={todo.id}>{todo.data().title}</p>
      ))}
    </div>
  )
}
