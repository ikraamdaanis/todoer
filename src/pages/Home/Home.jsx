import { useState, useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { firestore } from '../../firebase/config'

export const Home = ({ history }) => {
  const [todosList, setTodoList] = useState([])

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const userTodosQuery = firestore
    .collection('users')
    .doc(userInfo?.id)
    .collection('todos')
  const [todos] = useCollection(userTodosQuery)

  useEffect(() => {
    if (userInfo) {
      todos?.docs.forEach(doc => setTodoList(todos => [...todos, doc.data()]))
    }
  }, [todos, userInfo])

  useEffect(() => {
    console.log({ loading, error, userInfo })
    if (!userInfo) history.push('/signin')
  }, [loading, error, userInfo])

  return (
    <div>
      <h1>Home</h1>
      {todosList.map(todo => (
        <p key={todo.title}>{todo.title}</p>
      ))}
    </div>
  )
}
