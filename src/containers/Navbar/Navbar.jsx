import {
  RightContainer,
  Container,
  NavbarContainer,
  AuthButton,
} from './NavbarStyles'
import { ReactComponent as MenuToggler } from '../../assets/images/menu-toggler.svg'
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg'

export const Navbar = () => {
  return (
    <header>
      <NavbarContainer>
        <Container>
          <MenuToggler className='menu-toggler' />
          <HomeIcon className='home' />
          <RightContainer>
            <AuthButton>Sign In</AuthButton>
            <AuthButton>Sign Out</AuthButton>
          </RightContainer>
        </Container>
      </NavbarContainer>
    </header>
  )
}
