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
  const emailField = useTextField('email-field')
  const backdrop = useBackdrop('demo-backdrop')
  const [counter, setCounter] = useState(0)
  const { showSnackbar } = useSnackbar()
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)

  const handleButtonClick = () => {
    setCounter(counter + 1)
    setTextFieldValue(counter.toString())
  }

  const handleSnackbarButtonClick = () => {
    if (isSnackbarVisible) {
      setIsSnackbarVisible(false)
    } else {
      showSnackbar('This is an error message', 'error', 'top-center')
      setIsSnackbarVisible(true)
      setTimeout(() => {
        setIsSnackbarVisible(false)
      }, 3000)
    }
  }

  // Simple email validation to show error state
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const emailValue = emailField.getTextFieldValue
  const hasEmailError = emailValue.length > 0 && !isValidEmail(emailValue)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Demo of MUI</h1>
      <SnackbarComponent />

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <ButtonComponent
          label="Increment counter"
          reduxId="button"
          onClick={handleButtonClick}
          size="medium"
        />
        {/* Multiline TextField example */}
        <TextFieldComponent
          label="Auto-expanding Textarea"
          reduxId="multiline-field"
          multiline
          minRows={2}
          maxRows={6}
          placeholder="Type here, I will grow with your content..."
          className="w-[300px] [&_.MuiInputBase-root]:h-auto [&_.MuiInputBase-root_textarea]:overflow-auto [&_.MuiInputBase-root_textarea]:resize-none"
          rows="auto"
        />
        <TextFieldComponent
          label="Disabled Field"
          reduxId="demo-text-field"
          disabled
          className="[&_.MuiInputBase-root.Mui-disabled]:bg-gray-100 [&_.MuiInputBase-root.Mui-disabled_.MuiOutlinedInput-notchedOutline]:border-gray-300 [&_.MuiFormHelperText-root.Mui-disabled]:text-gray-500"
        />
        <TextFieldComponent label="Custom Width" reduxId="custom-width" className="w-[200px]" />
        <TextFieldComponent label="Full Width" reduxId="full-width" fullWidth size="medium" />
        <TextFieldComponent
          label="Custom Styles"
          reduxId="custom-styles"
          className="min-w-[250px] [&_.MuiOutlinedInput-root]:bg-sky-50"
        />
        <TextFieldComponent
          label="Email"
          reduxId="email-field"
          type="email"
          error={hasEmailError}
          helperText={hasEmailError ? 'Please enter a valid email address' : ''}
          placeholder="example@email.com"
          className="[&_.Mui-error]:text-red-600 [&_.MuiOutlinedInput-root.Mui-error_.MuiOutlinedInput-notchedOutline]:border-red-600 [&_.MuiOutlinedInput-root.Mui-error:hover_.MuiOutlinedInput-notchedOutline]:border-red-600"
        />
      </div>

      <Divider sx={{ mb: 4 }} />

      <div className="flex justify-center mb-8">
        <ButtonComponent
          label={isSnackbarVisible ? 'Hide Snackbar' : 'Show Snackbar'}
          reduxId="snackbar-button"
          onClick={handleSnackbarButtonClick}
          variant="contained"
          color="primary"
        />
      </div>

      <Divider sx={{ mb: 4 }} />

      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <div className="relative w-64 h-64 border border-gray-300 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-white p-4 text-center">
            Content to be blocked
          </div>
          <BackdropComponent
            reduxId="demo-backdrop"
            className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center"
          />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonComponent
            label="Show Backdrop"
            reduxId="backdrop-button"
            onClick={backdrop.show}
            variant="contained"
            color="primary"
          />
          <ButtonComponent
            label="Hide Backdrop"
            reduxId="backdrop-hide-button"
            onClick={backdrop.hide}
            variant="contained"
            color="secondary"
          />
        </div>
      </div>
    </div>
  )
}

export default DemoComponent
