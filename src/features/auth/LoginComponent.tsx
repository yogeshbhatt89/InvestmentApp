import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/services/auth/useLogin'
import TextFieldComponent, { useTextField } from '@/modules/TextField'
import ButtonComponent from '@/modules/Button'
import BoxComponent from '@/modules/BoxComponent'
import FormControlWrapper from '@/modules/FormControlWrapper'
import useDialog from '@/modules/Dialog/useDialog'
import RegisterComponent from './RegisterComponent';
const LoginComponent = () => {
  const navigate = useNavigate()
  const { login, isLoading, isSuccess } = useLogin()
  const { openDialog } = useDialog();

  const {
    getTextFieldValue: email,
    isEmpty: isEmailEmpty,
    clearValue: clearEmail,
  } = useTextField('email')

  const {
    getTextFieldValue: password,
    isEmpty: isPasswordEmpty,
    clearValue: clearPassword,
  } = useTextField('password')

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
  }

  const handleRegisterClick = () => {
    openDialog('', <RegisterComponent />);
  }

  useEffect(() => {
    if (isSuccess) {
      clearEmail()
      clearPassword()
      navigate('/home')
    }
  }, [isSuccess,])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <BoxComponent component="form" onSubmit={handleLoginSubmit} noValidate>
          <FormControlWrapper>
            <TextFieldComponent label="Email" reduxId="email" type="email" />
          </FormControlWrapper>
          <FormControlWrapper>
            <TextFieldComponent label="Password" reduxId="password" type="password" />
          </FormControlWrapper>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <ButtonComponent
              reduxId="login"
              label="Login"
              disabled={isLoading || isEmailEmpty || isPasswordEmpty}
              type="submit"
            />
            <ButtonComponent
              reduxId="goToRegister"
              label="Go to Register"
              onClick={handleRegisterClick}
              variant="outlined"
            />
          </div>
        </BoxComponent>
      </div>
    </div>
  )
}

export default LoginComponent
