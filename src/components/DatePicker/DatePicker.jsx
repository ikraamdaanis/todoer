import { useState, useEffect } from 'react'
import {
  DatePickerInput,
  DatePickerToggle,
  ToggleButton,
} from './DatePickerStyles'
import { ReactComponent as ScheduleIcon } from '../../assets/images/schedule-icon.svg'
import { setDateColour } from '../../utils/setDateColour'
import { setDateText } from '../../utils/setDateText'

export const DatePicker = ({ chosenDate, setDate }) => {
  const [dueDateText, setDueDateText] = useState('Today')

  const handleChange = ({ target }) => {
    const date = target.value
    setDate(date)
    setDueDateText(() => setDateText(date))
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
