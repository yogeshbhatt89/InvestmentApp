import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../services/auth/useLogin'
import TextFieldComponent, { useTextField } from '../../modules/TextFieldComponent'
import ButtonComponent from '../../modules/ButtonComponent'
import BackdropComponent from '../../modules/BackdropComponent'

const LoginComponent = () => {
  const navigate = useNavigate()
  const { login, isLoading, backdropOpen, isSuccess } = useLogin()

  const { value: email, handleChange: handleEmailChange } = useTextField('email')
  const { value: password, handleChange: handlePasswordChange } = useTextField('password')

  const handleLoginClick = async () => {
    await login({ email, password })
  }

  const handleRegisterClick = () => {
    navigate('/register')
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/home')
    }
  }, [isSuccess, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <TextFieldComponent label="Email" name="email" value={email} onChange={handleEmailChange} />

        <TextFieldComponent
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <ButtonComponent label="Login" onClick={handleLoginClick} disabled={isLoading} />
          <ButtonComponent
            label="Go to Register"
            onClick={handleRegisterClick}
            variant="outlined"
          />
        </div>

        <BackdropComponent open={backdropOpen} />
      </div>
    </div>
  )
}

export default LoginComponent
