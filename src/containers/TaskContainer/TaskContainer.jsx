import { useState, useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Spinner, TaskItem } from '../../components'
import { ProjectTasksReference } from '../../firebase/References'
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
  const defaultQuery = { option: 'createdAt', direction: 'asc' }

  const [projectTaskList, setProjectTaskList] = useState([])
  const [searchQuery, setSearchQuery] = useState(defaultQuery)

  const [snapshots, loading] = useCollection(
    ProjectTasksReference(project?.title).orderBy('createdAt', 'asc')
  )

  useEffect(() => {
    const sortedData = []
    const restOfData = []

    const { option, direction } = searchQuery

    snapshots?.docs.forEach(item => {
      const task = item.data()
      if (task.isComplete && !isComplete) return

      searchQuery && task[option]
        ? sortedData.push(task)
        : restOfData.push(task)
    })

    const data = sortedData.concat(restOfData)

    switch (option) {
      case 'description':
        data.sort((a, b) =>
          a[option].toLowerCase().localeCompare(b[option].toLowerCase())
        )
      default:
        data.sort((a, b) => a[option] - b[option])
    }

    console.log(data)
    direction === 'desc' && data.reverse()

    setProjectTaskList(data)
  }, [snapshots, searchQuery, project])

  useEffect(() => {
    if (sortOptions) {
      setSearchQuery({
        option: sortOptions.option,
        direction: sortOptions.direction,
      })
    } else {
      setSearchQuery(defaultQuery)
    }
  }, [sortOptions])

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
