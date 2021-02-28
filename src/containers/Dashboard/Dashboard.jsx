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
} from './DashboardStyles'
import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { AddTaskForm, Spinner } from '../../components'
import { add, format, isBefore, isToday, isTomorrow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllTasks,
  getProjectTasks,
} from '../../store/actions/projectActions'
import { Sidebar } from '../Sidebar/Sidebar'
import { PROJECT_TASKS_DETAILS_CLEAR } from '../../store/constants/projectConstants'
import { ReactComponent as DueDateIcon } from '../../assets/images/due-date.svg'

export const Dashboard = ({ history, match, isClosed }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [dashboardTasks, setDashboardTasks] = useState([])

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

  useEffect(() => {
    !isProject && setDashboardTasks(allTasks)
    isProject && setDashboardTasks(projectTasks)
  }, [allTasks, projectTasks, projectsLoading, isProject, dashboardTasks])

  useEffect(() => {
    // console.clear()
    // console.log('Dashboard =>', dashboardTasks, currentProject)
  }, [dashboardTasks])

  useEffect(() => {
    if (projectsDetails) {
      const projectExists = projectsDetails.some(
        project => project.title.toLowerCase() === id
      )
      if (!isProject || projectExists) return
      history.push('/app/today')
    }
  }, [currentProject, isProject, id, projectsDetails])

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
                    {dashboardTasks.map(task => (
                      <TaskItem key={task.id}>
                        <TaskItemContainer>
                          <TaskCheck>
                            <div className='circle'>
                              <svg width='24' height='24'>
                                <path
                                  fill='currentColor'
                                  d='M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z'
                                ></path>
                              </svg>
                            </div>
                          </TaskCheck>
                          <TaskDetails>
                            <TaskDescription>
                              {task.description}
                            </TaskDescription>
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
                          </TaskDetails>
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
  )
}
