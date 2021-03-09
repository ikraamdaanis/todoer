import styled from 'styled-components/macro'

export const DashboardContainer = styled.div`
  margin-left: 305px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 320px;
  transition: 0.3s ease-in-out;
  overflow-x: hidden;
  height: calc(100vh - 44px);
  overflow-y: scroll;
  padding: 0 0 4rem;

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
  width: 100%;
  max-width: 910px;
  margin: 0 auto;
  padding: 0 55px;

  @media (max-width: 750px) {
    padding: 0 30px;
  }

  @media (max-width: 550px) {
    padding: 0 10px;
  }

  h1 {
    &.empty {
      text-align: center;
      padding: 1rem;
      font-size: 1.5rem;
    }
  }
`
export const ProjectHeading = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  max-width: 910px;

  @media (max-width: 750px) {
    padding: 0 30px;
    transform: translateX(-30px);
  }

  @media (max-width: 550px) {
    padding: 0 10px;
    transform: translateX(-10px);
  }
`

export const ProjectHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--very-dark-gray);
  width: 100%;
  height: 100%;
  padding: 36px 0 8px;
  border-bottom: 1px solid transparent;
  transition: 0.2s ease-in-out;

  &.scrolling {
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  }
`

export const ProjectMenus = styled.div`
  display: flex;
  align-items: center;
`

export const ProjectSort = styled.div`
  position: relative;
`

export const ProjectSortButton = styled.button`
  height: 24px;
  padding: 0 5px 0 3px;
  display: flex;
  align-items: center;
  color: unset;
  outline: none;
  border: 0;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
  outline: none;
  background: none;
  cursor: pointer;
  margin-right: 16px;

  &:hover {
    background: #353535;

    svg {
      color: hsla(0, 0%, 100%, 0.87);
    }

    span {
      color: hsla(0, 0%, 100%, 0.87);
    }
  }

  svg {
    color: hsla(0, 0%, 100%, 0.56);
  }

  span {
    color: hsla(0, 0%, 100%, 0.56);
    font-weight: 300;
    font-size: 12px;
  }
`

export const ProjectOptions = styled.div`
  position: relative;
`

export const ProjectOptionsButton = styled.button`
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
    background: #353535;

    svg {
      color: hsla(0, 0%, 100%, 0.87);
    }
  }

  svg {
    color: hsla(0, 0%, 100%, 0.56);
  }
`

export const Title = styled.h1`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  margin: 0;

  small {
    color: grey;
    margin-left: 6px;
    font-size: 12px;
    font-weight: 300;
  }
`

export const SortHeading = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  justify-content: flex-end;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  margin-bottom: 2rem;
`

export const SortDetails = styled.div`
  display: flex;
  align-items: center;

  &.desc {
    button {
      svg {
        transform: rotate(180deg);
      }
    }
  }
`

export const SortTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  width: auto;
  padding: 0 8px;
  color: hsla(0, 0%, 100%, 0.56);
`

export const SortCancelButton = styled.button``

export const AddTask = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
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
