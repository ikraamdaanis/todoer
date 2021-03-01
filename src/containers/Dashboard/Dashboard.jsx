import { useState, useEffect } from 'react'
import {
  AddTask,
  AddTaskText,
  DashboardContainer,
  PlusButton,
  ProjectContainer,
  TaskCheck,
  TaskDescription,
  TaskDetails,
  TaskItem,
  TaskItemContainer,
  TaskTags,
  Title,
  UndoNotification,
  UndoContainer,
  UndoText,
  UndoButton,
  UndoCloseButton,
} from './DashboardStyles'
import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { AddTaskForm, Spinner } from '../../components'
import { add, format, isBefore, isToday, isTomorrow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllTasks,
  getProjectTasks,
} from '../../store/actions/projectActions'
import { completeTask, deleteTask } from '../../store/actions/taskActions'
import { Sidebar } from '../Sidebar/Sidebar'
import { PROJECT_TASKS_DETAILS_CLEAR } from '../../store/constants/projectConstants'
import { ReactComponent as DueDateIcon } from '../../assets/images/due-date.svg'
import { ReactComponent as TickIcon } from '../../assets/images/tick.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/x-icon.svg'
import { Link } from 'react-router-dom'

export const Dashboard = ({ history, match, isClosed }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [dashboardTasks, setDashboardTasks] = useState([])
  const [taskToComplete, setTaskToComplete] = useState('')
  const [isUndoVisible, setIsUndoVisible] = useState(false)

  const dispatch = useDispatch()
  const { id } = match.params

  const isProject = id !== 'today' && id !== 'upcoming'

  const allProjectsDetails = useSelector(state => state.allProjectsDetails)
  const {
    loading: projectsLoading,
    projects: projectsDetails,
  } = allProjectsDetails

  const projectTasksDetails = useSelector(state => state.projectTasksDetails)
  const { loading: tasksLoading, tasks: projectTasks } = projectTasksDetails

  const allProjectTasks = useSelector(state => state.allProjectTasks)
  const { loading: allTasksLoading, tasks: allTasks } = allProjectTasks

  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  const assignCurrentProject = () => {
    const [current] = projectsDetails?.filter(
      project => project.title.toLowerCase() === match.params.id
    )

    setCurrentProject(() => current)
  }

  const fetchTasks = param => {
    if (!projectsLoading) {
      setCurrentProject(null)
      if (param === 'today') {
        dispatch(getAllTasks('=='))
      } else if (param === 'upcoming') {
        dispatch(getAllTasks('>'))
      } else {
        assignCurrentProject()
        currentProject && dispatch(getProjectTasks(currentProject.title))
      }
    }
  }

  useEffect(() => {
    fetchTasks(id)
  }, [dispatch, id, projectsDetails, currentProject])

  useEffect(() => {
    dispatch({
      type: PROJECT_TASKS_DETAILS_CLEAR,
    })
  }, [currentProject])

  const sortByDate = (a, b) => a.createdAt - b.createdAt

  useEffect(() => {
    !isProject && setDashboardTasks(allTasks?.sort(sortByDate))
    isProject && setDashboardTasks(projectTasks?.sort(sortByDate))
  }, [allTasks, projectTasks, projectsLoading, isProject, dashboardTasks])

  // useEffect(() => {
  //   console.clear()
  //   console.log('Dashboard =>', dashboardTasks)
  // }, [dashboardTasks])

  useEffect(() => {
    if (projectsDetails) {
      const projectExists = projectsDetails.some(
        project => project.title.toLowerCase() === id
      )
      if (!isProject || projectExists) return
      history.push('/app/today')
    }
  }, [currentProject, isProject, id, projectsDetails])

  let timer

  const completeSelectedTask = (project, id) => {
    timer = setTimeout(() => {
      dispatch(completeTask(project, id))
      setIsUndoVisible(false)
    }, 5000)
  }

  const cancelCompleteTask = () => {
    clearTimeout(timer)
    setTaskToComplete('')
    setIsUndoVisible(false)
  }

  useEffect(() => {
    if (taskToComplete) {
      const { project, id } = taskToComplete
      completeSelectedTask(project, id)
    }
  }, [taskToComplete])

  const checkDate = actualDate => {
    if (isToday(new Date(actualDate))) {
      return 'Today'
    } else if (isTomorrow(new Date(actualDate))) {
      return 'Tomorrow'
    } else if (isBefore(new Date(actualDate), add(new Date(), { days: 7 }))) {
      return format(new Date(actualDate), 'EEEE')
    } else {
      return format(new Date(actualDate), 'do MMM')
    }
  }

  const dateColour = (displayDate, actualDate) =>
    displayDate === 'Today'
      ? '#25b84c'
      : displayDate === 'Tomorrow'
      ? '#ff9a14'
      : isBefore(new Date(actualDate), add(new Date(), { days: 7 }))
      ? '#a970ff'
      : 'unset'

  return (
    <>
      <div>
        <Sidebar isClosed={isClosed} param={id} history={history} />
        <DashboardContainer className={isClosed && 'closed'}>
          <ProjectContainer>
            <Title>
              {match.params.id}
              {match.params.id === 'today' && (
                <small>{format(new Date(), 'iii do MMM')}</small>
              )}
            </Title>
            {isLoading || projectsLoading || tasksLoading || allTasksLoading ? (
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
                            className={
                              taskToComplete.id === task.id ? 'hide' : undefined
                            }
                          >
                            <TaskItemContainer>
                              <TaskDetails>
                                <TaskCheck
                                  onClick={() => {
                                    setTaskToComplete({
                                      project: task.project,
                                      id: task.id,
                                    })
                                    setIsUndoVisible(true)
                                  }}
                                >
                                  <div className='circle'>
                                    <TickIcon />
                                  </div>
                                </TaskCheck>
                                <Link
                                  to={`/app/${currentProject.title.toLowerCase()}/delete/${
                                    task.id
                                  }`}
                                >
                                  Go
                                </Link>
                                <TaskDescription>
                                  {task.description}
                                </TaskDescription>
                              </TaskDetails>
                              {task.dueDate && (
                                <TaskTags>
                                  <div
                                    className='date'
                                    style={{
                                      color: dateColour(
                                        checkDate(task.dueDate),
                                        task.dueDate
                                      ),
                                    }}
                                  >
                                    <DueDateIcon />
                                    <span>{checkDate(task.dueDate)}</span>
                                  </div>
                                </TaskTags>
                              )}
                            </TaskItemContainer>
                          </TaskItem>
                        ))}
                    </ul>
                  </div>
                  {!isOpen ? (
                    <AddTask onClick={() => setIsOpen(!isOpen)}>
                      <PlusButton className='plus'>
                        <PlusButtonSVG />
                      </PlusButton>
                      <AddTaskText>Add task</AddTaskText>
                    </AddTask>
                  ) : (
                    <AddTaskForm
                      history={history}
                      setIsOpen={setIsOpen}
                      currentProject={currentProject}
                    />
                  )}
                </>
              )
            )}
          </ProjectContainer>
        </DashboardContainer>
      </div>
      {isUndoVisible && (
        <UndoNotification>
          <UndoContainer>
            <UndoText>1 task completed</UndoText>
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
    </>
  )
}
