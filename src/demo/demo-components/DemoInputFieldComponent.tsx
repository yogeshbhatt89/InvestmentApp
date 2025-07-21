import React from 'react'
import TextFieldComponent, { useTextField } from '@/modules/TextField'
import ButtonComponent from '@/modules/Button'

const DemoTextFieldComponent = () => {
  const { setTextFieldValue } = useTextField('demo-text-field')
  const emailField = useTextField('email-field')
  const [counter, setCounter] = React.useState(0)

  const handleButtonClick = () => {
    setCounter(counter + 1)
    setTextFieldValue(counter.toString())
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  const emailValue = emailField.getTextFieldValue
  const hasEmailError = emailValue.length > 0 && !isValidEmail(emailValue)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <ButtonComponent
          label="Increment counter"
          reduxId="button"
          onClick={handleButtonClick}
          size="medium"
        />
        <TextFieldComponent
          label="Auto-expanding Textarea"
          reduxId="multiline-field"
          multiline
          minRows={2}
          maxRows={6}
          placeholder="Type here, I will grow with your content..."
          className="w-[300px] [&_.MuiInputBase-root]:h-auto [&_.MuiInputBase-root_textarea]:overflow-auto [&_.MuiInputBase-root_textarea]:resize-none"
        />
        <TextFieldComponent
          label="Disabled Field"
          reduxId="demo-text-field"
          disabled
          className="[&_.MuiInputBase-root.Mui-disabled]:bg-gray-100 [&_.MuiInputBase-root.Mui-disabled_.MuiOutlinedInput-notchedOutline]:border-gray-300 [&_.MuiFormHelperText-root.Mui-disabled]:text-gray-500"
        />
        <TextFieldComponent
          label="Email"
          reduxId="email-field"
          type="email"
          error={hasEmailError}
          helperText={hasEmailError ? 'Please enter a valid email address' : ''}
          placeholder="example@email.com"
          className="[&_.Mui-error]:text-red-600 [&_.MuiOutlinedInput-root.Mui-error_.MuiOutlinedInput-notchedOutline]:border-red-600"
        />
      </div>
    </div>
  )
}

export default DemoTextFieldComponent
