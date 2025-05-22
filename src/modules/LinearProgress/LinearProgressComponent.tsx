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
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', ...containerSx }}>
      <LinearProgress
        className={`h-3 ${className}`}
        variant="indeterminate"
        sx={{ width: '100%', mr: 1 }}
        {...linearProgressProps}
      />
    </Box>
  )
}

export default LinearProgressComponent
