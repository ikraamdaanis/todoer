import { useState, useEffect } from 'react'
import {
  DatePickerInput,
  DatePickerToggle,
  ToggleButton,
} from './DatePickerStyles'
import { ReactComponent as ScheduleIcon } from '../../assets/images/schedule-icon.svg'
import { add, format, isBefore, isToday, isTomorrow } from 'date-fns'
import { setDateColour } from '../../utils/setDateColour'

export const DatePicker = ({ chosenDate, setDate }) => {
  const [dueDateText, setDueDateText] = useState('Today')

  const handleChange = ({ target }) => {
    const date = target.value
    setDate(date)
    setDueDateText(() => {
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

  useEffect(() => {
    chosenDate === format(new Date(), 'yyyy-MM-dd')
      ? setDueDateText('Today')
      : !chosenDate && setDueDateText('Schedule')
  }, [chosenDate])

  return (
    <>
      <DatePickerToggle
        style={{ color: setDateColour(dueDateText, chosenDate) }}
      >
        <ScheduleIcon />
        <ToggleButton>{dueDateText}</ToggleButton>
        <DatePickerInput
          type='date'
          title='Pick a due date'
          value={chosenDate}
          onChange={handleChange}
          min={format(new Date(), 'yyyy-MM-dd')}
        />
      </DatePickerToggle>
    </>
  )
}
