import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  AddTask,
  AddTaskText,
  DashboardContainer,
  PlusButton,
  ProjectContainer,
  Title,
  ProjectHeading,
  ProjectOptions,
  ProjectOptionsButton,
  ProjectHeadingContainer,
  ProjectMenus,
  ProjectSort,
  ProjectSortButton,
  SortHeading,
  SortDetails,
  SortTitle,
  DashboardLoading,
} from './DashboardStyles'
import {
  AddTaskForm,
  Modal,
  DeleteModal,
  UndoComplete,
  ProjectMenu,
  ProjectSortMenu,
  GreyButton,
  Spinner,
} from '../../components'
import { AddTaskContainer } from '../../components/AddTaskForm/AddTaskFormStyles'
import { Sidebar, TaskContainer, OverdueContainer } from '../'

import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../store/actions/projectActions'
import { getAllTasks } from '../../store/actions/taskActions'

import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { ReactComponent as ProjectMore } from '../../assets/images/project-more.svg'
import { ReactComponent as SortIcon } from '../../assets/images/sort-icon.svg'
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/x-icon-small.svg'
import logoDark from '../../assets/images/logo-dark.png'
import logoLight from '../../assets/images/logo-light.png'

import { format } from 'date-fns'
import { scrollToBottom } from '../../utils/scrollToBottom'
import { useCheckScrolling, useMenu, useSetPosition, useToggleComplete } from '../../hooks/'

import { TaskFormContext, ThemeContext } from '../../App'

