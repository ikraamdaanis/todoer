import { GreyButtonStyles } from './ButtonsStyles'

export const GreyButton = ({ handleClick, children }) => {
  return (
    <GreyButtonStyles onClick={() => handleClick()}>
      {children}
    </GreyButtonStyles>
  )
}
