import styled from 'styled-components/macro'

export const DashboardContainer = styled.div`
  margin-left: 305px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 320px;
  transition: 0.3s ease-in-out;
  height: calc(100vh - 43px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 4rem;

  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: #8b8b8b;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #8b8b8b;
  }
  &::-webkit-scrollbar-track {
    background: #181818;
    border-radius: 0px;
  }

  @media (max-width: 750px) {
    margin-left: 0;
  }

  &.closed {
    @media (min-width: 550px) {
      margin-left: 0;
    }
  }
`

export const ProjectContainer = styled.div`
  padding: 30px 55px 0;
  width: 100%;
  max-width: 910px;
  margin: 0 auto;
  @media (max-width: 750px) {
    padding: 30px 30px 0;
  }
  @media (max-width: 550px) {
    padding: 30px 10px 0;
  }
  h1 {
    margin-bottom: 1.5rem;

    &.empty {
      text-align: center;
      padding: 1rem;
      font-size: 1.5rem;
    }
  }
`

export const Title = styled.h1`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;

  small {
    color: grey;
    margin-left: 6px;
    font-size: 12px;
    font-weight: 300;
  }
`

export const AddTask = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    @media (min-width: 600px) {
      .plus {
        background: #de4c4a;
        color: white;
      }

      p {
        color: #de4c4a;
      }
    }
  }
`

export const PlusButton = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  color: #de4c4a;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const AddTaskText = styled.p`
  margin-left: 0.5rem;
  color: grey;
  font-size: 14px;
  font-weight: 300;
  transform: translate(-1px, -1px);
`

export const UndoNotification = styled.div`
  position: sticky;
  bottom: 30px;
  left: 50%;
  width: min-content;
  padding: 8px 8px 8px 16px;
  white-space: nowrap;
  background: var(--dark-gray);
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
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
  color: hsla(0, 0%, 100%, 0.87);
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
