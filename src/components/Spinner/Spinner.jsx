import { ReactComponent as SpinnerSVG } from '../../assets/images/spinner.svg'
import { SpinnerContainer } from './SpinnerStyles'

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerSVG />
    </SpinnerContainer>
  )
}
