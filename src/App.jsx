import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { PrivateRoute, ScrollToTop } from './components'
import { Dashboard, Navbar } from './containers'
import { SignIn, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'

export const ThemeContext = createContext()

export const App = () => {
  const [sidebarClosed, setSidebarClosed] = useState(false)
  const [darkTheme, setDarkTheme] = useState(true)

  const dark = {
    themeColour: '#282828',
    background: '#1f1f1f',
    foreground: '#282828',
    taskForm: '#171717',
    textColour: 'hsla(0,0%,100%,0.87)',
    textSecondary: '#aaa',
    textTertiary: 'hsla(0,0%,100%,0.56)',
    active: '#363636',
    border: 'hsla(0, 0%, 100%, 0.1)',
    lightRed: '#de4c4a',
    hoverTransparent: 'hsla(0,0%,100%,.2)',
    navColour: 'unset',
    inputColour: '#202020',
    boxShadow: '0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%)',
    complete: '#808080',
    completeHover: '#4b4b4b',
    scrollbarTrack: '#181818',
  }

  const light = {
    themeColour: '#DB4C40',
    background: '#fff',
    foreground: '#fafafa',
    taskForm: '#fff',
    textColour: '#202020',
    textSecondary: '#aaa',
    textTertiary: '#808080',
    active: '#ececec',
    border: '#dcdcdc',
    lightRed: '#de4c4a',
    hoverTransparent: 'hsla(0,0%,100%,.2)',
    navColour: '#fff',
    inputColour: '#fff',
    boxShadow: '0 1px 8px 0 rgb(0 0 0 / 8%)',
    complete: '#808080',
    completeHover: '#E6E6E6',
    scrollbarTrack: '#dbdbdb',
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <ThemeProvider theme={darkTheme ? dark : light}>
        <Router>
          <GlobalStyle />
          <Navbar setSidebarClosed={setSidebarClosed} />
          <ScrollToTop />
          <main>
            <Switch>
              <PrivateRoute
                path='/app/:id'
                exact
                component={Dashboard}
                sidebarClosed={sidebarClosed}
              />
              <Route exact path='/signin' render={props => <SignIn {...props} />} />
              <Route exact path='/signup' render={props => <SignUp {...props} />} />
              <PrivateRoute path='/' component={Redirect} to='/app/inbox' />
            </Switch>
          </main>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
