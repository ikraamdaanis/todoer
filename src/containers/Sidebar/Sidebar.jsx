import { useState, useEffect } from 'react'
import {
  AddProjectButton,
  AddProjectForm,
  AddProjectInput,
  Container,
  ProjectTitles,
  SidebarContainer,
} from './SidebarStyles'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProject,
  getAllProjects,
} from '../../store/actions/projectActions'

export const Sidebar = ({ isClosed }) => {
  const [project, setProject] = useState('')
  const dispatch = useDispatch()

  const projectCreate = useSelector(state => state.projectCreate)
  const { loading, error } = projectCreate
  const allProjectsDetails = useSelector(state => state.allProjectsDetails)
  const { projects, loading: loadingAllProjects } = allProjectsDetails

  useEffect(() => {
    console.log(projectCreate)
    dispatch(getAllProjects())
    !loadingAllProjects && console.log(projects)
  }, [loading])

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(createProject(project))
    setProject('')
  }
  return (
    <SidebarContainer className={isClosed && 'closed'}>
      <Container>
        <ProjectTitles>
          {projects &&
            projects.map(project => <li key={project}>{project}</li>)}
        </ProjectTitles>
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
