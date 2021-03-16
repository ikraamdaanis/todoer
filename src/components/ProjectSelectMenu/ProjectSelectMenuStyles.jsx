import styled from 'styled-components/macro'

export const MenuContainer = styled.div`
  position: absolute;
  top: 46px;
  left: 50%;
  width: 275px;
  transform: translateX(-50%);
  background: ${props => props.theme.dropdown};
  z-index: 1000;
  border-radius: 3px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 30%);
  font-weight: 300;
  font-size: 13px;
  color: ${props => props.theme.textColour};
  padding: 0.2rem 0;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #8b8b8b;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #8b8b8b;
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.scrollbarTrack};
    border-radius: 0px;
  }
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
  border-color: transparent transparent ${props => props.theme.background} transparent;
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
    background: ${props => props.theme.active};
  }

  &.selected {
    background: ${props => props.theme.active};
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
