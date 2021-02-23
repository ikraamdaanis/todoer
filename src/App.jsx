import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ScrollToTop } from './components'
import { Navbar } from './containers'
import { Home, SignIn, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'

export const App = () => {
  const [isClosed, setIsClosed] = useState(false)
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar setIsClosed={setIsClosed} />
        <ScrollToTop />
        <main>
          <Switch style={{ display: 'flex' }}>
            <Route
              exact
              path='/'
              render={props => <Home {...props} isClosed={isClosed} />}
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
