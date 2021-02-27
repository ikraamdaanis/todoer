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
  @media (max-width: 750px) {
    margin-left: 0;
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #a03634;
    border-radius: 0px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b43e3c;
  }
  &::-webkit-scrollbar-track {
    background: #414141;
    border-radius: 0px;
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
  max-width: 800px;
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

export const TaskItem = styled.li`
  font-size: 14px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
`

export const TaskItemContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0;
  cursor: pointer;
`

export const TaskCheck = styled.div`
  width: 40px;
  background: red;
`

export const TaskDescription = styled.p`
  flex: 1;
  padding: 8px 0;
  margin-right: 30px;
  width: 100%;
  text-align: left;
  text-decoration: none;
  font-size: 14px;
  min-height: 24px;
  line-height: 21px;
  word-wrap: break-word;
  word-break: break-word;
`
