import {
  add,
  format,
  isBefore,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns'

export const setDateText = date => {
  if (isYesterday(new Date(date))) {
    return 'Yesterday'
  } else if (isBefore(new Date(date), new Date())) {
    return format(new Date(date), 'do MMM')
  } else if (isToday(new Date(date))) {
    return 'Today'
  } else if (isTomorrow(new Date(date))) {
    return 'Tomorrow'
  } else if (isBefore(new Date(date), add(new Date(), { days: 7 }))) {
    return format(new Date(date), 'EEEE')
  } else {
    return format(new Date(date), 'do MMM')
  }
}
