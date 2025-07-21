import { useDispatch, useSelector } from 'react-redux'
import { showSnackbar, closeSnackbar, selectSnackbarState } from './SnackbarSlice'
import { RootState } from '@/app/store'

export const useSnackbar = (snackbarId: string) => {
  if (!snackbarId) {
    throw new Error('useSnackbar hook requires a snackbarId parameter')
  }

  const dispatch = useDispatch()
  const snackbarState = useSelector((state: RootState) => selectSnackbarState(state, snackbarId))

  const show = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning' = 'info',
    position:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right' = 'bottom-center',
  ) => {
    dispatch(showSnackbar({ snackbarId, message, severity, position }))
  }

  const hide = () => {
    dispatch(closeSnackbar({ snackbarId }))
  }

  return {
    show,
    hide,
    isOpen: snackbarState.open,
    message: snackbarState.message,
    severity: snackbarState.severity,
    position: snackbarState.position,
  }
}
