import React from 'react'
import { render, screen } from '@testing-library/react'
import { SignUp } from '../../pages'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { BrowserRouter as Router } from 'react-router-dom'

test('SignUp page should load', () => {
  render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  )

  expect(screen.getByLabelText('Email')).toBeTruthy()
  expect(screen.getByLabelText('Password (6 Characters Minimum)')).toBeTruthy()
})
