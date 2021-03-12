import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { PrivateRoute, ScrollToTop } from './components'
import { Dashboard, Navbar } from './containers'
import { Home, SignIn, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'

export const App = () => {
  const [sidebarClosed, setSidebarClosed] = useState(false)

  return (
    <>
      <Router>
        <GlobalStyle />
        <Navbar setSidebarClosed={setSidebarClosed} />
        <ScrollToTop />
        <main>
          <Switch style={{ display: 'flex' }}>
            <PrivateRoute
              path='/app'
              exact
              component={Dashboard}
              sidebarClosed={sidebarClosed}
            />
            <PrivateRoute
              path='/app/:id'
              exact
              component={Dashboard}
              sidebarClosed={sidebarClosed}
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
            <PrivateRoute path='/' component={Redirect} to='/app/inbox' />
          </Switch>
        </main>
      </Router>
    </>
  )
}
