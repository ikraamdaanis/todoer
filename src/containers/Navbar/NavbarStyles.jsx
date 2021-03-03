import styled from 'styled-components/macro'

export const NavbarContainer = styled.nav`
  background: var(--dark-gray);
  height: 44px;
  border-bottom: 1px solid transparent;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1000;
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

  .menu-toggler {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    margin-right: 0.5rem;

    &:hover {
      @media (min-width: 600px) {
        color: var(--light-red);
      }
    }
  }

  .home {
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      @media (min-width: 600px) {
        color: var(--light-red);
      }
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
  background: var(--light-red);
  border: 0;
  outline: 0;
  font-size: 13px;
  color: var(--text-white);
  border-radius: 5px;
  padding: 4px 8px 5px;
  line-height: 100%;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }
`
