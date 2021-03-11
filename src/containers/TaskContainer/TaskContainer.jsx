import { useState, useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { TaskItem } from '../../components'
import { ProjectTasksReference } from '../../firebase/References'
import { getAllTasks, getTaskStats } from '../../store/actions/taskActions'
import { TaskList } from './TaskContainerStyles'
import { format } from 'date-fns'

export const TaskContainer = ({
  project,
  isComplete,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  sortOptions,
  setDashboardTasks,
}) => {
  const [taskData, setTaskData] = useState(null)
  const [projectTaskList, setProjectTaskList] = useState(null)
  const [overdueTasks, setOverdueTasks] = useState(null)

  const dispatch = useDispatch()

  const taskStats = useSelector(state => state.taskStats)
  const { loading: loadingTasks, tasks: allTasks } = taskStats

  useEffect(() => {
    dispatch(getTaskStats())
  }, [])

  const fetchData = () => {
    allTasks && setTaskData(allTasks[project?.title])
  }

  useEffect(() => {
    !loadingTasks && fetchData()
  }, [loadingTasks, project, allTasks])

  useEffect(() => {
    const tasksToSort = []
    const tasksToNotSort = []
    const { option, direction } = sortOptions

    taskData?.forEach(task => {
      sortOptions && task[option]
        ? tasksToSort.push(task)
        : tasksToNotSort.push(task)
    })

    switch (option) {
      case 'description':
        tasksToSort.sort((a, b) =>
          a[option].toLowerCase().localeCompare(b[option].toLowerCase())
        )
        break
      case 'dueDate':
        tasksToSort.sort((a, b) => new Date(a[option]) - new Date(b[option]))
        break
      default:
        tasksToSort.sort((a, b) => a[option] - b[option])
    }

    const data = tasksToSort.concat(tasksToNotSort)
    direction === 'desc' && data.reverse()

    setOverdueTasks(allTasks?.overdue)
    setProjectTaskList(data)
    setDashboardTasks(data)
  }, [taskData, sortOptions, project])

  useEffect(() => {
    console.log('Overdue', overdueTasks)
  }, [overdueTasks])

  return (
    <TaskList>
      {projectTaskList
        ?.filter(task => task.isComplete == isComplete)
        .map(task => (
          <TaskItem
            key={task.id}
            task={task}
            setTasksToComplete={setTasksToComplete}
            setTasksToNotComplete={setTasksToNotComplete}
            setIsUndoVisible={setIsUndoVisible}
            clearTimer={clearTimer}
          />
        ))}
    </TaskList>
  )
}
