import { useState } from 'react'
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

  return (
    <>
      <Router>
        <GlobalStyle />
        <Navbar setIsClosed={setIsClosed} />
        <ScrollToTop />
        <main>
          <Switch style={{ display: 'flex' }}>
            <Route path='/app'>
              {userInfo && <Redirect to='/app/today' />}
            </Route>
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
          </Switch>
        </main>
      </Router>
    </>
  )
}
