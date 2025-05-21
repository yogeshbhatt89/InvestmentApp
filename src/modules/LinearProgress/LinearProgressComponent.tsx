// LinearProgressComponent.ts
import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useLinearProgress } from './useLinearProgress'

interface LinearProgressComponentProps extends LinearProgressProps {
  progressId: string
  labelVariant?: 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  labelColor?: 'text.primary' | 'text.secondary' | 'error' | 'info' | 'success' | 'warning'
  labelSx?: object
  progressSx?: object
  containerSx?: object
  className?: string
}

const LinearProgressComponent: React.FC<LinearProgressComponentProps> = ({
  progressId,
  labelVariant = 'body2',
  labelColor = 'text.secondary',
  labelSx = {},
  progressSx = {},
  containerSx = {},
  className,
  ...linearProgressProps
}) => {
  const {
    linearProgress: { progress },
  } = useLinearProgress(progressId)

  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', ...containerSx }}>
      <LinearProgress
        className={`h-3 ${className}`}
        variant="determinate"
        value={progress}
        sx={{ width: '100%', mr: 1, ...progressSx }}
        {...linearProgressProps}
      />
      <Typography
        variant={labelVariant}
        sx={{ color: labelColor, ml: 1, ...labelSx }}
      >{`${Math.round(progress)}%`}</Typography>
    </Box>
  )
}

export default LinearProgressComponent
