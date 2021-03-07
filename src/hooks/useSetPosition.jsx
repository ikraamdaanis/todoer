import { useState, useEffect } from 'react'

export const useSetPosition = (buttonRef, isClosed) => {
  const [position, setPosition] = useState(0)
  const buttonPosition = buttonRef?.current?.getBoundingClientRect().right

  const positionMenu = () => {
    if (buttonPosition + 125 < window.innerWidth) {
      setPosition(buttonPosition - 150)
    } else {
      setPosition(window.innerWidth - 250)
    }
  }

  useEffect(() => {
    positionMenu()

    window.addEventListener('resize', positionMenu)
  }, [buttonPosition, isClosed])

  return [position]
}
