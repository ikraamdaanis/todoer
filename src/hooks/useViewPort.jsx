import { useState, useEffect } from 'react'

export const useViewPort = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const setViewPort = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', setViewPort)
    return () => window.removeEventListener('resize', setViewPort)
  }, [])
  return [windowWidth]
}
