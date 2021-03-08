import { useState, useEffect, useRef } from 'react'
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
} from './DashboardStyles'
import {
  AddTaskForm,
  Modal,
  DeleteModal,
  UndoComplete,
  ProjectMenu,
  ProjectSortMenu,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../store/actions/projectActions'
import {
  completeTask,
  getAllTasks,
  incompleteTask,
} from '../../store/actions/taskActions'

import { Sidebar, TaskContainer } from '../'

import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { ReactComponent as ProjectMore } from '../../assets/images/project-more.svg'
import { ReactComponent as SortIcon } from '../../assets/images/sort-icon.svg'

import { format } from 'date-fns'
import { AddTaskContainer } from '../../components/AddTaskForm/AddTaskFormStyles'
import { scrollToBottom } from '../../utils/scrollToBottom'
import { useCheckScrolling } from '../../hooks/useCheckScrolling'

import { useMenu } from '../../hooks/useMenu'
import { useSetPosition } from '../../hooks/useSetPosition'

export const Dashboard = ({ history, match, isClosed }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
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
  const [sortOptions, setSortOptions] = useState(null)

  useEffect(() => {
    // console.log('Sort Options =>', sortOptions)
  }, [sortOptions])

  const dispatch = useDispatch()
  const { id } = match.params

  const isProject = id !== 'today' && id !== 'upcoming'

  const projectList = useSelector(state => state.projectList)
  const { loading: projectsLoading, projects } = projectList

  const taskList = useSelector(state => state.taskList)
  const { loading: taskListLoading, tasks: allTasks } = taskList

  useEffect(() => {
    if (projects) {
      const projectExists = projects.some(
        project => project.title.toLowerCase() === id
      )
      if (!isProject || projectExists) return
      history.push('/app/inbox')
    }
  }, [currentProject, isProject, id, projects])

  const assignCurrentProject = () => {
    if (projects) {
      const [current] = projects?.filter(
        project => project.title.toLowerCase() === id
      )
      current && setCurrentProject(current)
    }
  }

  const fetchTasks = () => {
    if (!projectsLoading) {
      setCurrentProject(null)
      assignCurrentProject()
    }
  }

  useEffect(() => {
    fetchTasks(id)
  }, [id, projects, currentProject])

  let timer

  const completeSelectedTask = () => {
    tasksToComplete.forEach(task => {
      const { id, project } = task
      dispatch(completeTask(id, project))
    })
    timer = setTimeout(() => {
      setIsUndoVisible(false)
      setTasksToComplete([])
    }, 5000)
  }

  const notCompleteSelectedTask = () => {
    tasksToNotComplete.forEach(task => {
      const { id, project } = task
      dispatch(incompleteTask(id, project))
    })
  }

  const cancelCompleteTask = () => {
    tasksToComplete.forEach(task => {
      const { id, project } = task
      dispatch(incompleteTask(id, project))
    })
    clearTimeout(timer)
    setTasksToComplete([])
    setIsUndoVisible(false)
  }

  const clearTimer = () => {
    clearTimeout(timer)
  }

  useEffect(() => {
    if (tasksToComplete.length) {
      completeSelectedTask()
    }
  }, [tasksToComplete, timer])

  useEffect(() => {
    if (tasksToNotComplete.length) {
      notCompleteSelectedTask()
      setTasksToComplete([])
    }
  }, [tasksToNotComplete])

  const dashboard = useRef()

  const scrollDownToLastTask = () => {
    scrollToBottom(dashboard, dashboardTasks)
  }
  useCheckScrolling(dashboard, setIsScrolling)

  const projectMenuRef = useRef(null)
  const projectMenuButtonRef = useRef(null)
  useMenu(projectMenuButtonRef, projectMenuRef, setProjectMenuOpen)
  const [projectMenuRight] = useSetPosition(projectMenuButtonRef, isClosed)

  const projectSortMenuRef = useRef(null)
  const projectSortMenuButtonRef = useRef(null)
  useMenu(projectSortMenuButtonRef, projectSortMenuRef, setProjectSortOpen)
  const [projectSortMenuRight] = useSetPosition(
    projectSortMenuButtonRef,
    isClosed
  )

  return (
    <>
      <div>
        <Sidebar isClosed={isClosed} param={id} />
        <DashboardContainer className={isClosed && 'closed'} ref={dashboard}>
          <ProjectContainer>
            <ProjectHeading>
              <ProjectHeadingContainer
                className={`div ${isScrolling ? 'scrolling ' : undefined}`}
              >
                <Title>
                  {match.params.id}
                  {match.params.id === 'today' && (
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
                  <ProjectOptions ref={projectMenuButtonRef}>
                    <ProjectOptionsButton
                      onClick={() => setProjectMenuOpen(prev => !prev)}
                    >
                      <ProjectMore />
                    </ProjectOptionsButton>
                  </ProjectOptions>
                </ProjectMenus>
              </ProjectHeadingContainer>
            </ProjectHeading>
            <TaskContainer
              project={currentProject}
              isComplete={false}
              setTasksToComplete={setTasksToComplete}
              setTasksToNotComplete={setTasksToNotComplete}
              setIsUndoVisible={setIsUndoVisible}
              clearTimer={clearTimer}
              sortOptions={sortOptions}
            />

            <AddTaskContainer
              className={showCompletedTasks ? 'complete' : undefined}
            >
              {!isAddTaskOpen ? (
                <AddTask onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}>
                  <PlusButton className='plus'>
                    <PlusButtonSVG />
                  </PlusButton>
                  <AddTaskText>Add task</AddTaskText>
                </AddTask>
              ) : (
                <AddTaskForm
                  history={history}
                  setIsOpen={setIsAddTaskOpen}
                  currentProject={currentProject}
                  id='taskForm'
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
    </>
  )
}
