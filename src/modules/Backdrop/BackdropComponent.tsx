import React from 'react'
import { Backdrop } from '@mui/material'
import LinearProgressComponent from '@modules/LinearProgress'
import TypographyComponent from '@/modules/TypographyComponent'
import BoxComponent from '@/modules/BoxComponent'
import { useLinearProgress } from '@modules/LinearProgress'
import { useBackdrop } from './useBackdrop'
interface BackdropComponentProps {
  reduxId: string
  className?: string
  scoped?: boolean
}

const BackdropComponent: React.FC<BackdropComponentProps> = ({
  reduxId,
  className,
  scoped = false,
}) => {
  const { isOpen } = useBackdrop(reduxId)
  const { linearProgress } = useLinearProgress('global-progress')

  return (
    <Backdrop
      className={className}
      open={isOpen}
      style={{
        zIndex: 1,
        position: scoped ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <BoxComponent className="w-1/4 h-1/4 bg-white rounded-lg p-4 flex flex-col items-center justify-center">
        <LinearProgressComponent />
        <TypographyComponent variant="body1" className="text-lg font-bold mt-4 text-gray-600">
          {linearProgress.message}
        </TypographyComponent>
      </BoxComponent>
    </Backdrop>
  )
}

export default BackdropComponent
