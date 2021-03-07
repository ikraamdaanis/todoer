import styled from 'styled-components/macro'

export const DropdownContainer = styled.div`
  position: absolute;
  z-index: 10000;
  top: 15px;
  right: 0;
  width: 250px;
  background: #282828;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
  border-radius: 3px;
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
  color: hsla(0, 0%, 100%, 0.56);
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
    background-color: #353535;

    &.delete {
      svg {
        color: var(--light-red);
      }

      span {
        color: var(--light-red);
      }
    }
  }

  svg {
    color: hsla(0, 0%, 100%, 0.56);
    margin-right: 10px;
  }

  span {
    font-size: 13px;
    color: hsla(0, 0%, 100%, 0.87);
    font-weight: 300;
  }
`

export const Line = styled.div`
  width: 96%;
  height: 1px;
  background: hsla(0, 0%, 100%, 0.1);
  margin: 0.2rem auto;
`
