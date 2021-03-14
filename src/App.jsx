import React, { useState, createContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { PrivateRoute, ScrollToTop } from './components'
import { Dashboard, Navbar } from './containers'
import { Home, SignIn, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'

export const ThemeContext = createContext()
export const TaskFormContext = createContext()

export const App = () => {
  const [active, setActive] = useState(false)
  const [currentTaskForm, setCurrentTaskForm] = useState('')
  const [sidebarClosed, setSidebarClosed] = useState(false)
  const [darkTheme, setDarkTheme] = useState(JSON.parse(localStorage.getItem('darkTheme')) || false)

  localStorage.setItem('darkTheme', JSON.stringify(darkTheme))

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    userInfo && setActive(false)
  }, [userInfo, setActive])

  useEffect(() => {
    console.log({ active })
  }, [active])

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
    taskBorder: '#171717',
    lightRed: '#de4c4a',
    hoverTransparent: 'hsla(0,0%,100%,.2)',
    navColour: 'unset',
    inputColour: '#202020',
    boxShadow: '0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%)',
    complete: '#808080',
    completeHover: '#4b4b4b',
    scrollbarTrack: '#181818',
    dropdown: '#282828',
    profileMenu: '#1f1f1f',
    overflow: 'hidden',
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
    taskBorder: '#ddd',
    lightRed: '#de4c4a',
    hoverTransparent: 'hsla(0,0%,100%,.2)',
    navColour: '#fff',
    inputColour: '#fff',
    boxShadow: '0 1px 8px 0 rgb(0 0 0 / 8%)',
    complete: '#808080',
    completeHover: '#E6E6E6',
    scrollbarTrack: '#dbdbdb',
    dropdown: '#ffffff',
    profileMenu: '#fff',
    overflow: userInfo ? 'hidden' : 'unset',
    highlight: '#FFFCAA',
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <TaskFormContext.Provider value={{ currentTaskForm, setCurrentTaskForm }}>
        <Router>
          <ThemeProvider theme={userInfo ? (darkTheme ? dark : light) : light}>
            <Navbar setSidebarClosed={setSidebarClosed} />
          </ThemeProvider>
          <ThemeProvider theme={userInfo ? (darkTheme ? dark : light) : light}>
            <ScrollToTop />
            <GlobalStyle />
            <main>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={props => <Home {...props} active={active} setActive={setActive} />}
                />
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
          </ThemeProvider>
        </Router>
      </TaskFormContext.Provider>
    </ThemeContext.Provider>
  )
}
