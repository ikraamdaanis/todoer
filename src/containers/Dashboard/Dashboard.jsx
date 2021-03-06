import { useState, useEffect, useRef } from 'react'
import {
  AddTask,
  AddTaskText,
  DashboardContainer,
  PlusButton,
  ProjectContainer,
  Title,
  UndoNotification,
  UndoContainer,
  UndoText,
  UndoButton,
  UndoCloseButton,
  TaskContainer,
  ProjectHeading,
  ProjectOptions,
  ProjectOptionsButton,
} from './DashboardStyles'
import { AddTaskForm, Spinner, TaskItem } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectTasks } from '../../store/actions/projectActions'
import {
  completeTask,
  getAllTasks,
  incompleteTask,
} from '../../store/actions/taskActions'
import { Sidebar } from '../'
import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/x-icon.svg'
import { ReactComponent as ProjectMore } from '../../assets/images/project-more.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg'
import { format } from 'date-fns'
import { AddTaskContainer } from '../../components/AddTaskForm/AddTaskFormStyles'
import { useScrollToBottom } from '../../hooks/useScrollToBottom'
import { useCheckScrolling } from '../../hooks/useCheckScrolling'
import {
  DeleteButton,
  TaskMenu,
  TaskMenuList,
} from '../../components/TaskItem/TaskItemStyles'
import { useMenu } from '../../hooks/useMenu'

export const Dashboard = ({ history, match, isClosed }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
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
      dispatch(completeTask(project, id))
    })
    timer = setTimeout(() => {
      setIsUndoVisible(false)
      setTasksToComplete([])
    }, 5000)
  }

  const cancelCompleteTask = () => {
    tasksToComplete.forEach(task => {
      const { project, id } = task
      dispatch(incompleteTask(project, id))
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

  useScrollToBottom(dashboard, dashboardTasks, projectTaskList, dashboardTasks)
  useCheckScrolling(dashboard, setIsScrolling)

  const projectMenuRef = useRef(null)
  const projectMenuButtonRef = useRef(null)

  useMenu(projectMenuButtonRef, projectMenuRef, setProjectMenuOpen)

  const [projectMenuRight, setProjectMenuRight] = useState(0)

  const projectMenuButtonPos = projectMenuButtonRef?.current?.getBoundingClientRect()
    .right

  const reportWindowSize = () => {
    if (projectMenuButtonPos + 125 < window.innerWidth) {
      console.log('Width')
      setProjectMenuRight(projectMenuButtonPos - 150)
    } else {
      console.log('Window')
      setProjectMenuRight(window.innerWidth - 250)
    }
  }

  useEffect(() => {
    reportWindowSize()
    window.addEventListener('resize', reportWindowSize)
  }, [projectMenuButtonPos, isClosed])

  // useEffect(() => {
  //   console.log('Is closed -------- ^')
  //   setTimeout(() => {
  //     reportWindowSize()
  //     console.log('Is closed -------- V')
  //   }, 500)
  // }, [isClosed])

  useEffect(() => {
    console.log(projectMenuRight)
  }, [projectMenuRight])

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
                      <ul>
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
                        />
                      )}
                    </AddTaskContainer>
                  </>
                )
              )}
            </TaskContainer>
          </ProjectContainer>
        </DashboardContainer>
      </div>
      {isUndoVisible && (
        <UndoNotification>
          <UndoContainer>
            <UndoText>
              {tasksToComplete.length > 1
                ? `${tasksToComplete.length} tasks completed`
                : `${tasksToComplete.length} task completed`}
            </UndoText>
            <UndoButton type='button' onClick={() => cancelCompleteTask()}>
              Undo
            </UndoButton>
            <UndoCloseButton
              type='button'
              onClick={() => setIsUndoVisible(false)}
            >
              <CloseIcon />
            </UndoCloseButton>
          </UndoContainer>
        </UndoNotification>
      )}
      <TaskMenu
        ref={projectMenuRef}
        className={`project-menu ${projectMenuOpen ? 'open' : undefined}`}
        style={{
          transform: `translate(${projectMenuRight}px, 100px)`,
        }}
      >
        <TaskMenuList>
          <DeleteButton
            title='Delete this project'
            onClick={() => {
              // setDeleteModalOpen(true)
              setProjectMenuOpen(false)
            }}
          >
            <DeleteIcon />
            <span>Delete project</span>
          </DeleteButton>
        </TaskMenuList>
      </TaskMenu>
    </>
  )
}
