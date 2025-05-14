import { useDispatch } from 'react-redux'
import {
  setSnackbarMessage,
  setSnackbarSeverity,
  setSnackbarPosition,
  closeSnackbar,
} from './SnackbarSlice'

export const useSnackbar = () => {
  const dispatch = useDispatch()

  const showSnackbar = (
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
    dispatch(setSnackbarSeverity(severity))
    dispatch(setSnackbarMessage(message))
    dispatch(setSnackbarPosition(position))
  }

  const hideSnackbar = () => {
    dispatch(closeSnackbar())
  }

  return {
    showSnackbar,
    hideSnackbar,
  }
}
