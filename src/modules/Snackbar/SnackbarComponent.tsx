import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSnackbar } from './useSnackbar'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface SnackbarComponentProps {
  reduxId: string
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ reduxId }) => {
  const { isOpen, message, severity, position, hide } = useSnackbar(reduxId)

  // Calculate vertical and horizontal positions
  const vertical = position.includes('top') ? 'top' : 'bottom'
  const horizontal = position.includes('left')
    ? 'left'
    : position.includes('right')
      ? 'right'
      : 'center'

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={hide}
      anchorOrigin={{ vertical, horizontal }}
      key={reduxId}
      sx={{
        position: 'fixed',
        [`& + .MuiSnackbar-root`]: {
          marginTop: '10px',
        },
      }}
    >
      <Alert onClose={hide} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
