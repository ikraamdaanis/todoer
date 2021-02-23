import styled from 'styled-components/macro'

export const AddTaskFormContainer = styled.div`
  margin-top: 1rem;

  @media (max-width: 1100px) {
    min-width: 580px;
  }

  @media (max-width: 750px) {
    min-width: unset;
  }
`

export const AddTaskFormForm = styled.form``

export const Container = styled.div`
  background: var(--light-black);
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 5px;
  cursor: text;
  padding: 0.5rem 1rem 0.8rem;

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
      margin-left: 0.5rem;
      background: none;
      width: 100%;
      outline: none;
      border: none;
      color: var(--text-white);
      resize: none;
      height: 32px;
      font-size: 14px;
      line-height: 21px;
      border: none;
      outline: none;
      word-break: break-word;
      padding-bottom: 10px;
    }
  }
`

export const SubOptions = styled.div`
  display: flex;
  align-items: center;

  div {
    input,
    select {
      background: var(--dark-black);
      color: hsla(0, 0%, 100%, 0.6);
      border-radius: 3px;
      outline: none;
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      height: 32px;
      padding: 2px 10px;
      font-size: 13px;
      &:hover {
        @media (min-width: 600px) {
          border: 1px solid #555;
        }
      }

      &:focus {
        border: 1px solid #555;
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

export const DueDate = styled.div`
  input {
    width: 160px;
  }
`

export const ProjectSelection = styled.div`
  align-items: center;

  select {
    margin-left: 0.5rem;
  }
`

export const AddTaskSubmitButton = styled.button`
  cursor: pointer;
  margin: 0.5rem 0;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;
  padding: 6px 16px 7px 12px;
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

  &:hover {
    @media (min-width: 600px) {
      filter: brightness(1.1);
    }
  }
`

export const AddTaskCancel = styled.button`
  margin-left: 1rem;
  cursor: pointer;
  margin: 0.5rem 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 6px 14px 7px 12px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  border-radius: 3px;
  text-decoration: none;
  text-align: center;
  border: 1px solid transparent;
  outline: none;
  color: #fff;
  background: none;
  transition: 0.2s ease-in-out;

  &:hover {
    @media (min-width: 600px) {
      filter: brightness(1.1);
      background: #303030;
    }
  }
`
