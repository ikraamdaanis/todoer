import React from 'react'
import { render, screen } from '@testing-library/react'
import { Login } from '../../pages'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { BrowserRouter as Router } from 'react-router-dom'

test('Login page should load', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  )

  expect(screen.getByLabelText('Email')).toBeTruthy()
  expect(screen.getByLabelText('Password')).toBeTruthy()
})
