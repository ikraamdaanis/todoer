import { useState, useEffect } from 'react'
import {
  AddTask,
  AddTaskText,
  DashboardContainer,
  PlusButton,
  ProjectContainer,
  TaskCheck,
  TaskDescription,
  TaskItem,
  TaskItemContainer,
  Title,
} from './DashboardStyles'
import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { AddTaskForm, Spinner } from '../../components'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllTasks,
  getProjectTasks,
} from '../../store/actions/projectActions'
import { Sidebar } from '../Sidebar/Sidebar'
import { PROJECT_TASKS_DETAILS_CLEAR } from '../../store/constants/projectConstants'

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

  return (
    <div>
      <Sidebar isClosed={isClosed} param={id} history={history} />
      <DashboardContainer className={isClosed && 'closed'}>
        {isLoading || projectsLoading || tasksLoading || allTasksLoading ? (
          <div style={{ marginTop: '10rem' }}>
            <Spinner />
          </div>
        ) : (
          <>
            <ProjectContainer>
              <Title>
                {match.params.id}
                {match.params.id === 'today' && (
                  <small>{format(new Date(), 'iii do MMM')}</small>
                )}
              </Title>
              {dashboardTasks && (
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
                          <TaskDescription>{task.description}</TaskDescription>
                        </TaskItemContainer>
                      </TaskItem>
                    ))}
                  </ul>
                </div>
              )}
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
            </ProjectContainer>
          </>
        )}
      </DashboardContainer>
    </div>
  )
}
