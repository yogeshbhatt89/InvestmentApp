import { Outlet } from 'react-router-dom'
import BackdropComponent from '@/modules/Backdrop'
import SnackbarComponent from '@/modules/Snackbar'

const App = () => {
  return (
    <>
      <Outlet />
      <BackdropComponent reduxId="global-backdrop" />
      <SnackbarComponent reduxId="global-snackbar" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
    </>
  )
}

export default App
