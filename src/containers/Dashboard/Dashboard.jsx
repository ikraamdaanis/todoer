import { useState, useEffect } from 'react'
import {
  AddTask,
  AddTaskText,
  DashboardContainer,
  PlusButton,
  ProjectContainer,
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

export const Dashboard = ({ history, match, isClosed }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState('')
  const [dashboardTasks, setDashboardTasks] = useState([])

  const dispatch = useDispatch()
  const { id } = match.params

  const isProject = id !== 'today' && id !== 'upcoming'

  const projectTasksDetails = useSelector(state => state.projectTasksDetails)
  const { loading: tasksLoading, tasks: projectTasks } = projectTasksDetails

  const allProjectsDetails = useSelector(state => state.allProjectsDetails)
  const {
    loading: projectsLoading,
    projects: projectsDetails,
  } = allProjectsDetails

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

  const fetchTasks = async param => {
    if (!projectsLoading) {
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
    !isProject && setDashboardTasks(allTasks)
    isProject && setDashboardTasks(projectTasks)
  }, [allTasks, projectTasks, projectsLoading, isProject, dashboardTasks])

  useEffect(() => {
    !currentProject && isProject && history.push('/app/today')
  }, [currentProject, id])

  return (
    <div>
      <Sidebar isClosed={isClosed} />
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
                      <li key={task.id}>{task.description}</li>
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
