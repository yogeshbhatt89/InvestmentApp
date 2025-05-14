/* cspell:disable */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

interface SnackbarState {
  [snackbarId: string]: {
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
}

const initialState: SnackbarState = {}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        snackbarId: string
        message: string
        severity: 'success' | 'error' | 'info' | 'warning'
        position:
          | 'top-left'
          | 'top-center'
          | 'top-right'
          | 'bottom-left'
          | 'bottom-center'
          | 'bottom-right'
      }>,
    ) => {
      const { snackbarId, message, severity, position } = action.payload
      state[snackbarId] = {
        message,
        severity,
        position,
        open: true,
      }
    },
    closeSnackbar: (state, action: PayloadAction<{ snackbarId: string }>) => {
      const { snackbarId } = action.payload
      if (state[snackbarId]) {
        state[snackbarId].open = false
      }
    },
  },
})

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions

// Base selector
const selectSnackbars = (state: RootState) => state.snackbar

// Default snackbar state
const defaultSnackbarState = {
  message: '',
  severity: 'info' as const,
  position: 'bottom-center' as const,
  open: false,
}

// Memoized selector
export const selectSnackbarState = createSelector(
  [selectSnackbars, (_state: RootState, snackbarId: string) => snackbarId],
  (snackbars, snackbarId) => snackbars[snackbarId] || defaultSnackbarState,
)

export const snackbarReducer = snackbarSlice.reducer
