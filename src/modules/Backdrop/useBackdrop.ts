import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { showBackdrop, hideBackdrop, selectBackdropState } from './BackdropSlice'

export const useBackdrop = (backdropId: string) => {
  if (!backdropId) {
    throw new Error('useBackdrop hook requires a backdropId parameter')
  }

  const dispatch = useDispatch()

  const isOpen = useSelector((state: RootState) => selectBackdropState(state, backdropId))

  const show = () => {
    dispatch(showBackdrop({ backdropId }))
  }

  const hide = () => {
    dispatch(hideBackdrop({ backdropId }))
  }

  return {
    isOpen,
    show,
    hide,
  }
}

// Type for the hook return value
export type UseBackdropReturn = ReturnType<typeof useBackdrop>
