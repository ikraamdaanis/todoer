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
import { getProjectTasks } from '../../store/actions/projectActions'

export const Dashboard = ({ match, isClosed }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

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
      const [currentProject] = projectsDetails?.filter(
        project => project.title.toLowerCase() === match.params.id
      )
      dispatch(getProjectTasks(currentProject.title))
    }
  }, [dispatch, match])

  return (
    <DashboardContainer className={isClosed && 'closed'}>
      {isLoading || projectsLoading ? (
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
            {!tasksLoading && (
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
              <AddTaskForm setIsOpen={setIsOpen} />
            )}
          </ProjectContainer>
        </>
      )}
    </DashboardContainer>
  )
}
