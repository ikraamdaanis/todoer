import React from 'react'
import { render } from '@testing-library/react'
import { Home } from '../../pages'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { BrowserRouter as Router } from 'react-router-dom'

test('Homepage', () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  )
})
