import { useEffect } from 'react'

export const useScrollToBottom = (ref, dependency) => {
  useEffect(() => {
    const height = ref.current.lastElementChild.getBoundingClientRect().height
    ref.current.scrollTo({
      top: height,
      behavior: 'smooth',
    })
  }, [dependency])
}
