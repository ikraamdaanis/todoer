import React, { useEffect, useState } from 'react'
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
import TodoerSmall from '../../assets/images/todoer-small.png'

import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { ProfileMenu } from '../../components'

export const Navbar = ({ setSidebarClosed }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const setViewPort = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', setViewPort)
    return () => window.removeEventListener('resize', setViewPort)
  }, [])

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
                  <img src={windowWidth > 770 ? TodoerLogo : TodoerSmall} alt='Todoer Logo' />
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
                <NavLink to='/signin' activeClassName='active-link'>
                  <NavButton className={!userInfo && 'home'}>Sign In</NavButton>
                </NavLink>
                <NavLink to='/signup' activeClassName='active-link'>
                  <NavButton className={`signup ${!userInfo && 'home'}`}>Sign Up</NavButton>
                </NavLink>
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
