import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSnackbar } from './useSnackbar'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface SnackbarComponentProps {
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' }
  reduxId: string
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  reduxId,
  anchorOrigin,
  ...props
}) => {
  const { isOpen, message, severity, position, hide } = useSnackbar(reduxId)

  const fallbackVertical = position.includes('top') ? 'top' : 'bottom'
  const fallbackHorizontal = position.includes('left')
    ? 'left'
    : position.includes('right')
      ? 'right'
      : 'center'

  return (
    <Snackbar
      {...props}
      open={isOpen}
      autoHideDuration={3000}
      onClose={hide}
      anchorOrigin={anchorOrigin ?? { vertical: fallbackVertical, horizontal: fallbackHorizontal }}
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
