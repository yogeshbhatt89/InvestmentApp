import ButtonComponent from '@/modules/Button'
import { useSnackbar } from '@/modules/Snackbar'

const DemoSnackbarComponent = () => {
  const errorSnackbar = useSnackbar('error-snackbar')
  const successSnackbar = useSnackbar('success-snackbar')
  const infoSnackbar = useSnackbar('info-snackbar')

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-600 mb-4">
        Click the buttons below to trigger different types of notifications
      </p>
      <div className="flex gap-4">
        <ButtonComponent
          label="Show Error Snackbar"
          reduxId="snackbar-error"
          onClick={() => errorSnackbar.show('This is an error message', 'error', 'top-right')}
          variant="contained"
          color="error"
        />
        <ButtonComponent
          label="Show Success Snackbar"
          reduxId="snackbar-success"
          onClick={() => successSnackbar.show('Operation successful!', 'success', 'top-right')}
          variant="contained"
          color="primary"
        />
        <ButtonComponent
          label="Show Info Snackbar"
          reduxId="snackbar-info"
          onClick={() => infoSnackbar.show('Here is some information', 'info', 'top-right')}
          variant="contained"
          color="secondary"
        />
      </div>
    </div>
  )
}

export default DemoSnackbarComponent
