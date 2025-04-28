/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface SnackbarState {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  open: boolean;
}

// Initial state
const initialState: SnackbarState = {
  message: '',
  severity: 'info',
  open: false,
};

// Slice definition
const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.open = true;
    },
    setSnackbarSeverity: (
      state,
      action: PayloadAction<'success' | 'error' | 'info' | 'warning'>
    ) => {
      state.severity = action.payload;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

// Export the reducer for use in the store
export const snackbarReducer = snackbarSlice.reducer;

// Export actions for use in the hook
export const {
  setSnackbarMessage,
  setSnackbarSeverity,
  closeSnackbar,
} = snackbarSlice.actions;

// Snackbar UI Component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  const hideSnackbar = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={hideSnackbar}>
      <Alert onClose={hideSnackbar} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

// Custom hook to use the snackbar
export const useSnackbar = () => {
  const dispatch = useDispatch();

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    dispatch(setSnackbarSeverity(severity));
    dispatch(setSnackbarMessage(message));
  };

  const hideSnackbar = () => {
    dispatch(closeSnackbar());
  };

  return {
    showSnackbar,
    hideSnackbar,
  };
};

export default SnackbarComponent;
