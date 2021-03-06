import { useState, useEffect, useRef } from 'react'
import {
  AddTask,
  AddTaskText,
  DashboardContainer,
  PlusButton,
  ProjectContainer,
  Title,
  TaskContainer,
  ProjectHeading,
  ProjectOptions,
  ProjectOptionsButton,
} from './DashboardStyles'
import {
  AddTaskForm,
  Modal,
  Spinner,
  TaskItem,
  DeleteModal,
  UndoComplete,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteProject,
  getProjectTasks,
} from '../../store/actions/projectActions'
import {
  completeTask,
  getAllTasks,
  incompleteTask,
} from '../../store/actions/taskActions'

import { Sidebar } from '../'
import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { ReactComponent as ProjectMore } from '../../assets/images/project-more.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg'
import { ReactComponent as CompleteIcon } from '../../assets/images/complete-icon.svg'
import { ReactComponent as HideIcon } from '../../assets/images/hide-icon.svg'
import { format } from 'date-fns'
import { AddTaskContainer } from '../../components/AddTaskForm/AddTaskFormStyles'
import { scrollToBottom } from '../../utils/scrollToBottom'
import { useCheckScrolling } from '../../hooks/useCheckScrolling'
import {
  MenuItem,
  TaskMenu,
  MenuList,
} from '../../components/TaskItem/TaskItemStyles'
import { useMenu } from '../../hooks/useMenu'
import { Line } from '../../components/ProfileMenu/ProfileMenuStyles'

