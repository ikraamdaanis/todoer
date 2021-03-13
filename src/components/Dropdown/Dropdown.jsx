import styled from 'styled-components/macro'

export const DropdownContainer = styled.div`
  position: absolute;
  z-index: 10000;
  top: 15px;
  right: 0;
  width: 250px;
  background: ${props => props.theme.background};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 3px;
  border: 1px solid ${props => props.theme.border};
  padding: 4px 0;

  &.project-menu {
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0s ease-in-out 0.01s;

    &.open {
      opacity: 1;
      pointer-events: all;
    }
  }
`
export const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
`

export const DropdownItem = styled.li`
  color: ${props => props.theme.textTertiary};
  text-shadow: none;
  background: none;
  border: none;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  outline: none;
  padding: 4px 10px;

  &:hover {
    background-color: ${props => props.theme.active};

    &.delete {
      svg {
        color: ${props => props.theme.lightRed};
      }

      span {
        color: ${props => props.theme.lightRed};
      }
    }
  }

  svg {
    color: ${props => props.theme.textTertiary};
    margin-right: 10px;
  }

  span {
    font-size: 13px;
    color: ${props => props.theme.textColour};
    font-weight: 300;
  }
`

export const Line = styled.div`
  width: 96%;
  height: 1px;
  background: ${props => props.theme.border};
  margin: 0.2rem auto;
`
