export const scrollToBottom = (container, dependency1, dependency2) => {
  const position = dependency2?.filter(task => !task.isComplete).length

  container.current.scrollTo({
    top: position * 37 - 200,
    behavior: 'smooth',
  })
}
