import styled from 'styled-components/macro'

export const AddTaskFormContainer = styled.div`
  margin-top: 4px;
`

export const AddTaskFormForm = styled.form``

export const Container = styled.div`
  background: var(--light-black);
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 5px;
  cursor: text;
  padding: 0.7rem 1rem 0.8rem;

  &.focused {
    border: 1px solid #555;
  }

  &:hover {
    @media (min-width: 600px) {
      border: 1px solid #555;
    }

    input {
      &::placeholder {
        color: #afafaf;
      }
    }
  }

  div {
    display: flex;

    label {
      opacity: 0;
      pointer-events: none;
      position: absolute;
    }

    input {
      display: flex;
      align-items: center;
      background: none;
      width: 100%;
      outline: none;
      border: none;
      resize: none;
      height: 32px;
      font-size: 14px;
      line-height: 21px;
      border: none;
      outline: none;
      word-break: break-word;
      padding-bottom: 10px;
      color: hsla(0, 0%, 100%, 0.87);
      font-weight: 300;
    }
  }
`

export const SubOptions = styled.div`
  display: flex;
  align-items: center;
  width: max-content;

  div {
    input,
    select {
      border: 1px solid #555;
      border-radius: 5px;
      outline: none;
      padding: 0 8px;
      display: flex;
      background: none;
      align-items: center;
      justify-content: space-between;
      height: 28px;
      color: hsla(0, 0%, 100%, 0.87);
      font-size: 13px;
      font-weight: 300;

      &:hover {
        background: #363636;
      }
    }
  }
`

export const Priority = styled.div`
  align-items: center;

  .priority-select {
    margin-left: 0.5rem;
  }
`

export const ProjectSelection = styled.div`
  align-items: center;
  position: relative;

  button {
    width: 100%;
    border: 1px solid #555;
    border-radius: 5px;
    outline: none;
    padding: 0 8px;
    display: flex;
    background: none;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    color: hsla(0, 0%, 100%, 0.6);
    font-size: 13px;
    font-weight: 300;
    opacity: 1 !important;
    pointer-events: all !important;
    position: static !important;
    cursor: pointer;

    &:hover {
      background: #363636;
    }

    .inbox {
      display: grid;
      place-content: center;
      margin-right: 4px;

      svg {
        color: #246fe0;
      }
    }
  }
`

export const BulletPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  margin-right: 4px;

  div {
    &::before {
      content: '';
      display: inline-block;
      width: 7px;
      height: 7px;
      background-color: rgb(128, 128, 128);
      border-radius: 50%;
    }
  }
`

export const AddTaskContainer = styled.div`
  width: 100%;
  height: 150px;
`

export const AddTaskSubmitButton = styled.button`
  cursor: pointer;
  margin: 0.5rem 0;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;
  padding: 6px 13px 7px 12px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  border-radius: 3px;
  text-decoration: none;
  text-align: center;
  background: #de4c4a;
  border: 1px solid transparent;
  outline: none;
  color: #fff;
  transition: 0.2s ease-in-out;

  &:disabled {
    filter: brightness(0.5);
  }
`

export const AddTaskCancel = styled.button`
  cursor: pointer;
  margin-left: 5px;
  font-weight: 600;
  line-height: 17px;
  padding: 6px 14px 7px 12px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  border-radius: 3px;
  text-decoration: none;
  text-align: center;
  outline: none;
  color: hsla(0, 0%, 100%, 0.4);
  background: none;
  transition: 0.2s ease-in-out;
  font-size: 13px;
  font-weight: 300;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:hover {
    @media (min-width: 600px) {
      color: #eee;
      text-decoration: underline;
    }
  }
`
