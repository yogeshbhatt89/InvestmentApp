import { useEffect } from 'react'
import { useLoginMutation } from '../api'
import { useSnackbar } from '@/modules/Snackbar'
import { useBackdrop } from '@/modules/Backdrop/useBackdrop'
import { useLinearProgress } from '@/modules/LinearProgress'

interface LoginError {
  data?: { message: string }
  status?: number
}

export const useLogin = () => {
  const snackbar = useSnackbar('global-snackbar')
  const backdrop = useBackdrop('global-backdrop')
  const { setProgress } = useLinearProgress('global-progress')
  const [loginMutation, { isLoading, isError, error, isSuccess, data }] = useLoginMutation()

  const login = (userData: { email: string; password: string }) => {
    // Start the global progress and show the backdrop.
    setProgress('Preparing login...')
    backdrop.show()
    // Perform the API call.
    loginMutation(userData).unwrap()
  }

  useEffect(() => {
    if (isLoading) {
      setProgress('Logging in...')
    }
    if (isError) {
      setProgress('Login failed!')
      const errorMessage = (error as LoginError)?.data?.message || 'Something went wrong!'
      snackbar.show(errorMessage, 'error')
      backdrop.hide()
    } else if (isSuccess) {
      const successMessage = data?.success?.message
      setProgress(successMessage)
      const tokenData = data?.data
      if (tokenData) {
        const accessToken = tokenData.accessToken
        const refreshToken = tokenData.refreshToken
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
      }
      setTimeout(() => {
        backdrop.hide()
      }, 800)
    }
  }, [isLoading, isError, error, isSuccess, data])

  return {
    login,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
