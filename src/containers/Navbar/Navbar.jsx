import React from 'react'
import PropTypes from 'prop-types'
import {
  RightContainer,
  Container,
  NavbarContainer,
  NavButton,
  NavbarItem,
  LeftContainer,
} from './NavbarStyles'
import { ReactComponent as MenuToggler } from '../../assets/images/menu-toggler.svg'
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg'
import TodoerLogo from '../../assets/images/todoer.png'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { ProfileMenu } from '../../components'

export const Navbar = ({ setSidebarClosed }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <header>
      <NavbarContainer style={{ background: !userInfo && '#fff' }} className={!userInfo && 'home'}>
        <Container className={!userInfo && 'home'}>
          {userInfo ? (
            <>
              <NavbarItem>
                <MenuToggler
                  className='menu-toggler'
                  onClick={() => setSidebarClosed(prev => !prev)}
                />
              </NavbarItem>
              <NavbarItem className='home'>
                <Link
                  to={userInfo ? '/app/today' : '/'}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <HomeIcon />
                </Link>
              </NavbarItem>
            </>
          ) : (
            <LeftContainer>
              <div className='logo'>
                <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={TodoerLogo} alt='Todoer Logo' />
                </Link>
              </div>
              <div className='nav-links'>
                <NavButton>Features</NavButton>
                <NavButton>Premium</NavButton>
                <NavButton>For Teams</NavButton>
                <NavButton>Resources</NavButton>
              </div>
            </LeftContainer>
          )}
          <RightContainer>
            {!userInfo ? (
              <>
                <Link to='/signin'>
                  <NavButton className={!userInfo && 'home'}>Sign In</NavButton>
                </Link>
                <Link to='/signup'>
                  <NavButton className={`signup ${!userInfo && 'home'}`}>Sign Up</NavButton>
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

Navbar.propTypes = { setSidebarClosed: PropTypes.func }
