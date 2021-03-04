import { useEffect } from 'react'

export const useCheckScrolling = (element, action) => {
  useEffect(() => {
    const checkIfScrolling = () => {
      const height = element.current.scrollTop
      height === 0 ? action(false) : action(true)
    }
    element.current?.addEventListener('scroll', () => checkIfScrolling())
    return () => {
      element.current?.removeEventListener('scroll', () => checkIfScrolling())
    }
  }, [])
}
