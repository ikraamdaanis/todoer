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
`

export const ToggleButton = styled.span`
  padding-left: 4px;
  color: hsla(0, 0%, 100%, 0.6);
  font-size: 13px;
  font-weight: 300;
  /* background: url('https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png')
    center/80% no-repeat; */

  &:hover {
    background: url('https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png')
      center/80% no-repeat;
  }
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
