import styled from 'styled-components/macro'

export const DashboardContainer = styled.div`
  margin-left: 305px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 320px;
  transition: margin 0.3s ease-in-out;
  overflow-x: hidden;
  height: calc(100vh - 44px);
  overflow-y: auto;
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
    background: ${props => props.theme.scrollbarTrack};
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
  background: ${props => props.theme.background};
  width: 100%;
  height: 100%;
  padding: 36px 0 8px;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.2s ease-in-out;

  &.scrolling {
    border-bottom: 1px solid ${props => props.theme.border};
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

  &:hover {
    background: ${props => props.theme.active};

    svg {
      color: ${props => props.theme.textColour};
    }

    span {
      color: ${props => props.theme.textColour};
    }
  }

  svg {
    color: ${props => props.theme.textTertiary};
  }

  span {
    color: ${props => props.theme.textTertiary};
    font-weight: 300;
    font-size: 12px;
  }
`

export const ProjectOptions = styled.div`
  position: relative;
  margin-left: 16px;
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
    background: ${props => props.theme.active};

    svg {
      color: ${props => props.theme.textColour};
    }
  }

  svg {
    color: ${props => props.theme.textTertiary};
  }
`

export const Title = styled.h1`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  height: 25px;
  margin: 0;

  small {
    color: ${props => props.theme.textTertiary};
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
  border-bottom: 1px solid ${props => props.theme.border};
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
  color: ${props => props.theme.textTertiary};
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
        background: ${props => props.theme.lightRed};
        color: white;
      }

      p {
        color: ${props => props.theme.lightRed};
      }
    }
  }
`

export const PlusButton = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  color: ${props => props.theme.lightRed};
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

export const DashboardLoading = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.background};
  display: grid;
  place-content: center;

  img {
    width: 70px;
    height: 70px;
  }

  div {
    transform: scale(0.8);
    svg {
      fill: red;
    }
  }
`
