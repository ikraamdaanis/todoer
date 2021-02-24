import { useState, useEffect } from 'react'
import {
  AddProjectButton,
  AddProjectForm,
  AddProjectInput,
  BulletPoint,
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
              <li key={project.title}>
                <BulletPoint>
                  <div></div>
                </BulletPoint>
                <span>{project.title}</span>
              </li>
            ))}
        </ProjectTitles>
        <AddProjectForm autoComplete='off' onSubmit={handleSubmit}>
          <AddProjectButton type='submit'>
            <svg width='13' height='13'>
              <path
                d='M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z'
                fill='currentColor'
              ></path>
            </svg>
          </AddProjectButton>
          <AddProjectInput
            type='text'
            id='projectTitle'
            required
            placeholder='Add Project'
            value={project}
            onChange={event => setProject(event.target.value)}
          />
        </AddProjectForm>
      </Container>
    </SidebarContainer>
  )
}
