import styled from 'styled-components/macro'

export const TaskModal = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 95%;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 16%);
  overflow: hidden;
`

export const TaskModalBody = styled.section`
  padding: 40px 24px;
  background: ${props => props.theme.dropdown};
  border-bottom: 1px solid ${props => props.theme.border};
  border-top: 1px solid transparent;

  h3 {
    font-size: 13px;
    font-weight: 300;
    color: ${props => props.theme.textColour};

    strong {
      font-weight: 700;
    }
  }
`

export const TaskModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px;
  background-color: ${props => props.theme.dropdown};
`

export const DeleteTaskButton = styled.button`
  color: ${props => props.theme.textColour};
  background-color: ${props => props.theme.active};
  text-shadow: none;
  margin-left: 10px;
  padding: 6px 12px 7px;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  text-decoration: none;
  position: relative;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  outline: none;

  &.delete {
    background: #de4c4a;
    padding: 6px 14px 7px 12px;
    color: #fff;

    &:disabled {
      opacity: 0.5;
    }
  }
`
