import { useEffect } from 'react'
import { useRegisterMutation } from '../api'
import { useSnackbar } from '@/modules/Snackbar'
import { useBackdrop } from '@/modules/Backdrop/useBackdrop'
import { useLinearProgress } from '@/modules/LinearProgress'

interface RegisterError {
  data?: { message: string }
  status?: number
}

export const useRegister = () => {
  const snackbar = useSnackbar('global-snackbar')
  const backdrop = useBackdrop('global-backdrop')
  const { setProgress } = useLinearProgress('global-progress')
  const [registerMutation, { isLoading, isError, error, isSuccess }] = useRegisterMutation()

  const register = (userData: {
    username: string
    email: string
    password: string
    fullName: string
  }) => {
    setProgress('Preparing registration...')
    backdrop.show()
    registerMutation(userData).unwrap()
  }

  useEffect(() => {
    if (isLoading) {
      setProgress('Registering user...')
    }
    if (isError) {
      setProgress('Registration failed!')
      const errorMessage = (error as RegisterError)?.data?.message || 'Something went wrong!'
      snackbar.show(errorMessage, 'error')
      backdrop.hide()
    } else if (isSuccess) {
      setProgress('Registration successful!')
      setTimeout(() => {
        backdrop.hide()
      }, 800)
    }
  }, [isLoading, isError, error, isSuccess])

  return {
    register,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
