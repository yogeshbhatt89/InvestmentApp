import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useBackdrop } from './useBackdrop'

interface BackdropComponentProps {
  reduxId: string
}

const BackdropComponent = ({ reduxId }: BackdropComponentProps) => {
  const { open } = useBackdrop(reduxId)
  console.log('BackdropComponent open:', open)
  return (
    <Backdrop
      component="div"
      sx={theme => ({
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
export default BackdropComponent
