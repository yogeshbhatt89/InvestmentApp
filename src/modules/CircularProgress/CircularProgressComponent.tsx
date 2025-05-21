import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'
import { useCircularProgress } from './useCircularProgress'

interface CircularProgressComponentProps {
  message: string
}

const CircularProgressComponent: React.FC<CircularProgressComponentProps> = ({ message }) => {
  const { progress } = useCircularProgress()

  return (
    <Box position="relative" display="inline-flex" flexDirection="column" alignItems="center">
      <CircularProgress variant="determinate" value={progress.open ? 100 : 0} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {progress.open ? '100%' : '0%'}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  )
}

export default CircularProgressComponent
