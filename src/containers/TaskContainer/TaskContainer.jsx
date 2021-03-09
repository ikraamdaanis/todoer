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
    ProjectTasksReference(project?.title).orderBy(searchQuery.option, 'asc')
  )

  useEffect(() => {
    const sortedData = []
    const restOfData = []

    snapshots?.docs.forEach(task => {
      searchQuery && task.data()[searchQuery.option]
        ? sortedData.push(task.data())
        : restOfData.push(task.data())
    })

    const data = sortedData.concat(restOfData)
    searchQuery.direction === 'desc' && data.reverse()

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