export const Dashboard = ({ history, match, isClosed }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [dashboardTasks, setDashboardTasks] = useState([])
  const [tasksToComplete, setTasksToComplete] = useState([])
  const [isUndoVisible, setIsUndoVisible] = useState(false)

  const dispatch = useDispatch()
  const { id } = match.params

  const isProject = id !== 'today' && id !== 'upcoming'

  const projectList = useSelector(state => state.projectList)
  const { loading: projectsLoading, projects } = projectList

  const projectTasks = useSelector(state => state.projectTasks)
  const { loading: tasksLoading, tasks: projectTaskList } = projectTasks

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
    const [current] = projects?.filter(
      project => project.title.toLowerCase() === match.params.id
    )
    setCurrentProject(() => current)
  }

  const fetchTasks = param => {
    if (!projectsLoading) {
      setCurrentProject(null)
      if (param === 'today') {
        dispatch(
          getAllTasks({
            field: 'dueDate',
            condition: '==',
            query: format(new Date(), 'yyyy-MM-dd'),
          })
        )
      } else if (param === 'upcoming') {
        dispatch(
          getAllTasks({
            field: 'dueDate',
            condition: '>',
            query: format(new Date(), 'yyyy-MM-dd'),
          })
        )
      } else {
        assignCurrentProject()
        currentProject && dispatch(getProjectTasks(currentProject.title))
      }
    }
  }

  useEffect(() => {
    fetchTasks(id)
  }, [dispatch, id, projects, currentProject])

  const sortByDate = (a, b) => a.createdAt - b.createdAt

  useEffect(() => {
    !isProject && setDashboardTasks(allTasks?.sort(sortByDate))
    isProject && setDashboardTasks(projectTaskList?.sort(sortByDate))
  }, [allTasks, projectTaskList, projectsLoading, isProject, dashboardTasks])

  // useEffect(() => {
  //   console.clear()
  //   console.log('Dashboard =>', dashboardTasks, allTasks)
  // }, [dashboardTasks, allTasks])

  let timer

  const completeSelectedTask = () => {
    tasksToComplete.forEach(task => {
      const { project, id } = task
      dispatch(completeTask(id, project))
    })
    timer = setTimeout(() => {
      setIsUndoVisible(false)
      setTasksToComplete([])
    }, 5000)
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

  const clearTime = () => {
    clearTimeout(timer)
  }

  useEffect(() => {
    if (tasksToComplete.length) {
      completeSelectedTask()
    }
  }, [tasksToComplete, timer])

  const dashboard = useRef()
  const taskContainer = useRef()

  const scrollDownToLastTask = () => {
    scrollToBottom(dashboard, dashboardTasks, projectTaskList)
  }
  useCheckScrolling(dashboard, setIsScrolling)

  const projectMenuRef = useRef(null)
  const projectMenuButtonRef = useRef(null)

  useMenu(projectMenuButtonRef, projectMenuRef, setProjectMenuOpen)

  const [projectMenuRight, setProjectMenuRight] = useState(0)

  const projectMenuButtonPos = projectMenuButtonRef?.current?.getBoundingClientRect()
    .right

  const reportWindowSize = () => {
    if (projectMenuButtonPos + 125 < window.innerWidth) {
      setProjectMenuRight(projectMenuButtonPos - 150)
    } else {
      setProjectMenuRight(window.innerWidth - 250)
    }
  }

  useEffect(() => {
    reportWindowSize()
    window.addEventListener('resize', reportWindowSize)
  }, [projectMenuButtonPos, isClosed])

  return (
    <>
      <div>
        <Sidebar isClosed={isClosed} param={id} history={history} />
        <DashboardContainer className={isClosed && 'closed'} ref={dashboard}>
          <ProjectContainer>
            <ProjectHeading>
              <div className={`div ${isScrolling ? 'scrolling ' : undefined}`}>
                <Title>
                  {match.params.id}
                  {match.params.id === 'today' && (
                    <small>{format(new Date(), 'iii do MMM')}</small>
                  )}
                </Title>
                <ProjectOptions ref={projectMenuButtonRef}>
                  <ProjectOptionsButton
                    onClick={() => setProjectMenuOpen(prev => !prev)}
                  >
                    <ProjectMore />
                  </ProjectOptionsButton>
                </ProjectOptions>
              </div>
            </ProjectHeading>
            <TaskContainer>
              {projectsLoading ? (
                <div style={{ marginTop: '10rem' }}>
                  <Spinner />
                </div>
              ) : (
                dashboardTasks && (
                  <>
                    <div className='tasks'>
                      <ul ref={taskContainer}>
                        {dashboardTasks
                          .filter(task => !task.isComplete)
                          .map(task => (
                            <TaskItem
                              key={task.id}
                              task={task}
                              tasksToComplete={tasksToComplete}
                              setTasksToComplete={setTasksToComplete}
                              setIsUndoVisible={setIsUndoVisible}
                              clearTime={clearTime}
                              cancelCompleteTask={cancelCompleteTask}
                            />
                          ))}
                      </ul>
                    </div>
                    <AddTaskContainer>
                      {!isAddTaskOpen ? (
                        <AddTask
                          onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}
                        >
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
                      <div className='tasks'>
                        <ul>
                          {dashboardTasks
                            .filter(task => task.isComplete)
                            .map(task => (
                              <TaskItem
                                key={task.id}
                                task={task}
                                tasksToComplete={tasksToComplete}
                                setTasksToComplete={setTasksToComplete}
                                setIsUndoVisible={setIsUndoVisible}
                                clearTime={clearTime}
                                cancelCompleteTask={cancelCompleteTask}
                              />
                            ))}
                        </ul>
                      </div>
                    )}
                  </>
                )
              )}
            </TaskContainer>
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
      <TaskMenu
        ref={projectMenuRef}
        className={`project-menu ${projectMenuOpen ? 'open' : undefined}`}
        style={{
          transform: `translate(${projectMenuRight}px, 100px)`,
        }}
      >
        <MenuList>
          <Line style={{ width: '96%', margin: '0.2rem auto' }} />
          <MenuItem
            title={`${showCompletedTasks ? 'Hide' : 'Show'} completed tasks`}
            onClick={() => {
              setShowCompletedTasks(prev => !prev)
            }}
          >
            {showCompletedTasks ? <HideIcon /> : <CompleteIcon />}
            <span>{showCompletedTasks ? 'Hide' : 'Show'} completed tasks</span>
          </MenuItem>
          <Line style={{ width: '96%', margin: '0.2rem auto' }} />
          {currentProject?.title !== 'Inbox' && isProject && (
            <MenuItem
              title='Delete this project'
              onClick={() => {
                setDeleteModalOpen(true)
                setProjectMenuOpen(false)
              }}
            >
              <DeleteIcon />
              <span>Delete project</span>
            </MenuItem>
          )}
        </MenuList>
      </TaskMenu>
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
