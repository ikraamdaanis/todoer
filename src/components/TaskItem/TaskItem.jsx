import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  TaskCheck,
  TaskDescription,
  TaskDetails,
  TaskItemContainer,
  TaskListItem,
} from './TaskItemStyles'
import { TickIcon } from '../../assets/'
import { deleteTask } from '../../store/actions/'
import { AddTaskForm, DeleteModal, Modal } from '../'
import { ThemeContext } from '../../App'
import { TaskMenuContainer } from './TaskMenuContainer'
import { TaskTagsContainer } from './TaskTagsContainer'

export const TaskItem = ({
  task,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  currentProject,
}) => {
  const [editMenuOpen, setEditMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const { darkTheme } = useContext(ThemeContext)

  return (
    <TaskListItem key={task.id}>
      <TaskItemContainer>
        {editMenuOpen ? (
          <AddTaskForm
            edit={true}
            setIsOpen={setEditMenuOpen}
            currentProject={{ title: task.project }}
            taskDetails={task}
          />
        ) : (
          <>
            <TaskDetails>
              <TaskCheck
                onClick={() => {
                  if (!task.isComplete) {
                    clearTimer()
                    setTasksToComplete(prev => [
                      ...prev,
                      {
                        project: task.project,
                        id: task.id,
                      },
                    ])
                    setIsUndoVisible(true)
                  } else if (task.isComplete) {
                    setTasksToNotComplete(prev => [
                      ...prev,
                      {
                        project: task.project,
                        id: task.id,
                      },
                    ])
                  }
                }}
              >
                <div className={`circle ${task.isComplete ? 'complete' : undefined}`}>
                  <TickIcon />
                </div>
              </TaskCheck>
              <TaskDescription className={`${task.isComplete ? 'complete' : undefined}`}>
                {task.description}
              </TaskDescription>
              <TaskMenuContainer
                task={task}
                darkTheme={darkTheme}
                setEditMenuOpen={setEditMenuOpen}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            </TaskDetails>
            {task.dueDate && (
              <TaskTagsContainer
                task={task}
                currentProject={currentProject}
                darkTheme={darkTheme}
              />
            )}
          </>
        )}
      </TaskItemContainer>
      {deleteModalOpen && (
        <Modal>
          <DeleteModal
            id={task.id}
            detail={task.description}
            action={deleteTask}
            setDeleteModalOpen={setDeleteModalOpen}
            project={task.project}
          />
        </Modal>
      )}
    </TaskListItem>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object,
  setTasksToComplete: PropTypes.func,
  setTasksToNotComplete: PropTypes.func,
  setIsUndoVisible: PropTypes.func,
  clearTimer: PropTypes.func,
  currentProject: PropTypes.object,
}
