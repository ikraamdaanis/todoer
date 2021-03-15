import React from 'react'
import PropTypes from 'prop-types'
import { GreyButtonStyles } from './ButtonsStyles'

export const GreyButton = ({ handleClick, children }) => {
  return <GreyButtonStyles onClick={() => handleClick()}>{children}</GreyButtonStyles>
}

GreyButton.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.object,
}
