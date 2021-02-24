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
import { Spinner } from '../../components'

export const Sidebar = ({ isClosed }) => {
  const [project, setProject] = useState('')
  const [allProjects, setAllProjects] = useState([])
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const projectCreate = useSelector(state => state.projectCreate)
  const { loading, error } = projectCreate

  const allProjectsDetails = useSelector(state => state.allProjectsDetails)
  const {
    loading: projectsLoading,
    projects: projectsDetails,
  } = allProjectsDetails

  useEffect(() => {
    dispatch(getAllProjects())
  }, [])

  useEffect(() => {
    console.log('Stuff', projectsDetails)
    projectsDetails?.length && setAllProjects(prev => [...projectsDetails])
  }, [projectsDetails])

  const handleSubmit = event => {
    event.preventDefault()
    console.log(project)
    dispatch(createProject(project))
    setProject('')
  }

  return (
    <SidebarContainer className={isClosed && 'closed'}>
      <Container>
        <ProjectTitles>
          {allProjects?.length > 0 &&
            allProjects.map(project => (
              <li key={project.title}>{project.title}</li>
            ))}
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
