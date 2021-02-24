import { useState, useEffect } from 'react'
import {
  AddProjectButton,
  AddProjectForm,
  AddProjectInput,
  BulletPoint,
  Container,
  ProjectsButton,
  ProjectsButtonContainer,
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
  const [isOpen, setIsOpen] = useState(true)
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
    return () => {
      dispatch(getAllProjects())
    }
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
        <ProjectsButtonContainer>
          <ProjectsButton onClick={() => setIsOpen(!isOpen)}>
            <div className='dropdown'>
              <svg
                width='16px'
                height='16px'
                viewBox='0 0 16 16'
                className={!isOpen ? 'projects-closed' : undefined}
              >
                <g transform='translate(-266, -17)' fill='#777777'>
                  <path d='M280,22.7581818 L279.1564,22 L273.9922,26.506 L273.4414,26.0254545 L273.4444,26.0281818 L268.8562,22.0245455 L268,22.7712727 C269.2678,23.878 272.8084,26.9674545 273.9922,28 C274.8718,27.2330909 274.0144,27.9809091 280,22.7581818'></path>
                </g>
              </svg>
            </div>
            <span>Projects</span>
          </ProjectsButton>
        </ProjectsButtonContainer>
        {allProjects && (
          <ProjectTitles
            className={!isOpen && 'projects-closed'}
            height={allProjects.length * 37.2}
          >
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
        )}
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
