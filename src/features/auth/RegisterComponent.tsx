import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '@/services/auth/useRegister'
import { useLogin } from '@/services/auth/useLogin'
import TextFieldComponent, { useTextField } from '@/modules/TextField'
import ButtonComponent from '@/modules/Button'
import BoxComponent from '@/modules/BoxComponent'
import FormControlWrapper from '@/modules/FormControlWrapper'
import useDialog from '@/modules/Dialog/useDialog'
import LoginComponent from './LoginComponent'
const RegisterComponent = () => {
  const { register, isLoading: isRegistering, isSuccess: isRegisterSuccess } = useRegister()
  const { login, isSuccess: isLoginSuccess } = useLogin()
  const navigate = useNavigate()
  const { openDialog } = useDialog()

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    fullName: false,
  })
  const [pendingLogin, setPendingLogin] = useState<{ email: string; password: string } | null>(null)

  const {
    getTextFieldValue: username,
    isEmpty: isUsernameEmpty,
    clearValue: clearUsername,
  } = useTextField('username')

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

  const {
    getTextFieldValue: fullName,
    isEmpty: isFullNameEmpty,
    clearValue: clearFullName,
  } = useTextField('fullName')

  useEffect(() => {
    if (!email) {
      setErrors(prev => ({ ...prev, email: '' }))
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
    } else {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }, [email])

  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      username: !username ? 'Username is required' : '',
    }))
  }, [username])

  useEffect(() => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: '' }))
    } else if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }))
    } else {
      setErrors(prev => ({ ...prev, password: '' }))
    }
  }, [password])

  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      fullName: !fullName ? 'Full Name is required' : '',
    }))
  }, [fullName])

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Final check before submit
    const hasError = Object.values(errors).some(Boolean)
    if (hasError || isUsernameEmpty || isEmailEmpty || isPasswordEmpty || isFullNameEmpty) return
    await register({ username, email, password, fullName })
    setPendingLogin({ email, password }) // Save credentials for auto-login
  }

  useEffect(() => {
    // After registration success, trigger login
    if (isRegisterSuccess && pendingLogin) {
      login(pendingLogin)
    }
    // eslint-disable-next-line
  }, [isRegisterSuccess, pendingLogin])

  useEffect(() => {
    // After login success, clear fields and navigate to home
    if (isLoginSuccess) {
      clearUsername()
      clearEmail()
      clearPassword()
      clearFullName()
      navigate('/home')
    }
    // eslint-disable-next-line
  }, [isLoginSuccess])

  const usernameError = !username ? 'Username is required' : ''
  const emailError = !email
    ? 'Email is required'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Please enter a valid email address'
      : ''
  const passwordError = !password
    ? 'Password is required'
    : password.length < 6
      ? 'Password must be at least 6 characters'
      : ''
  const fullNameError = !fullName ? 'Full Name is required' : ''

  const hasAnyError = !!usernameError || !!emailError || !!passwordError || !!fullNameError

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <BoxComponent component="form" onSubmit={handleRegisterSubmit} noValidate>
          <FormControlWrapper>
            <TextFieldComponent
              label="Username"
              reduxId="username"
              type="text"
              onBlur={() => setTouched(t => ({ ...t, username: true }))}
              error={touched.username && !!usernameError}
              helperText={touched.username ? usernameError : ''}
            />
          </FormControlWrapper>
          <FormControlWrapper>
            <TextFieldComponent
              label="Email"
              reduxId="email"
              type="email"
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              error={touched.email && !!emailError}
              helperText={touched.email ? emailError : ''}
              placeholder="example@email.com"
              className="[&_.Mui-error]:text-red-600 [&_.MuiOutlinedInput-root.Mui-error_.MuiOutlinedInput-notchedOutline]:border-red-600"
            />
          </FormControlWrapper>
          <FormControlWrapper>
            <TextFieldComponent
              label="Password"
              reduxId="password"
              type="password"
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              error={touched.password && !!passwordError}
              helperText={touched.password ? passwordError : ''}
            />
          </FormControlWrapper>
          <FormControlWrapper>
            <TextFieldComponent
              label="Full Name"
              reduxId="fullName"
              type="text"
              onBlur={() => setTouched(t => ({ ...t, fullName: true }))}
              error={touched.fullName && !!fullNameError}
              helperText={touched.fullName ? fullNameError : ''}
            />
          </FormControlWrapper>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <ButtonComponent
              reduxId="register"
              label="Register"
              type="submit"
              disabled={
                isRegistering ||
                isUsernameEmpty ||
                isEmailEmpty ||
                isPasswordEmpty ||
                isFullNameEmpty ||
                hasAnyError
              }
            />
            <ButtonComponent
              reduxId="goToLogin"
              label="Go to Login"
              type="button"
              onClick={() => openDialog('', <LoginComponent />)}
              variant="outlined"
            />
          </div>
        </BoxComponent>
      </div>
    </div>
  )
}

export default RegisterComponent
