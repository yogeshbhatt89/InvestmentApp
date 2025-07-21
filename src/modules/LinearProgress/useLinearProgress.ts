import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { setLinearProgress, selectLinearProgressState } from './LinearProgressSlice'

export const useLinearProgress = (progressId: string) => {
  if (!progressId) {
    throw new Error('useLinearProgress hook requires a progressId parameter')
  }

  const dispatch = useDispatch()

  const linearProgress = useSelector((state: RootState) =>
    selectLinearProgressState(state, progressId),
  )

  // Memoize the linearProgress value, providing a default with an empty message if none exists.
  const memoizedLinearProgress = useMemo(() => {
    return linearProgress || { message: '' }
  }, [linearProgress])

  // Updated setProgress now accepts only a message.
  const setProgress = (message: string) => {
    dispatch(setLinearProgress({ progressId, message }))
  }

  return {
    linearProgress: memoizedLinearProgress,
    setProgress,
  }
}

// Type for the hook return value
export type UseLinearProgressReturn = ReturnType<typeof useLinearProgress>
