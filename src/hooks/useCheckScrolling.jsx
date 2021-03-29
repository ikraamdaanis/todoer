import { useEffect } from 'react'

export const useCheckScrolling = (element, action) => {
  useEffect(() => {
    const checkIfScrolling = () => {
      const height = element.current.scrollTop
      height === 0 ? action(false) : action(true)
    }
    const current = element.current
    current?.addEventListener('scroll', () => checkIfScrolling())
    return () => {
      current?.removeEventListener('scroll', () => checkIfScrolling())
    }
  }, [element, action])
}
