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

  const memoizedLinearProgress = useMemo(() => {
    return linearProgress || { progress: 0, message: '' }
  }, [linearProgress])

  const setProgress = (progress: number, message: string) => {
    dispatch(setLinearProgress({ progressId, progress, message }))
  }

  return {
    linearProgress: memoizedLinearProgress,
    setProgress,
  }
}

// Type for the hook return value
export type UseLinearProgressReturn = ReturnType<typeof useLinearProgress>
