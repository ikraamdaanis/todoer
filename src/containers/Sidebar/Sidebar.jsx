import { useState, useEffect } from 'react'
import {
  AddProjectFormTogglerButton,
  AddProjectFormToggler,
  AddProjectFormTogglerText,
  BulletPoint,
  Container,
  ProjectsButton,
  ProjectsButtonContainer,
  ProjectTitles,
  SidebarItem,
  SidebarButtonContainer,
  SidebarContainer,
} from './SidebarStyles'
import { AddProjectModal } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../../store/actions/projectActions'
import { ReactComponent as Upcoming } from '../../assets/images/upcoming-icon.svg'
import { ReactComponent as PlusIcon } from '../../assets/images/plus-icon.svg'
import { ReactComponent as DropdownIcon } from '../../assets/images/dropdown.svg'
import { ReactComponent as InboxIcon } from '../../assets/images/inbox.svg'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../components'
import { getAllTasks } from '../../store/actions/taskActions'

const Inbox = () => {
  return (
    <div
      style={{
        color: '#5297ff',
        width: '38px',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <InboxIcon />
    </div>
  )
}

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

export const Sidebar = ({ isClosed, param }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [allProjects, setAllProjects] = useState([])
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  const dispatch = useDispatch()

  const projectList = useSelector(state => state.projectList)
  const { projects } = projectList

  const taskList = useSelector(state => state.taskList)
  const { tasks } = taskList

  useEffect(() => {
    dispatch(getAllProjects())
  }, [])

  useEffect(() => {
    dispatch(
      getAllTasks({ field: 'isComplete', condition: '==', query: false })
    )
  }, [])

  useEffect(() => {
    projects && setAllProjects([...projects])
  }, [projects, tasks])

  const activeCheck = el => el.toLowerCase() === param

  const inbox = projects?.filter(project => project.title === 'Inbox')[0]

  return (
    <SidebarContainer className={isClosed && 'closed'}>
      <Container>
        <SidebarButtonContainer
          className={activeCheck('inbox') ? 'active' : undefined}
        >
          <Link to={'/app/inbox'}>
            <SidebarItem>
              <Inbox />
              <span>Inbox</span>
              <small>
                {inbox?.incompleteTasks > 0 && inbox?.incompleteTasks}
              </small>
            </SidebarItem>
          </Link>
        </SidebarButtonContainer>
        <SidebarButtonContainer
          className={activeCheck('today') ? 'active' : undefined}
        >
          <Link to={'/app/today'}>
            <SidebarItem>
              <TodayIcon date={format(new Date(), 'dd')} />
              <span>Today</span>
            </SidebarItem>
          </Link>
        </SidebarButtonContainer>
        <SidebarButtonContainer
          className={activeCheck('upcoming') ? 'active' : undefined}
        >
          <Link to={'/app/upcoming'}>
            <SidebarItem>
              <UpcomingIcon />
              <span>Upcoming</span>
            </SidebarItem>
          </Link>
        </SidebarButtonContainer>
        <ProjectsButtonContainer>
          <ProjectsButton onClick={() => setIsOpen(!isOpen)}>
            <div className='dropdown'>
              <DropdownIcon
                className={!isOpen ? 'projects-closed' : undefined}
              />
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
              allProjects
                .filter(project => project.title !== 'Inbox')
                .map(project => (
                  <li key={project.title}>
                    <NavLink
                      to={`/app/${project.title.toLowerCase()}`}
                      activeClassName='active'
                    >
                      <div className='container'>
                        <BulletPoint>
                          <div></div>
                        </BulletPoint>
                        <div className='text'>
                          <span>{project.title}</span>
                          <small>
                            {project.incompleteTasks > 0 &&
                              project.incompleteTasks}
                          </small>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}

            <AddProjectFormToggler>
              <AddProjectFormTogglerButton
                onClick={() => setIsProjectModalOpen(true)}
              >
                <div className='icon'>
                  <div className='icon-wrapper'>
                    <PlusIcon />
                  </div>
                </div>
                <AddProjectFormTogglerText>
                  Add Project
                </AddProjectFormTogglerText>
              </AddProjectFormTogglerButton>
            </AddProjectFormToggler>
          </ProjectTitles>
        )}
      </Container>
      {isProjectModalOpen && (
        <Modal>
          <AddProjectModal setIsProjectModalOpen={setIsProjectModalOpen} />
        </Modal>
      )}
    </SidebarContainer>
  )
}
