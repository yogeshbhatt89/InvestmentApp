import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { closeSnackbar } from './SnackbarSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const { open, message, severity, position } = useSelector((state: RootState) => state.snackbar);

  const hideSnackbar = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={hideSnackbar}
      anchorOrigin={{
        vertical: position.includes('top') ? 'top' : 'bottom',
        horizontal: position.includes('left') ? 'left' : position.includes('right') ? 'right' : 'center',
      }}
    >
      <Alert onClose={hideSnackbar} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
