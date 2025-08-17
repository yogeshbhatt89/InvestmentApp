const getLastWeekDate = () => {
  const today = new Date()
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  return lastWeek.toISOString().split('T')[0]
}

const getTodayDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

export { getLastWeekDate, getTodayDate }
