import styled from 'styled-components/macro'

export const SidebarContainer = styled.div`
  position: absolute;
  top: 44px;
  left: 0;
  height: calc(100vh - 44px);
  background: var(--dark-gray);
  width: 305px;
  transition: transform 0.3s ease-in-out;
  z-index: 100;

  &.closed {
    transform: translateX(-310px);
  }
`

export const Container = styled.div`
  padding: 2rem 0 0 42px;
`
export const ProjectTitles = styled.ul`
  width: 255px;
  li {
    min-height: 24px;
    font-size: 16px;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    padding: 5px 16px 5px 5px;
    border-radius: 3px;
    transition: color 0.1s ease-in, background-color 0.1s ease-in;
    color: var(--text-white);
    line-height: 24px;
    margin: 0 0 0.2rem;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #363636;
    }
    &.active {
      background-color: #363636;
      font-weight: 500;
      &:hover {
        button {
          opacity: 1;
          cursor: pointer;
          display: inline;
          pointer-events: initial;
        }
      }
    }
    span {
      width: 100px;
      display: block;
      flex: 1;
    }
    button {
      pointer-events: none;
      color: rgb(230, 230, 230);
      background: rgb(172, 15, 15);
      padding: 4px 7px 4px 6px;
      border: none;
      border-radius: 2px;
      outline: none;
      margin-left: 1rem;
      display: grid;
      grid-template-columns: 16px;
      grid-template-rows: 16px;
      align-items: center;
      justify-content: center;
      transition: 0.2s ease-in-out;
      span {
        height: 16px;
        width: 16px;
        font-size: 14px;
        line-height: 15px;
      }
      &:hover {
        @media (min-width: 600px) {
          filter: brightness(1.1);
        }
      }
      @media (min-width: 600px) {
        opacity: 0;
      }
    }
  }
`

export const AddProjectForm = styled.form``

export const AddProjectInput = styled.input`
  background: none;
  outline: 0;
  border: 0;
  border-bottom: 2px solid #646464;
  padding: 5px 16px 5px 5px;
  color: var(--text-white);
  transition: 0.2s ease-in-out;
  &:focus {
    border-bottom: 2px solid var(--light-red);
  }
  &:hover {
    @media (min-width: 600px) {
      border-bottom: 2px solid var(--light-red);
    }
  }
`

export const AddProjectButton = styled.button`
  background: none;
  color: white;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 1.3rem;
  transform: translateY(2px);
  transition: 0.2s ease-in-out;
  &:hover {
    @media (min-width: 600px) {
      color: var(--light-red);
    }
  }
`
