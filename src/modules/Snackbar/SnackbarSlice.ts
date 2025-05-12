import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SnackbarState {
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
  open: boolean
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
}

const initialState: SnackbarState = {
  message: '',
  severity: 'info',
  open: false,
  position: 'bottom-center',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      state.open = true
    },
    setSnackbarSeverity: (
      state,
      action: PayloadAction<'success' | 'error' | 'info' | 'warning'>,
    ) => {
      state.severity = action.payload
    },
    setSnackbarPosition: (
      state,
      action: PayloadAction<
        'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
      >,
    ) => {
      state.position = action.payload
    },
    closeSnackbar: state => {
      state.open = false
    },
  },
})

export const snackbarReducer = snackbarSlice.reducer
export const { setSnackbarMessage, setSnackbarSeverity, setSnackbarPosition, closeSnackbar } =
  snackbarSlice.actions
