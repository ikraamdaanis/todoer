import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Dashboard, Sidebar } from '../../containers/'

export const Home = ({ history, match, isClosed }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) history.push('/signin')
  }, [userInfo])

  return (
    <div>
      <Sidebar isClosed={isClosed} />
      <Dashboard isClosed={isClosed} match={match} />
    </div>
  )
}
