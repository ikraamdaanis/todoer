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
  @media (max-width: 1200px) {
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
