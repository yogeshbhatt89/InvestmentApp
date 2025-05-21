import { useEffect } from 'react'
import { useLoginMutation } from '../api'
import { useSnackbar } from '@/modules/Snackbar'
import { useBackdrop } from '@/modules/Backdrop/useBackdrop'
import { useApiCallTracker } from '@/services/useApiCallTracker'

interface LoginError {
  data?: { message: string }
  status?: number
}

export const useLogin = () => {
  const snackbar = useSnackbar('global-snackbar')
  const backdrop = useBackdrop('global-backdrop')
  const { updateApiCallProgress, endApiCall, startApiCall } = useApiCallTracker({
    apiCallId: 'login',
    totalApiCalls: 1,
  })
  const [loginMutation, { isLoading, isError, error, isSuccess }] = useLoginMutation()

  const login = (userData: { email: string; password: string }) => {
    startApiCall()
    updateApiCallProgress(10, 'Preparing login...')
    backdrop.show()
    loginMutation(userData).unwrap()
  }

  useEffect(() => {
    if (isLoading) {
      updateApiCallProgress(50, 'Logging in...')
    }
    if (isError) {
      endApiCall('error', 'Login failed!')
      const errorMessage = (error as LoginError)?.data?.message || 'Something went wrong!'
      snackbar.show(errorMessage, 'error')
    } else if (isSuccess) {
      endApiCall('success', 'Login successful!')

      setTimeout(() => {
        backdrop.hide()
      }, 800)
    }
  }, [isLoading, isError, error, isSuccess])

  useEffect(() => {
    if (!isLoading && !isError && !isSuccess) {
      updateApiCallProgress(0, '')
      backdrop.hide()
    }
  }, [isLoading, isError, isSuccess])

  return {
    login,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
