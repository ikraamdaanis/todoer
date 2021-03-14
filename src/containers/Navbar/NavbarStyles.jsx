import styled from 'styled-components/macro'

export const NavbarContainer = styled.nav`
  background: ${props => props.theme.themeColour};
  height: 44px;
  border-bottom: 1px solid transparent;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1000;
  width: 100%;

  &.home {
    height: 64px;
    border-bottom: 0;
    box-shadow: none;

    @media (max-width: 770px) {
      height: 48px;
    }
  }
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

  &.home {
    max-width: 1088px;
    margin: 0 auto;
    padding: 0 1rem;
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

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .logo {
    width: 127px;
    height: 32px;
    display: flex;
    align-items: center;
    margin-right: 1rem;

    img {
      width: 100%;
    }
  }

  .nav-links {
    display: flex;
    height: 100%;

    @media (max-width: 960px) {
      display: none;
    }
  }
`

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  height: 100%;

  a {
    height: 100%;
  }

  button {
    margin-left: 0.5rem;
  }
`
export const NavButton = styled.button`
  display: block;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  color: #575757;
  padding: 0 1rem;
  background: none;
  font-size: 1rem;
  font-weight: 300;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  height: 100%;

  &:hover {
    color: #1f1f1f;
    background-color: #fafafa;
    border-bottom: 2px solid #e44232;

    &.signup {
      color: #e44232;
    }
  }

  &.signup {
    color: #e44232;
  }

  @media (max-width: 770px) {
    font-size: 15px;
  }
`
