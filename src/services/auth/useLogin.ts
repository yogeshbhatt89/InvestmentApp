import { useEffect, useState } from 'react'
import { useLoginMutation } from '../api'
import { useSnackbar } from '../../modules/Snackbar/SnackbarComponent'

interface LoginError {
  data?: { message: string }
  status?: number
}

interface TokenResponse {
  accessToken: string
  refreshToken: string
}

export const useLogin = () => {
  const { showSnackbar } = useSnackbar()
  const [loginMutation, { isLoading, isError, error, isSuccess }] = useLoginMutation()
  const [backdropOpen, setBackdropOpen] = useState(false)

  const login = async (userData: { email: string; password: string }) => {
    try {
      setBackdropOpen(true)
      const response = await loginMutation(userData).unwrap()

      const { accessToken, refreshToken } = response as TokenResponse
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    } catch (err) {
      const errorResponse = err as LoginError
      const errorMessage = errorResponse?.data?.message || 'Login failed due to server error!'
      showSnackbar(errorMessage, 'error')
    } finally {
      setBackdropOpen(false)
    }
  }

  useEffect(() => {
    if (isLoading) {
      showSnackbar('Login in progress...', 'info')
    } else if (isError) {
      const errorMessage = (error as LoginError)?.data?.message || 'Something went wrong!'
      showSnackbar(errorMessage, 'error')
    } else if (isSuccess) {
      showSnackbar('Login successful!', 'success')
    }
  }, [isLoading, isError, error, isSuccess, showSnackbar])

  return {
    login,
    isLoading,
    isError,
    isSuccess,
    error,
    backdropOpen,
  }
}
