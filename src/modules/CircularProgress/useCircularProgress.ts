import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { setBackdropProgress, resetBackdrop } from './CircularProgressSlice'

export const useCircularProgress = () => {
  const dispatch = useDispatch()
  const progress = useSelector((state: RootState) => state.backdrop.progress)
  const message = useSelector((state: RootState) => state.backdrop.message)

  const setProgress = (progress: number, message: string) => {
    dispatch(setBackdropProgress({ progress, message }))
  }

  const resetProgress = () => {
    dispatch(resetBackdrop())
  }

  return {
    progress,
    message,
    setProgress,
    resetProgress,
  }
}
