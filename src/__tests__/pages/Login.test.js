import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '../../pages'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { BrowserRouter as Router } from 'react-router-dom'

test('Login page should load', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  )

  expect(queryByTestId('login')).toBeTruthy()
})
