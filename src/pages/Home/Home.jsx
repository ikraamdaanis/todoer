import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const Home = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) history.push('/signin')
  }, [userInfo])

  return <div></div>
}
