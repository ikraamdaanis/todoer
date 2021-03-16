import React from 'react'
import PropTypes from 'prop-types'
import { SpinnerContainer } from './SpinnerStyles'
import { SpinnerRed, SpinnerWhite } from '../../assets'

export const Spinner = ({ darkTheme }) => (
  <SpinnerContainer>{darkTheme ? <SpinnerWhite /> : <SpinnerRed />}</SpinnerContainer>
)

Spinner.propTypes = { darkTheme: PropTypes.bool }
