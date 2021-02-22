import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ScrollToTop } from './components'
import { Navbar } from './containers'
import { Home, SignIn, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path='/' render={Home} />
          <Route exact path='/signin' render={SignIn} />
          <Route exact path='/signup' render={SignUp} />
        </Switch>
      </Router>
    </>
  )
}
