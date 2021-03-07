import { useEffect } from 'react'
import {
  RightContainer,
  Container,
  NavbarContainer,
  AuthButton,
} from './NavbarStyles'
import { ReactComponent as MenuToggler } from '../../assets/images/menu-toggler.svg'
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { ProfileMenu } from '../../components'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../../firebase/config'

export const Navbar = ({ setIsClosed }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const ref = firestore
    .collection('users')
    .doc(userInfo?.id)
    .collection('projects')
    .doc('Inbox')
    .collection('tasks')
  const [snapshots] = useCollection(ref)
  useEffect(() => {
    console.log({ snapshots })
  }, [snapshots])

  return (
    <header>
      <NavbarContainer>
        <Container>
          {userInfo && (
            <MenuToggler
              className='menu-toggler'
              onClick={() => setIsClosed(isClosed => !isClosed)}
            />
          )}
          <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon className='home' />
          </Link>
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
