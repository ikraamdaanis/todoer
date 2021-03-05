import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (path, exact, component) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return userInfo ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to='/signin' />
  )
}
