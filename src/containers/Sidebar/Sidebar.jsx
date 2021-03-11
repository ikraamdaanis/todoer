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
import {
  AddProjectModal,
  TodayIcon,
  InboxIcon,
  UpcomingIcon,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../../store/actions/projectActions'
import { getAllTasks } from '../../store/actions/taskActions'

import { ReactComponent as PlusIcon } from '../../assets/images/plus-icon.svg'
import { ReactComponent as DropdownIcon } from '../../assets/images/dropdown.svg'

import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../components'

export const Sidebar = ({ isClosed, param }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [incompleteTasksCount, setIncompleteTasksCount] = useState(null)

  const dispatch = useDispatch()

  const projectList = useSelector(state => state.projectList)
  const { projects } = projectList

  const taskList = useSelector(state => state.taskList)
  const { tasks } = taskList

  useEffect(() => {
    dispatch(getAllProjects())
  }, [])

  useEffect(() => {
    dispatch(getAllTasks())
  }, [projects])

  useEffect(() => {
    if (tasks) {
      const incompleteTasks = {}
      for (const [key, value] of Object.entries(tasks)) {
        incompleteTasks[key] = value.filter(item => !item.isComplete).length
      }
      setIncompleteTasksCount(incompleteTasks)
    }
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
              <InboxIcon />
              <span>Inbox</span>
              <small>
                {incompleteTasksCount?.Inbox > 0 && incompleteTasksCount.Inbox}
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
                {incompleteTasksCount?.today > 0 && incompleteTasksCount.today}
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
                {incompleteTasksCount?.upcoming > 0 &&
                  incompleteTasksCount.upcoming}
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
                            {incompleteTasksCount?.[project.title] > 0 &&
                              incompleteTasksCount?.[project.title]}
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
