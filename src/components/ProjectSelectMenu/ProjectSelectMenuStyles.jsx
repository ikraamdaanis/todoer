import styled from 'styled-components/macro'

export const MenuContainer = styled.div`
  position: absolute;
  top: 46px;
  left: 50%;
  width: 275px;
  transform: translateX(-50%);
  background: var(--dark-gray);
  z-index: 1000;
  border-radius: 3px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 30%);
  font-weight: 300;
  font-size: 13px;
  color: hsla(0, 0%, 100%, 0.87);
  padding: 0.2rem 0;
`

export const MenuList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Arrow = styled.div`
  position: absolute;
  top: -12px;
  left: calc(50% - 6px);
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 6px 12px 6px;
  border-color: transparent transparent var(--dark-gray) transparent;
  border-style: inset;
  -webkit-transform: rotate(360deg);
`

export const MenuItem = styled.li`
  width: 100%;
  padding: 8px 10px;
  display: flex;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  align-items: center;
  position: relative;

  span {
    width: 100%;
  }

  &:hover {
    background: #363636;
  }

  &.selected {
    background: #363636;
  }

  .checkmark {
    position: absolute;
    color: #dd4b39;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);

    svg {
      transform: scale(1.2);
    }
  }
`
