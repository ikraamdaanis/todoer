import { useState } from 'react'
import {
  DatePickerInput,
  DatePickerToggle,
  ToggleButton,
} from './DatePickerStyles'
import { ReactComponent as ScheduleIcon } from '../../assets/images/schedule-icon.svg'
import { add, format, isBefore, isToday, isTomorrow, isWeekend } from 'date-fns'

export const DatePicker = ({ setDate }) => {
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [dueDateText, setDueDateText] = useState('Today')

  const handleChange = ({ target }) => {
    const date = target.value
    setDate(date)
    setDueDate(dueDate => date)
    setDueDateText(dueDateText => {
      if (isToday(new Date(date))) {
        return 'Today'
      } else if (isTomorrow(new Date(date))) {
        return 'Tomorrow'
      } else if (isBefore(new Date(date), add(new Date(), { days: 7 }))) {
        return format(new Date(date), 'EEEE')
      } else {
        return format(new Date(date), 'do MMM')
      }
    })
  }

  const color =
    dueDateText === 'Today'
      ? '#25b84c'
      : dueDateText === 'Tomorrow'
      ? '#ff9a14'
      : isBefore(new Date(dueDate), add(new Date(), { days: 7 }))
      ? '#a970ff'
      : 'unset'

  return (
    <>
      <DatePickerToggle style={{ color: color }}>
        <ScheduleIcon />
        <ToggleButton>{dueDateText}</ToggleButton>
        <DatePickerInput
          type='date'
          title='Pick a due date'
          value={dueDate}
          onChange={handleChange}
          min={format(new Date(), 'yyyy-MM-dd')}
        />
      </DatePickerToggle>
    </>
  )
}
