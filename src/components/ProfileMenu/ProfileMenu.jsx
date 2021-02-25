import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  LogoutButton,
  ProfileImage,
  ProfileMenuContainer,
  ProfileMenuDropDown,
  UserDetails,
  NameEmail,
} from './ProfileMenuStyles'
import { ReactComponent as LogoutIcon } from '../../assets/images/logout-icon.svg'
import { logoutAction } from '../../store/actions/userActions'

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const menu = useRef(null)

  useEffect(() => {
    const toggleOpen = ({ target }) => {
      menu?.current?.contains(target) ? setIsOpen(true) : setIsOpen(false)
    }
    document.body.addEventListener('click', toggleOpen)
    return () => {
      document.body.removeEventListener('click', toggleOpen)
    }
  }, [menu])

  return (
    <ProfileMenuContainer ref={menu}>
      {userInfo && (
        <ProfileImage
          src={userInfo.photo}
          alt='Profile Image'
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
      {isOpen && (
        <ProfileMenuDropDown>
          <UserDetails>
            <ProfileImage
              src={userInfo.photo}
              alt='Profile Image'
              className='profile'
            />
            <NameEmail>
              <p className='name'>
                <strong>{userInfo.name}</strong>
              </p>
              <p className='email'>{userInfo.email}</p>
            </NameEmail>
          </UserDetails>
          <LogoutButton
            onClick={() => {
              setIsOpen(false)
              dispatch(logoutAction())
            }}
          >
            <LogoutIcon />
            <span>Logout</span>
          </LogoutButton>
        </ProfileMenuDropDown>
      )}
    </ProfileMenuContainer>
  )
}
