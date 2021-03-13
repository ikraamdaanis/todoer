import { RightContainer, Container, NavbarContainer, AuthButton, NavbarItem } from './NavbarStyles'
import { ReactComponent as MenuToggler } from '../../assets/images/menu-toggler.svg'
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { ProfileMenu } from '../../components'

export const Navbar = ({ setSidebarClosed, setDarkTheme }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <header>
      <NavbarContainer>
        <Container>
          {userInfo && (
            <NavbarItem>
              <MenuToggler
                className='menu-toggler'
                onClick={() => setSidebarClosed(prev => !prev)}
              />
            </NavbarItem>
          )}
          <NavbarItem className='home'>
            <Link
              to={userInfo ? '/app/today' : '/'}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon />
            </Link>
          </NavbarItem>
          <RightContainer>
            {!userInfo ? (
              <>
                <Link to='/signin'>
                  <AuthButton>Sign In</AuthButton>
                </Link>
                <Link to='/signup'>
                  <AuthButton>Sign Up</AuthButton>
                </Link>
              </>
            ) : (
              <ProfileMenu />
            )}
          </RightContainer>
        </Container>
      </NavbarContainer>
    </header>
  )
}
