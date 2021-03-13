import React, { useState, useEffect, useRef, useCallback } from 'react'
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
import { Sidebar, TaskContainer } from '../'

import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../store/actions/projectActions'
import { completeTask, incompleteTask } from '../../store/actions/taskActions'

import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { ReactComponent as ProjectMore } from '../../assets/images/project-more.svg'
import { ReactComponent as SortIcon } from '../../assets/images/sort-icon.svg'
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/x-icon-small.svg'
import logo from '../../assets/images/logo.png'

import { format } from 'date-fns'
import { scrollToBottom } from '../../utils/scrollToBottom'
import { useCheckScrolling } from '../../hooks/useCheckScrolling'

import { useMenu } from '../../hooks/useMenu'
import { useSetPosition } from '../../hooks/useSetPosition'

export const Dashboard = ({ history, match, sidebarClosed }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [currentTaskForm, setCurrentTaskForm] = useState('')
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
  const [sortOptions, setSortOptions] = useState({
    option: 'createdAt',
    direction: 'asc',
  })

  const dispatch = useDispatch()
  const { id } = match.params

  const isProject = id !== 'today' && id !== 'upcoming'

  const projectList = useSelector(state => state.projectList)
  const { loading: projectsLoading, projects } = projectList

  useEffect(() => {
    currentTaskForm !== 'add' && setIsAddTaskOpen(false)
  }, [currentTaskForm])

  useEffect(() => {
    if (projects) {
      const projectExists = projects.some(
        project => project.title.toLowerCase() === id
      )
      if (!isProject || projectExists) return
      history.push('/app/inbox')
    }
  }, [isProject, id, projects, history])

  const assignCurrentProject = useCallback(() => {
    if (projects) {
      const [current] = projects?.filter(
        project => project.title.toLowerCase() === id
      )
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
    fetchTasks(id)
    setIsAddTaskOpen(false)
    setSortOptions({
      option: 'createdAt',
      direction: 'asc',
    })
  }, [id, projects, fetchTasks])

  let timer = useRef(null)

  useEffect(() => {
    console.log('Timer', timer)
  }, [timer])

  const completeSelectedTask = useCallback(() => {
    tasksToComplete.forEach(task => {
      const { id, project } = task
      dispatch(completeTask(id, project))
    })
    timer.current = setTimeout(() => {
      console.log('hi')
      setIsUndoVisible(false)
      setTasksToComplete([])
    }, 5000)
  }, [dispatch, tasksToComplete])

  const notCompleteSelectedTask = useCallback(() => {
    tasksToNotComplete.forEach(task => {
      const { id, project } = task
      dispatch(incompleteTask(id, project))
    })
    setTasksToNotComplete([])
  }, [dispatch, tasksToNotComplete])

  const cancelCompleteTask = () => {
    tasksToComplete.forEach(task => {
      const { id, project } = task
      dispatch(incompleteTask(id, project))
    })
    clearTimeout(timer.current)
    setTasksToComplete([])
    setIsUndoVisible(false)
  }

  const clearTimer = () => {
    clearTimeout(timer.current)
  }

  useEffect(() => {
    if (tasksToComplete.length) {
      completeSelectedTask()
    }
  }, [tasksToComplete, timer, completeSelectedTask])

  useEffect(() => {
    if (tasksToNotComplete.length) {
      notCompleteSelectedTask()
      setTasksToComplete([])
    }
  }, [tasksToNotComplete, notCompleteSelectedTask])

  const dashboard = useRef()

  const scrollDownToLastTask = () => {
    scrollToBottom(dashboard, dashboardTasks)
  }
  useCheckScrolling(dashboard, setIsScrolling)

  const projectMenuRef = useRef(null)
  const projectMenuButtonRef = useRef(null)
  useMenu(projectMenuButtonRef, projectMenuRef, setProjectMenuOpen)
  const [projectMenuRight] = useSetPosition(projectMenuButtonRef, sidebarClosed)

  const projectSortMenuRef = useRef(null)
  const projectSortMenuButtonRef = useRef(null)
  useMenu(projectSortMenuButtonRef, projectSortMenuRef, setProjectSortOpen)
  const [projectSortMenuRight] = useSetPosition(
    projectSortMenuButtonRef,
    sidebarClosed
  )

  return (
    <>
      <div>
        <Sidebar sidebarClosed={sidebarClosed} param={id} history={history} />
        <DashboardContainer
          className={sidebarClosed && 'closed'}
          ref={dashboard}
        >
          <ProjectContainer>
            <ProjectHeading>
              <ProjectHeadingContainer
                className={`div ${isScrolling ? 'scrolling ' : undefined}`}
              >
                <Title>
                  {id}
                  {id === 'today' && (
                    <small>{format(new Date(), 'iii do MMM')}</small>
                  )}
                </Title>
                <ProjectMenus>
                  <ProjectSort ref={projectSortMenuButtonRef}>
                    <ProjectSortButton
                      onClick={() => setProjectSortOpen(prev => !prev)}
                    >
                      <SortIcon />
                      <span>Sort</span>
                    </ProjectSortButton>
                  </ProjectSort>
                  {!['today', 'upcoming'].includes(currentProject?.title) && (
                    <ProjectOptions ref={projectMenuButtonRef}>
                      <ProjectOptionsButton
                        onClick={() => setProjectMenuOpen(prev => !prev)}
                      >
                        <ProjectMore />
                      </ProjectOptionsButton>
                    </ProjectOptions>
                  )}
                </ProjectMenus>
              </ProjectHeadingContainer>
            </ProjectHeading>
            {sortOptions.option !== 'createdAt' && (
              <SortHeading>
                <SortDetails
                  className={
                    sortOptions.direction === 'desc' ? 'desc' : undefined
                  }
                >
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

            <TaskContainer
              project={currentProject}
              isComplete={false}
              setTasksToComplete={setTasksToComplete}
              setTasksToNotComplete={setTasksToNotComplete}
              setIsUndoVisible={setIsUndoVisible}
              clearTimer={clearTimer}
              sortOptions={sortOptions}
              setDashboardTasks={setDashboardTasks}
              setTasksLoading={setTasksLoading}
              currentTaskForm={currentTaskForm}
              setCurrentTaskForm={setCurrentTaskForm}
            />

            <AddTaskContainer
              className={showCompletedTasks ? 'complete' : undefined}
            >
              {!isAddTaskOpen ? (
                <AddTask
                  onClick={() => {
                    setIsAddTaskOpen(!isAddTaskOpen)
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
                  setIsOpen={setIsAddTaskOpen}
                  currentProject={currentProject}
                  scrollDownToLastTask={scrollDownToLastTask}
                />
              )}
            </AddTaskContainer>
            {showCompletedTasks && (
              <TaskContainer
                project={currentProject}
                isComplete={true}
                setTasksToComplete={setTasksToComplete}
                setTasksToNotComplete={setTasksToNotComplete}
                setIsUndoVisible={setIsUndoVisible}
                clearTimer={clearTimer}
                sortOptions={sortOptions}
                setDashboardTasks={setDashboardTasks}
                setTasksLoading={setTasksLoading}
              />
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
            <img src={logo} alt='Logo' />
            <Spinner />
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
