import React from 'react'
import PropTypes from 'prop-types'
import { SpinnerContainer } from './SpinnerStyles'
import { ReactComponent as SpinnerWhite } from '../../assets/images/spinner-white.svg'
import { ReactComponent as SpinnerRed } from '../../assets/images/spinner-red.svg'

export const Spinner = ({ darkTheme }) => (
  <SpinnerContainer>{darkTheme ? <SpinnerWhite /> : <SpinnerRed />}</SpinnerContainer>
)

Spinner.propTypes = { darkTheme: PropTypes.bool }
