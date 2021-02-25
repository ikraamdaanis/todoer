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
  SidebarButton,
  SidebarButtonContainer,
  SidebarContainer,
} from './SidebarStyles'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProject,
  getAllProjects,
} from '../../store/actions/projectActions'
import { ReactComponent as Upcoming } from '../../assets/images/upcoming-icon.svg'
import { format } from 'date-fns'

const TodayIcon = ({ date }) => {
  return (
    <div
      style={{
        color: '#25b84c',
        width: '38px',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <svg width='24' height='24'>
        <g fill='currentColor' fillRule='evenodd'>
          <path
            fillRule='nonzero'
            d='M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z'
            opacity='.1'
          />
          <path
            fillRule='nonzero'
            d='M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm1 3h10a.5.5 0 110 1H7a.5.5 0 010-1z'
          />
          <text
            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
            fontSize='9'
            transform='translate(4 2)'
            fontWeight='500'
          >
            <tspan x='8' y='15' textAnchor='middle'>
              {date}
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  )
}

const UpcomingIcon = () => {
  return (
    <div
      style={{
        color: '#a970ff',
        width: '38px',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <Upcoming />
    </div>
  )
}

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
        <SidebarButtonContainer>
          <SidebarButton>
            <TodayIcon date={format(new Date(), 'dd')} />
            <span>Today</span>
          </SidebarButton>
        </SidebarButtonContainer>
        <SidebarButtonContainer>
          <SidebarButton>
            <UpcomingIcon />
            <span>Upcoming</span>
          </SidebarButton>
        </SidebarButtonContainer>
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
            height={allProjects.length * 37.2 + 45}
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
          </ProjectTitles>
        )}
      </Container>
    </SidebarContainer>
  )
}
