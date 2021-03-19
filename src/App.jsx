import React, { useState, createContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { PrivateRoute, ScrollToTop } from './components'
import { Dashboard, Home, Login, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'
import { dark, light } from './utils'

export const ThemeContext = createContext()
export const TaskFormContext = createContext()

export const App = () => {
  const [active, setActive] = useState(false)
  const [currentTaskForm, setCurrentTaskForm] = useState('')

  const [darkTheme, setDarkTheme] = useState(JSON.parse(localStorage.getItem('darkTheme')) || false)

  localStorage.setItem('darkTheme', JSON.stringify(darkTheme))

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    userInfo && setActive(false)
  }, [userInfo, setActive])

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <TaskFormContext.Provider value={{ currentTaskForm, setCurrentTaskForm }}>
        <Router>
          <ThemeProvider theme={userInfo ? (darkTheme ? dark : light) : light}>
            <GlobalStyle userInfo={userInfo} />
            <ScrollToTop />
            <main>
              <Switch>
                <Route exact path='/'>
                  <Home active={active} setActive={setActive} />
                </Route>
                <PrivateRoute path='/app/:id' exact component={Dashboard} />
                <Route exact path='/login'>
                  <ThemeProvider theme={light}>
                    <Login />
                  </ThemeProvider>
                </Route>
                <Route exact path='/signup'>
                  <ThemeProvider theme={light}>
                    <SignUp />
                  </ThemeProvider>
                </Route>
                <Route path='/' render={() => <Redirect to='/' />} />
              </Switch>
            </main>
          </ThemeProvider>
        </Router>
      </TaskFormContext.Provider>
    </ThemeContext.Provider>
  )
}
