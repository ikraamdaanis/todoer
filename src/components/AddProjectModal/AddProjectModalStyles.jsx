import styled from 'styled-components/macro'

export const ProjectModal = styled.div`
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

export const AddProjectForm = styled.form`
  outline: 0;
`

export const AddProjectFormHeader = styled.header`
  background-color: ${props => props.theme.inputColour};
  position: relative;
  padding: 0 24px;
  display: -webkit-box;
  display: flex;
  align-items: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid ${props => props.theme.border};

  h1 {
    padding: 14px 0;
    font-weight: 700;
    font-size: 16px;
  }
`

export const AddProjectFormBody = styled.section`
  padding: 20px 24px;
  background: ${props => props.theme.foreground};
`

export const AddProjectFormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

export const AddProjectLabel = styled.label`
  color: ${props => props.theme.textColour};
  font-size: 14px;
  width: 50%;
  font-weight: 700;
  display: block;
  margin: 0 0 7px;
  cursor: pointer;
`

export const AddProjectInput = styled.input`
  color: ${props => props.theme.textColour};
  border-color: #333;
  background-color: ${props => props.theme.inputColour};
  width: calc(100% - 12px);
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.border};
  padding: 5px;
  outline: none;

  &:focus {
    border: 1px solid #555;
  }
`

export const AddProjectFooter = styled.footer`
  display: -webkit-box;
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px;
  background-color: inherit;
  border-top: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.foreground};
`

export const AddProjectButton = styled.button`
  color: ${props => props.theme.textColour};
  background-color: ${props => props.theme.active};
  text-shadow: none;
  border: none;
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
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  outline: none;

  &.add {
    background: ${props => props.theme.lightRed};
    padding: 6px 14px 7px 12px;
    color: #fff;

    &:disabled {
      opacity: 0.5;
    }
  }
`
