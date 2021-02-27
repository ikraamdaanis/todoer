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

  const fetchTasks = async param => {
    if (!projectsLoading) {
      if (param === 'today') {
        await dispatch(getAllTasks('=='))
        !allTasksLoading && (await setDashboardTasks(allTasks))
      } else if (param === 'upcoming') {
        await dispatch(getAllTasks('>'))
        !allTasksLoading && (await setDashboardTasks(allTasks))
      } else {
        const [current] = projectsDetails?.filter(
          project => project.title.toLowerCase() === match.params.id
        )
        setCurrentProject(current)
        currentProject &&
          (await dispatch(getProjectTasks(currentProject.title)))
        !tasksLoading && (await setDashboardTasks(projectTasks))
      }
    }
  }

  useEffect(() => {
    fetchTasks(id)
    console.log('Tasks: ', dashboardTasks)
  }, [dispatch, id, projectsDetails, dashboardTasks])

  useEffect(() => {
    !currentProject ||
      id !== 'today' ||
      (id !== 'upcoming' && history.push('/app/today'))
  }, [currentProject, id])

  return (
    <div>
      <Sidebar isClosed={isClosed} />
      <DashboardContainer className={isClosed && 'closed'}>
        {isLoading || projectsLoading || tasksLoading ? (
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
              {tasksLoading && allTasksLoading && !dashboardTasks ? (
                <Spinner />
              ) : (
                <div className='tasks'>
                  {/* {dashboardTasks.flat().map(task => (
                    <p key={task.id}>{task.description}</p>
                  ))} */}
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
