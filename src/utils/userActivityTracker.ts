let lastActivityTimestamp = Date.now()

// Function to update the last activity timestamp
export const updateLastActivity = () => {
  lastActivityTimestamp = Date.now()
}

// Function to check if the user is inactive for a given threshold (in milliseconds)
export const isUserInactive = (threshold: number): boolean => {
  return Date.now() - lastActivityTimestamp > threshold
}

// Initialize global event listeners
export const initializeUserActivityListeners = () => {
  const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
  events.forEach(event => {
    window.addEventListener(event, updateLastActivity)
  })
}
