import styled from 'styled-components/macro'

export const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
`

export const TaskListHeading = styled.div`
  display: flex;
  margin-top: 28px;
  border-bottom: 1px solid ${props => props.theme.border};

  h3 {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding: 0 0 0.4rem;
    color: ${props => props.theme.textColour};
  }
`
