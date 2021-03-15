import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { ThemeContext } from '../../App'
import { DatePickerInput, DatePickerToggle, ToggleButton } from './DatePickerStyles'
import { ScheduleIcon } from '../../assets/'
import { setDateColour, setDateText } from '../../utils'

export const DatePicker = ({ chosenDate, setDate }) => {
  const [dueDateText, setDueDateText] = useState(chosenDate ? setDateText(chosenDate) : 'Today')

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

  const { darkTheme } = useContext(ThemeContext)

  return (
    <>
      <DatePickerToggle style={{ color: setDateColour(dueDateText, chosenDate, darkTheme) }}>
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

DatePicker.propTypes = {
  chosenDate: PropTypes.string,
  setDate: PropTypes.func,
}
