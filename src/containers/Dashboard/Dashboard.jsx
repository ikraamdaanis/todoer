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

  const dispatch = useDispatch()

  const projectTasksDetails = useSelector(state => state.projectTasksDetails)
  const { loading: tasksLoading, tasks: projectTasks } = projectTasksDetails

  const allProjectsDetails = useSelector(state => state.allProjectsDetails)
  const {
    loading: projectsLoading,
    projects: projectsDetails,
  } = allProjectsDetails

  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  useEffect(() => {
    if (!projectsLoading) {
      const [current] = projectsDetails?.filter(
        project => project.title.toLowerCase() === match.params.id
      )
      setCurrentProject(current)
      // currentProject && console.log('Current: ', currentProject.title)
    }
  }, [dispatch, match, projectsDetails])

  useEffect(() => {
    currentProject && dispatch(getProjectTasks(currentProject.title))
    !currentProject && history.push('/app/today')
  }, [currentProject])

  useEffect(() => {
    !tasksLoading && console.log('Tasks: ', projectTasks, match.params.id)
    dispatch(getAllTasks())
  }, [match])

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
              {projectTasks && (
                <div className='tasks'>
                  {projectTasks[0].map(task => (
                    <p key={task.id}>{task.description}</p>
                  ))}
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
