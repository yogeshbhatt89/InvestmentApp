import React from 'react'
import { Backdrop, CircularProgress, BackdropProps } from '@mui/material'
import { useBackdrop } from './useBackdrop'

interface BackdropComponentProps extends Omit<BackdropProps, 'open' | 'children'> {
  reduxId: string
  className?: string
  scoped?: boolean
}

const BackdropComponent: React.FC<BackdropComponentProps> = ({
  reduxId,
  className,
  scoped = false,
  ...muiProps
}) => {
  const { isOpen } = useBackdrop(reduxId)

  return (
    <Backdrop
      {...muiProps}
      className={className}
      open={isOpen}
      sx={{
        color: '#fff',
        zIndex: theme => theme.zIndex.drawer + 1,
        position: scoped ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...muiProps.sx,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default BackdropComponent
