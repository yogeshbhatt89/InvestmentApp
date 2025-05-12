import TextFieldComponent from '@/modules/TextField'
import { ButtonComponent } from '@/modules/Button'
import { useTextField } from '@/modules/TextField'
import { useState } from 'react'
import { useSnackbar } from '@/modules/Snackbar'
import { SnackbarComponent } from '@/modules/Snackbar'
import { Divider } from '@mui/material'
import { BackdropComponent } from '@/modules/Backdrop'
import { useBackdrop } from '@/modules/Backdrop'

const DemoComponent = () => {
  const { setTextFieldValue } = useTextField('demo-text-field')
  const { showBackdrop, hideBackdrop } = useBackdrop('demo-backdrop')
  const [counter, setCounter] = useState(0)
  const { showSnackbar } = useSnackbar()

  const handleButtonClick = () => {
    setCounter(counter + 1)
    setTextFieldValue(counter.toString())
  }

  const handleSnackbarButtonClick = () => {
    showSnackbar('This is an error message', 'error', 'top-center')
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Demo of MUI</h1>
      <SnackbarComponent />
      <div className="flex justify-center mb-4">
        <ButtonComponent
          label="Increment counter and update text field"
          reduxId="button"
          onClick={handleButtonClick}
        />

        <TextFieldComponent
          label="text field label"
          reduxId="demo-text-field"
          className="ml-30 bg-black"
        />
        <TextFieldComponent
          label="Error text field"
          reduxId="error"
          error
          helperText="This is an error message"
        />
      </div>
      <Divider sx={{ mb: 4 }} />
      <div className="flex justify-center mb-4">
        <ButtonComponent
          label="Show Snackbar"
          reduxId="snackbar-button"
          onClick={handleSnackbarButtonClick}
        />
      </div>
      <Divider sx={{ mb: 4 }} />
      <div className="flex justify-center mb-4">
        <div style={{ position: 'relative' }}>
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50 z-10">
            This is the region to be blocked
          </div>
          <BackdropComponent reduxId="demo-backdrop" />
        </div>
        <ButtonComponent label="Show Backdrop" reduxId="backdrop-button" onClick={showBackdrop} />
        <ButtonComponent
          label="Hide Backdrop"
          reduxId="backdrop-hide-button"
          onClick={hideBackdrop}
        />
      </div>
    </div>
  )
}

export default DemoComponent
