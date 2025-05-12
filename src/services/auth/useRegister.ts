import { useEffect, useState } from 'react'
import { useRegisterMutation } from '../api'
import { useSnackbar } from '../../modules/Snackbar/SnackbarComponent'

interface RegisterError {
  data?: { message: string }
  status?: number
}

export const useRegister = () => {
  const { showSnackbar } = useSnackbar()
  const [registerMutation, { isLoading, isError, error, isSuccess }] = useRegisterMutation()
  const [backdropOpen, setBackdropOpen] = useState(false)

  const register = async (userData: {
    username: string
    email: string
    password: string
    fullName: string
  }) => {
    try {
      setBackdropOpen(true)
      await registerMutation(userData).unwrap()
    } catch (err) {
      const errorResponse = err as RegisterError
      const errorMessage =
        errorResponse?.data?.message || 'Registration failed due to server error!'
      showSnackbar(errorMessage, 'error')
    } finally {
      setBackdropOpen(false) // Hide backdrop when done
    }
  }

  useEffect(() => {
    if (isLoading) {
      showSnackbar('Registration in progress...', 'info')
    } else if (isError) {
      const errorMessage = (error as RegisterError)?.data?.message || 'Something went wrong!'
      showSnackbar(errorMessage, 'error')
    } else if (isSuccess) {
      showSnackbar('Registration successful!', 'success')
    }
  }, [isLoading, isError, error, isSuccess, showSnackbar])

  return {
    register,
    isLoading,
    isError,
    isSuccess,
    error,
    backdropOpen,
  }
}
