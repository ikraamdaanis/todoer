import styled from 'styled-components/macro'

export const ProfileMenuContainer = styled.div`
  display: grid;
  place-content: center;
  position: relative;
`

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
`

export const ProfileMenuDropDown = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  width: 276px;
  padding: 0.5rem 0;
  background: var(--dark-gray);
  z-index: 1000;
  border-radius: 3px;
  border: 1px solid hsla(0, 0%, 100%, 0.1);
`

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px 10px;

  .profile {
    width: 48px;
    height: 48px;
    margin-right: 14px;
  }
`

export const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;

  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ffffffde;
  }

  .email {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: hsla(0, 0%, 100%, 0.6);
    margin: 3px 0 0;
  }
`

export const LogoutButton = styled.button`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin: 0 !important;
  background: none;
  outline: none;
  color: hsla(0, 0%, 100%, 0.87);
  border: 0;
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  cursor: pointer;

  svg {
    margin-right: 10px;
  }

  span {
    height: 24px;
    line-height: 23px;
  }
`
