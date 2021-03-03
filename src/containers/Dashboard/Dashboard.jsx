import { useState, useEffect } from 'react'
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
} from './DashboardStyles'
import { AddTaskForm, Spinner, TaskItem } from '../../components'

import { useDispatch, useSelector } from 'react-redux'
import { getProjectTasks } from '../../store/actions/projectActions'
import { completeTask, getAllTasks } from '../../store/actions/taskActions'
import { Sidebar } from '../Sidebar/Sidebar'
import { PROJECT_TASKS_DETAILS_CLEAR } from '../../store/constants/projectConstants'
import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'

import { ReactComponent as CloseIcon } from '../../assets/images/x-icon.svg'
import { format } from 'date-fns'

export const Dashboard = ({ history, match, isClosed }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const [currentProject, setCurrentProject] = useState(null)
  const [dashboardTasks, setDashboardTasks] = useState([])
  const [tasksToComplete, setTasksToComplete] = useState([])
  const [isUndoVisible, setIsUndoVisible] = useState(false)

  const dispatch = useDispatch()
  const { id } = match.params

  const isProject = id !== 'today' && id !== 'upcoming'

  const projectList = useSelector(state => state.projectList)
  const { loading: projectsLoading, projects } = projectList

  const projectTasksDetails = useSelector(state => state.projectTasksDetails)
  const { loading: tasksLoading, tasks: projectTasks } = projectTasksDetails

  const taskList = useSelector(state => state.taskList)
  const { loading: taskListLoading, tasks: allTasks } = taskList

  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

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
  }, [dispatch, id, projects, currentProject])

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
  //   console.log('Dashboard =>', dashboardTasks, allTasks)
  // }, [dashboardTasks, allTasks])

  useEffect(() => {
    if (projects) {
      const projectExists = projects.some(
        project => project.title.toLowerCase() === id
      )
      if (!isProject || projectExists) return
      history.push('/app/today')
    }
  }, [currentProject, isProject, id, projects])

  let timer

  const completeSelectedTask = () => {
    timer = setTimeout(() => {
      tasksToComplete.forEach(task => {
        const { project, id } = task
        dispatch(completeTask(project, id))
      })
      setIsUndoVisible(false)
    }, 5000)
  }

  const cancelCompleteTask = () => {
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
            {isLoading || projectsLoading || tasksLoading || taskListLoading ? (
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
    </>
  )
}
