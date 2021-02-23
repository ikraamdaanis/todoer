import { useEffect } from 'react'
import {
  RightContainer,
  Container,
  NavbarContainer,
  AuthButton,
} from './NavbarStyles'
import { ReactComponent as MenuToggler } from '../../assets/images/menu-toggler.svg'
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../store/actions/userActions'
import { Link } from 'react-router-dom'

export const Navbar = ({ isClosed, setIsClosed }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  useEffect(() => {
    console.log({ loading, error, userInfo })
  }, [loading, error, userInfo])

  return (
    <header>
      <NavbarContainer>
        <Container>
          <MenuToggler
            className='menu-toggler'
            onClick={() => setIsClosed(isClosed => !isClosed)}
          />
          <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon className='home' />
          </Link>
          <RightContainer>
            {!userInfo && (
              <>
                <Link to='/signin'>
                  <AuthButton>Sign In</AuthButton>
                </Link>
                <Link to='/signup'>
                  <AuthButton>Sign Up</AuthButton>
                </Link>
              </>
            )}
            {userInfo && (
              <AuthButton
                onClick={() => {
                  dispatch(logoutAction())
                }}
              >
                Sign Out
              </AuthButton>
            )}
          </RightContainer>
        </Container>
      </NavbarContainer>
    </header>
  )
}
