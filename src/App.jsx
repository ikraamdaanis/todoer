import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { ScrollToTop } from './components'
import { Dashboard, Navbar } from './containers'
import { Home, SignIn, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'

export const App = () => {
  const [isClosed, setIsClosed] = useState(false)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar setIsClosed={setIsClosed} />
        <ScrollToTop />
        <main>
          <Switch style={{ display: 'flex' }}>
            {/* <Route exact path='/app'>
              {userInfo && <Redirect to='/app/today' />}
            </Route> */}
            <Route
              path='/app/:id'
              render={props => <Dashboard {...props} isClosed={isClosed} />}
            />
            <Route
              exact
              path='/signin'
              render={props => <SignIn {...props} />}
            />
            <Route
              exact
              path='/signup'
              render={props => <SignUp {...props} />}
            />
            <Route exact path='/'>
              {userInfo && <Redirect to='/app/today' />}
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  )
}
