export const scrollToBottom = (container, dependency) => {
  const position = dependency?.filter(task => !task.isComplete).length

  console.log(position * 37 - 200)

  container.current.scrollTo({
    top: position * 37 - 200,
    behavior: 'smooth',
  })
}
