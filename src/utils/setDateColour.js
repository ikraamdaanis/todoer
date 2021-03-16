import { add, format, isBefore, parseISO } from 'date-fns'

export const setDateColour = (colour, date, darkTheme) => {
  if (darkTheme !== undefined) {
    const overdue = darkTheme ? '#ff7066' : '#d1453b'
    const today = darkTheme ? '#25b84c' : '#058527'
    const tomorrow = darkTheme ? '#ff9a14' : '#ad6200'
    const thisWeek = darkTheme ? '#a970ff' : '#692fc2'
    const defaultColour = darkTheme ? 'hsla(0, 0%, 100%, 0.6)' : '#555'
    return isBefore(new Date(date), parseISO(format(new Date(), 'yyyy-MM-dd')))
      ? overdue
      : colour === 'Today'
      ? today
      : colour === 'Tomorrow'
      ? tomorrow
      : isBefore(new Date(date), add(new Date(), { days: 7 }))
      ? thisWeek
      : defaultColour
  }
}
