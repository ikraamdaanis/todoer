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
  const [usingSnapshot, setUsingSnapShot] = useState(false)

  useEffect(() => {
    setUsingSnapShot(false)
  }, [project])

  const dispatch = useDispatch()

  const [snapshots, loading] = useCollection(
    ProjectTasksReference(project?.title).orderBy('createdAt', 'asc')
  )

  const taskList = useSelector(state => state.taskList)
  const { tasks } = taskList

  const taskStats = useSelector(state => state.taskStats)
  const { loading: loadingTasks, tasks: allTasks } = taskStats

  const taskCreate = useSelector(state => state.taskCreate)
  const { loading: creating } = taskCreate

  const fetchData = () => {
    if (['today', 'upcoming'].includes(project?.title)) {
      const today = {
        field: 'dueDate',
        condition: '<=',
        query: format(new Date(), 'yyyy-MM-dd'),
      }
      const afterToday = {
        field: 'dueDate',
        condition: '>',
        query: format(new Date(), 'yyyy-MM-dd'),
      }
      project.title === 'today'
        ? dispatch(getAllTasks(today))
        : dispatch(getAllTasks(afterToday))
    }

    allTasks && setTaskData(allTasks[project?.title])
  }

  useEffect(() => {
    dispatch(getTaskStats())
  }, [])

  useEffect(() => {
    creating && setUsingSnapShot(true)
  }, [creating])

  useEffect(() => {
    if (
      isComplete ||
      (usingSnapshot && !['today', 'upcoming'].includes(project?.title))
    ) {
      const data = []
      !loading && snapshots.docs.forEach(task => data.push(task.data()))
      data.length ? setTaskData(data) : setTaskData([])
    } else {
      !loadingTasks && !loading && fetchData()
    }
  }, [loading, loadingTasks, project, usingSnapshot])

  useEffect(() => {
    if (project?.title === 'today' && tasks) {
      const today = []
      const overdue = []

      tasks.forEach(task => {
        if (task.dueDate === format(new Date(), 'yyyy-MM-dd')) {
          today.push(task)
        } else {
          overdue.push(task)
        }
      })

      setOverdueTasks(overdue)
      setTaskData(today)
    } else {
      tasks && setTaskData(tasks)
    }
  }, [tasks])

  useEffect(() => {
    const { option, direction } = sortOptions
    const sortedData = []
    const restOfData = []

    taskData?.forEach(task => {
      sortOptions && task[option]
        ? sortedData.push(task)
        : restOfData.push(task)
    })

    const data = sortedData.concat(restOfData)
    switch (option) {
      case 'description':
        data.sort((a, b) =>
          a[option].toLowerCase().localeCompare(b[option].toLowerCase())
        )
        break
      default:
        data.sort((a, b) => a[option] - b[option])
    }

    direction === 'desc' && data.reverse()

    setProjectTaskList(data)
    setDashboardTasks(data)
  }, [taskData, sortOptions, project])

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
