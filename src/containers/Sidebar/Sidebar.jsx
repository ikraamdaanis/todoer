import { useState } from 'react'
import {
  AddProjectButton,
  AddProjectForm,
  AddProjectInput,
  Container,
  ProjectTitles,
  SidebarContainer,
} from './SidebarStyles'

export const Sidebar = ({ isClosed }) => {
  const [project, setProject] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
  }
  return (
    <SidebarContainer className={isClosed && 'closed'}>
      <Container>
        <ProjectTitles></ProjectTitles>
        <AddProjectForm autoComplete='off' onSubmit={handleSubmit}>
          <AddProjectInput
            type='text'
            id='projectTitle'
            required
            placeholder='Add new Project'
            value={project}
            onChange={event => setProject(event.target.value)}
          />
          <AddProjectButton type='submit'>+</AddProjectButton>
        </AddProjectForm>
      </Container>
    </SidebarContainer>
  )
}
