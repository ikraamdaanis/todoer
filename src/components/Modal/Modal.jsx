import ReactDOM from 'react-dom'
import React from 'react'
import { ModalContainer } from './ModalStyles'

export const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <ModalContainer>{children}</ModalContainer>,
    document.getElementById('root')
  )
}
