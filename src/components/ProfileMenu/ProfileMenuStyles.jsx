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
  background: ${props => props.theme.foreground};
  z-index: 1000;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.border};
`

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 10px;
  transition: 0.2s ease-in-out;

  &:hover {
    background: ${props => props.theme.active};
  }

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
    color: ${props => props.theme.textColour};
  }

  .email {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.textSecondary};
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
  color: ${props => props.theme.textColour};
  border: 0;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background: ${props => props.theme.active};
  }

  svg {
    margin-right: 10px;
  }

  span {
    height: 24px;
    line-height: 23px;
  }
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${props => props.theme.border};
  margin: 0.2rem 0;
`
