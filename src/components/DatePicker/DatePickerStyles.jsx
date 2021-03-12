import styled from 'styled-components/macro'

export const DatePickerToggle = styled.span`
  display: block;
  position: relative;
  border: 1px solid #555;
  border-radius: 5px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  justify-content: space-between;
  height: 28px;
  color: hsla(0, 0%, 100%, 0.6);

  &:hover {
    background: ${props => props.theme.active};
  }
`

export const ToggleButton = styled.span`
  padding-left: 4px;
  font-size: 13px;
  font-weight: 300;
`

export const DatePickerInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`
