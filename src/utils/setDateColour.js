import { add, format, isBefore, parseISO } from 'date-fns'

export const setDateColour = (colour, date, darkTheme) => {
  if (darkTheme !== undefined) {
    const defaultColour = darkTheme ? 'hsla(0, 0%, 100%, 0.6)' : '#555'
    return isBefore(new Date(date), parseISO(format(new Date(), 'yyyy-MM-dd')))
      ? '#ff7066'
      : colour === 'Today'
      ? '#25b84c'
      : colour === 'Tomorrow'
      ? '#ff9a14'
      : isBefore(new Date(date), add(new Date(), { days: 7 }))
      ? '#a970ff'
      : defaultColour
  }
}
