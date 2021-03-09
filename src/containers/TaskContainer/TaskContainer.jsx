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
  const [projectTaskList, setProjectTaskList] = useState([])

  const [snapshots, loading] = useCollection(
    ProjectTasksReference(project?.title).orderBy('createdAt', 'asc')
  )

  useEffect(() => {
    const { option, direction } = sortOptions
    const sortedData = []
    const restOfData = []

    snapshots?.docs.forEach(item => {
      const task = item.data()
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
  }, [snapshots, sortOptions, project])

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
