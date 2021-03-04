import { useEffect } from 'react'

export const useScrollToBottom = (
  ref,
  dependency1,
  dependency2,
  dependency3
) => {
  useEffect(() => {
    const height = ref.current.lastElementChild.getBoundingClientRect().height
    dependency2?.length > dependency3?.length &&
      ref.current.scrollTo({
        top: height,
        behavior: 'smooth',
      })
  }, [dependency1, dependency2, dependency3])
}
