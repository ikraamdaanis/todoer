import { useEffect } from 'react'

import { useSelector } from 'react-redux'

export const Home = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  useEffect(() => {
    console.log({ loading, error, userInfo })
    if (!userInfo) history.push('/signin')
  }, [loading, error, userInfo])
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
