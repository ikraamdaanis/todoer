import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dashboard } from '../../pages'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { TaskFormContext, ThemeContext } from '../../App'

test('Dashboard page should load', () => {
  let darkTheme, setDarkTheme, currentTaskForm, setCurrentTaskForm
  render(
    <Provider store={store}>
      <Router>
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
          <TaskFormContext.Provider value={{ currentTaskForm, setCurrentTaskForm }}>
            <Dashboard />
          </TaskFormContext.Provider>
        </ThemeContext.Provider>
      </Router>
    </Provider>
  )

  expect(screen.getByTestId('dashboard')).toBeTruthy()
})
