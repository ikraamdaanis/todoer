import styled from 'styled-components/macro'

export const NavbarContainer = styled.nav`
  background: ${props => props.theme.themeColour};
  height: 44px;
  border-bottom: 1px solid transparent;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1000;
  width: 100%;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 42px 0;

  @media (max-width: 550px) {
    padding: 0 10px 0;
  }
`

export const NavbarItem = styled.button`
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  margin-right: 0.5rem;
  background: none;
  border: 0;
  outline: 0;
  padding: 2px;
  transform: translateX(-2px);
  color: ${props => props.theme.navColour};

  &.home {
    transform: translateX(-6px);
  }

  &:hover {
    @media (min-width: 600px) {
      background: ${props => props.theme.hoverTransparent};
    }
  }
`

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  button {
    margin-left: 0.5rem;
  }
`
export const AuthButton = styled.button`
  display: block;
  background: ${props => props.theme.lightRed};
  border: 0;
  outline: 0;
  font-size: 13px;
  color: ${props => props.theme.textColour};
  border-radius: 5px;
  padding: 4px 8px 5px;
  line-height: 100%;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }
`
