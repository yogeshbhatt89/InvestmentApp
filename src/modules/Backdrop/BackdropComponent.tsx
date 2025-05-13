import React from 'react'
import { Backdrop, CircularProgress, BackdropProps } from '@mui/material'
import { useBackdrop } from './useBackdrop'

type OmittedProps = 'open' | 'children'

interface BackdropComponentProps extends Omit<BackdropProps, OmittedProps> {
  reduxId: string
  className?: string
}

const BackdropComponent: React.FC<BackdropComponentProps> = ({
  reduxId,
  className,
  ...muiProps
}) => {
  const { isOpen } = useBackdrop(reduxId)

  return (
    <Backdrop
      {...muiProps}
      className={className}
      sx={{
        color: '#fff',
        zIndex: theme => theme.zIndex.drawer + 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...muiProps.sx,
      }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default BackdropComponent
