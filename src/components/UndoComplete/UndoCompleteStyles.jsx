import styled from 'styled-components/macro'

export const UndoNotification = styled.div`
  position: sticky;
  bottom: 30px;
  left: 50%;
  width: min-content;
  padding: 8px 8px 8px 16px;
  white-space: nowrap;
  background: ${props => props.theme.background};
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${props => props.theme.boxShadow};
`

export const UndoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const UndoText = styled.h4`
  margin-right: 20px;
  text-align: left;
  text-overflow: ellipsis;
  line-height: 1em;
  color: ${props => props.theme.textColour};
  font-size: 13px;
  font-weight: 300;
  width: 150px;
`

export const UndoButton = styled.button`
  display: flex;
  align-items: center;
  padding: 3px 5px;
  height: 24px;
  border: none;
  border-radius: 5px;
  outline: 0;
  color: #dd4b39;
  font-weight: 700;
  cursor: pointer;
  background: none;
  transition: 0.2s ease-in-out;

  &:hover {
    background: rgba(221, 76, 57, 0.1);
  }
`

export const UndoCloseButton = styled.button`
  margin-left: 6px;
  width: 24px;
  height: 24px;
  color: grey;
  border: none;
  border-radius: 5px;
  outline: 0;
  background: 0;
  cursor: pointer;
  display: grid;
  place-content: center;
  transition: 0.2s ease-in-out;

  &:hover {
    background: rgba(221, 76, 57, 0.1);
  }
`
