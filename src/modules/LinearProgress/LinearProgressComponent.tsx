import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

interface LinearProgressComponentProps extends Omit<LinearProgressProps, 'variant' | 'value'> {
  containerSx?: object
  className?: string
}

const LinearProgressComponent: React.FC<LinearProgressComponentProps> = ({
  containerSx = {},
  className,
  ...linearProgressProps
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        minHeight: '30px',
        ...containerSx,
      }}
    >
      <LinearProgress
        className={className}
        variant="indeterminate"
        sx={{ width: '100%', height: '6px' }}
        {...linearProgressProps}
      />
    </Box>
  )
}

export default LinearProgressComponent
