import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PrivateRoute = ({
  path,
  exact,
  component: Component,
  ...restProps
}) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return userInfo ? (
    <Route
      path={path}
      exact={exact}
      render={props => <Component {...props} {...restProps} />}
    />
  ) : (
    <Redirect to='/signin' />
  )
}
