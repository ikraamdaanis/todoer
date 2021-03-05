import { useEffect } from 'react'

export const useFocus = input => {
  useEffect(() => {
    input?.current?.focus()
  }, [input])
}
