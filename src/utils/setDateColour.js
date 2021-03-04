import { add, isBefore } from 'date-fns'

export const setDateColour = (colour, date) =>
  colour === 'Today'
    ? '#25b84c'
    : colour === 'Tomorrow'
    ? '#ff9a14'
    : isBefore(new Date(date), add(new Date(), { days: 7 }))
    ? '#a970ff'
    : 'hsla(0, 0%, 100%, 0.6)'
