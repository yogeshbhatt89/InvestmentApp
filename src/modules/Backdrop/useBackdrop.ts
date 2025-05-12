import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { showUi, hideUi } from './BackdropSlice'

export const useBackdrop = (backdropId: string) => {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.backdrop[backdropId]?.open ?? false)

  const showBackdrop = () => dispatch(showUi({ backdropId }))
  const hideBackdrop = () => dispatch(hideUi({ backdropId }))

  return { open, showBackdrop, hideBackdrop }
}
