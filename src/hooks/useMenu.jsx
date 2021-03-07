import { useEffect } from 'react'

export const useMenu = (element1, element2, isOpen) => {
  useEffect(() => {
    const toggleFocus = ({ target }) => {
      if (element2?.current?.contains(target)) return
      !element1?.current?.contains(target) && isOpen(false)
    }
    document.body.addEventListener('click', toggleFocus)
    return () => {
      document.body.removeEventListener('click', toggleFocus)
    }
  }, [element1, element2, isOpen])
}
