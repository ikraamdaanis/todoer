import { useEffect } from 'react'
import {
  RightContainer,
  Container,
  NavbarContainer,
  AuthButton,
} from './NavbarStyles'
import { ReactComponent as MenuToggler } from '../../assets/images/menu-toggler.svg'
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg'
import { auth, firestore } from '../../firebase/config'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'

export const Navbar = () => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    user ? console.log(user.uid) : console.log(user)
  }, [user])
  return (
    <header>
      <NavbarContainer>
        <Container>
          <MenuToggler className='menu-toggler' />
          <HomeIcon className='home' />
          <RightContainer>
            {!user && (
              <AuthButton
                onClick={async () => {
                  const provider = new firebase.auth.GoogleAuthProvider()
                  await auth.signInWithPopup(provider)
                  await firestore
                    .collection('users')
                    .doc(auth.currentUser.uid)
                    .set({
                      name: auth.currentUser.displayName,
                      email: auth.currentUser.email,
                      photo: auth.currentUser.photoURL,
                    })
                }}
              >
                Sign Up
              </AuthButton>
            )}
            {user && (
              <AuthButton
                onClick={() =>
                  auth.signOut().then(_ => console.log('Signed out'))
                }
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
