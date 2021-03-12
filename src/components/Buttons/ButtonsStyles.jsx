import styled from 'styled-components/macro'

export const GreyButtonStyles = styled.button`
  height: 24px;
  width: 26px;
  display: grid;
  place-content: center;
  color: unset;
  outline: none;
  border: 0;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
  outline: none;
  background: none;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.active};

    svg {
      color: ${props => props.theme.textColour};
    }
  }

  svg {
    color: ${props => props.theme.textTertiary};
  }
`
