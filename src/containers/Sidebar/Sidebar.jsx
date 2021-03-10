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
import { AddProjectModal, TodayIcon } from '../../components'
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
import { getTaskStats } from '../../store/actions/taskActions'

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
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [projectStats, setProjectStats] = useState(null)

  const dispatch = useDispatch()

  const projectList = useSelector(state => state.projectList)
  const { projects } = projectList

  const taskStats = useSelector(state => state.taskStats)
  const { tasks } = taskStats

  useEffect(() => {
    dispatch(getAllProjects())
  }, [])

  useEffect(() => {
    dispatch(getTaskStats())
  }, [projects])

  useEffect(() => {
    tasks && setProjectStats(tasks)
  }, [tasks])

  const activeCheck = el => el.toLowerCase() === param

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
                {projectStats?.Inbox?.length > 0 && projectStats.Inbox.length}
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
              <small>
                {projectStats?.Today?.length > 0 && projectStats.Today.length}
              </small>
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
              <small>
                {projectStats?.Upcoming?.length > 0 &&
                  projectStats.Upcoming.length}
              </small>
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
        {projects && (
          <ProjectTitles
            className={!isOpen && 'projects-closed'}
            height={projects.length * 37.2 + 45}
          >
            {projects?.length > 0 &&
              projects
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
                            {projectStats?.[project.title]?.length > 0 &&
                              projectStats?.[project.title]?.length}
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
