import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ScrollToTop } from './components'
import { Navbar } from './containers'
import { Home, SignIn, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar />
        <ScrollToTop />
        <Switch>
          <Route exact path='/' render={props => <Home {...props} />} />
          <Route exact path='/signin' render={props => <SignIn {...props} />} />
          <Route exact path='/signup' render={props => <SignUp {...props} />} />
        </Switch>
      </Router>
    </>
  )
}
