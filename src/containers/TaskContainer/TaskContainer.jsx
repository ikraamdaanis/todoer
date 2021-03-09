import format from 'date-fns/format'
import { useState, useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, TaskItem } from '../../components'
import { ProjectTasksReference } from '../../firebase/References'
import { getAllTasks } from '../../store/actions/taskActions'
import { TaskList } from './TaskContainerStyles'

export const TaskContainer = ({
  project,
  isComplete,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  sortOptions,
}) => {
  const [taskData, setTaskData] = useState(null)
  const [projectTaskList, setProjectTaskList] = useState([])

  const dispatch = useDispatch()

  const [snapshots, loading] = useCollection(
    ProjectTasksReference(project?.title).orderBy('createdAt', 'asc')
  )

  const taskList = useSelector(state => state.taskList)
  const { tasks } = taskList

  useEffect(() => {
    setTaskData(null)
  }, [project])

  useEffect(() => {
    if (['today', 'upcoming'].includes(project?.title)) {
      project.title === 'today'
        ? dispatch(
            getAllTasks({
              field: 'dueDate',
              condition: '==',
              query: format(new Date(), 'yyyy-MM-dd'),
            })
          )
        : dispatch(
            getAllTasks({
              field: 'dueDate',
              condition: '>',
              query: format(new Date(), 'yyyy-MM-dd'),
            })
          )
    } else {
      const data = []
      !loading &&
        snapshots.docs.forEach(task => {
          data.push(task.data())
        })
      setTaskData(data)
    }
  }, [loading, snapshots])

  useEffect(() => {
    tasks && setTaskData(tasks)
  }, [tasks])

  useEffect(() => {
    const { option, direction } = sortOptions
    const sortedData = []
    const restOfData = []
    taskData?.forEach(task => {
      if (task.isComplete && !isComplete) return
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
  }, [taskData, sortOptions, project])

  return loading ? (
    <div style={{ marginTop: '5rem' }}>
      <Spinner />
    </div>
  ) : (
    <TaskList>
      {projectTaskList
        .filter(task => task.isComplete == isComplete)
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