export const Dashboard = ({ history, match, sidebarClosed }) => {
  const [addTaskFormOpen, setAddTaskFormOpen] = useState(false)
  const [tasksLoading, setTasksLoading] = useState(true)
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [projectSortOpen, setProjectSortOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [dashboardTasks, setDashboardTasks] = useState([])
  const [tasksToComplete, setTasksToComplete] = useState([])
  const [tasksToNotComplete, setTasksToNotComplete] = useState([])
  const [isUndoVisible, setIsUndoVisible] = useState(false)
  const [sortOptions, setSortOptions] = useState({ option: 'createdAt', direction: 'asc' })

  const dispatch = useDispatch()
  const { darkTheme } = useContext(ThemeContext)
  const { currentTaskForm, setCurrentTaskForm } = useContext(TaskFormContext)

  const projectList = useSelector(state => state.projectList)
  const { loading: projectsLoading, projects } = projectList
  const taskList = useSelector(state => state.taskList)
  const { tasks: allTasks } = taskList

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])

  useEffect(() => {
    // Make sure one task form is open at a time
    currentTaskForm !== 'add' && setAddTaskFormOpen(false)
  }, [currentTaskForm])

  const { id } = match.params
  const isProject = id !== 'today' && id !== 'upcoming'

  useEffect(() => {
    // Redirect to Today Page if URL id doesn't match any project title
    if (projects) {
      const projectExists = projects.some(project => project.title.toLowerCase() === id)
      if (!isProject || projectExists) return
      history.push('/app/today')
    }
  }, [isProject, id, projects, history])

  const assignCurrentProject = useCallback(() => {
    if (projects) {
      const [current] = projects?.filter(project => project.title.toLowerCase() === id)
      current ? setCurrentProject(current) : setCurrentProject({ title: id })
    }
  }, [id, projects])

  const fetchTasks = useCallback(() => {
    if (!projectsLoading) {
      setCurrentProject(null)
      assignCurrentProject()
      setShowCompletedTasks(false)
    }
  }, [assignCurrentProject, projectsLoading])

  useEffect(() => {
    // Set Current Project every URL change
    fetchTasks(id)
    setAddTaskFormOpen(false)
    setSortOptions({
      option: 'createdAt',
      direction: 'asc',
    })
  }, [id, projects, fetchTasks])

  const [clearTimer, cancelCompleteTask] = useToggleComplete(
    tasksToComplete,
    setTasksToComplete,
    tasksToNotComplete,
    setTasksToNotComplete,
    setIsUndoVisible
  )

  useEffect(() => {
    // Set Dashboard Tasks Count for Scroll
    allTasks && currentProject && setDashboardTasks(allTasks[currentProject.title])
  }, [allTasks, currentProject])

  const dashboard = useRef()
  const scrollDownToLastTask = () => scrollToBottom(dashboard, dashboardTasks)
  useCheckScrolling(dashboard, setIsScrolling)

  const projectMenuRef = useRef(null)
  const projectMenuButtonRef = useRef(null)
  const [projectMenuRight] = useSetPosition(projectMenuButtonRef, sidebarClosed)
  useMenu(projectMenuButtonRef, projectMenuRef, setProjectMenuOpen)

  const projectSortMenuRef = useRef(null)
  const projectSortMenuButtonRef = useRef(null)
  const [projectSortMenuRight] = useSetPosition(projectSortMenuButtonRef, sidebarClosed)
  useMenu(projectSortMenuButtonRef, projectSortMenuRef, setProjectSortOpen)

  return (
    <>
      <div>
        <Sidebar sidebarClosed={sidebarClosed} param={id} history={history} />
        <DashboardContainer className={sidebarClosed && 'closed'} ref={dashboard}>
          <ProjectContainer>
            <ProjectHeading>
              <ProjectHeadingContainer className={`div ${isScrolling ? 'scrolling ' : undefined}`}>
                <Title>
                  {id}
                  {id === 'today' && <small>{format(new Date(), 'iii do MMM')}</small>}
                </Title>
                <ProjectMenus>
                  <ProjectSort ref={projectSortMenuButtonRef}>
                    <ProjectSortButton onClick={() => setProjectSortOpen(prev => !prev)}>
                      <SortIcon />
                      <span>Sort</span>
                    </ProjectSortButton>
                  </ProjectSort>
                  {!['today', 'upcoming'].includes(currentProject?.title) && (
                    <ProjectOptions ref={projectMenuButtonRef}>
                      <ProjectOptionsButton onClick={() => setProjectMenuOpen(prev => !prev)}>
                        <ProjectMore />
                      </ProjectOptionsButton>
                    </ProjectOptions>
                  )}
                </ProjectMenus>
              </ProjectHeadingContainer>
            </ProjectHeading>
            {sortOptions.option !== 'createdAt' && (
              <SortHeading>
                <SortDetails className={sortOptions.direction === 'desc' ? 'desc' : undefined}>
                  <GreyButton
                    handleClick={() => {
                      setSortOptions(prev => ({
                        ...prev,
                        direction: prev.direction === 'asc' ? 'desc' : 'asc',
                      }))
                    }}
                  >
                    <Arrow />
                  </GreyButton>
                  <SortTitle>Sorted {sortOptions.optionName}</SortTitle>
                  <GreyButton
                    handleClick={() =>
                      setSortOptions({
                        option: 'createdAt',
                        direction: 'asc',
                      })
                    }
                  >
                    <CloseIcon />
                  </GreyButton>
                </SortDetails>
              </SortHeading>
            )}
            {!allTasks ? (
              <Spinner darkTheme={darkTheme} />
            ) : (
              <TaskFormContext.Provider value={{ currentTaskForm, setCurrentTaskForm }}>
                {currentProject?.title === 'today' && (
                  <OverdueContainer
                    tasks={allTasks.overdue}
                    project={currentProject}
                    isComplete={false}
                    setTasksToComplete={setTasksToComplete}
                    setTasksToNotComplete={setTasksToNotComplete}
                    setIsUndoVisible={setIsUndoVisible}
                    clearTimer={clearTimer}
                    setTasksLoading={setTasksLoading}
                  />
                )}
                <TaskContainer
                  tasks={allTasks[currentProject?.title]}
                  project={currentProject}
                  isComplete={false}
                  setTasksToComplete={setTasksToComplete}
                  setTasksToNotComplete={setTasksToNotComplete}
                  setIsUndoVisible={setIsUndoVisible}
                  clearTimer={clearTimer}
                  sortOptions={sortOptions}
                  setDashboardTasks={setDashboardTasks}
                  setTasksLoading={setTasksLoading}
                  overdue={allTasks.overdue}
                />
                <AddTaskContainer className={showCompletedTasks ? 'complete' : undefined}>
                  {!addTaskFormOpen ? (
                    <AddTask
                      onClick={() => {
                        setAddTaskFormOpen(!addTaskFormOpen)
                        setCurrentTaskForm('add')
                      }}
                    >
                      <PlusButton className='plus'>
                        <PlusButtonSVG />
                      </PlusButton>
                      <AddTaskText>Add task</AddTaskText>
                    </AddTask>
                  ) : (
                    <AddTaskForm
                      id='taskForm'
                      edit={false}
                      setIsOpen={setAddTaskFormOpen}
                      currentProject={currentProject}
                      scrollDownToLastTask={scrollDownToLastTask}
                    />
                  )}
                </AddTaskContainer>
                {showCompletedTasks && (
                  <TaskContainer
                    tasks={allTasks[currentProject?.title]}
                    project={currentProject}
                    isComplete={true}
                    setTasksToComplete={setTasksToComplete}
                    setTasksToNotComplete={setTasksToNotComplete}
                    setIsUndoVisible={setIsUndoVisible}
                    clearTimer={clearTimer}
                    sortOptions={sortOptions}
                    setDashboardTasks={setDashboardTasks}
                    setTasksLoading={setTasksLoading}
                    overdue={allTasks.overdue}
                  />
                )}
              </TaskFormContext.Provider>
            )}
          </ProjectContainer>
        </DashboardContainer>
      </div>
      {isUndoVisible && (
        <UndoComplete
          tasksToComplete={tasksToComplete}
          cancelCompleteTask={cancelCompleteTask}
          setIsUndoVisible={setIsUndoVisible}
        />
      )}
      <ProjectSortMenu
        reference={projectSortMenuRef}
        projectSortOpen={projectSortOpen}
        setProjectSortOpen={setProjectSortOpen}
        projectSortMenuRight={projectSortMenuRight}
        setSortOptions={setSortOptions}
      />
      {!['today', 'upcoming'].includes(currentProject?.title) && (
        <ProjectMenu
          reference={projectMenuRef}
          projectMenuRight={projectMenuRight}
          showCompletedTasks={showCompletedTasks}
          setShowCompletedTasks={setShowCompletedTasks}
          currentProject={currentProject}
          isProject={isProject}
          projectMenuOpen={projectMenuOpen}
          setProjectMenuOpen={setProjectMenuOpen}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
      {deleteModalOpen && (
        <Modal>
          <DeleteModal
            id={currentProject.title}
            detail={currentProject.title}
            action={deleteProject}
            setDeleteModalOpen={setDeleteModalOpen}
          />
        </Modal>
      )}
      {tasksLoading && (
        <Modal>
          <DashboardLoading>
            <img src={darkTheme ? logoDark : logoLight} alt='Logo' />
            <Spinner darkTheme={darkTheme} />
          </DashboardLoading>
        </Modal>
      )}
    </>
  )
}

Dashboard.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  sidebarClosed: PropTypes.bool,
}
