import { useEffect } from 'react'
import { useRegisterMutation } from '../api'
import { useSnackbar } from '@/modules/Snackbar'
import { useBackdrop } from '@/modules/Backdrop/useBackdrop'
import { useApiCallTracker } from '@/services/useApiCallTracker'

interface RegisterError {
  data?: { message: string }
  status?: number
}

export const useRegister = () => {
  const snackbar = useSnackbar('global-snackbar')
  const backdrop = useBackdrop('global-backdrop')
  const { updateApiCallProgress, endApiCall } = useApiCallTracker({
    apiCallId: 'register',
    totalApiCalls: 1,
  })
  const [registerMutation, { isLoading, isError, error, isSuccess }] = useRegisterMutation()

  const register = (userData: {
    username: string
    email: string
    password: string
    fullName: string
  }) => {
    updateApiCallProgress(10, 'Preparing registration...')
    backdrop.show()
    registerMutation(userData).unwrap()
  }

  useEffect(() => {
    if (isLoading && !isSuccess) {
      updateApiCallProgress(50, 'Registering user...')
    }
    if (isError) {
      endApiCall('error', 'Registration failed!')
      const errorMessage = (error as RegisterError)?.data?.message || 'Something went wrong!'
      snackbar.show(errorMessage, 'error')
    } else if (isSuccess) {
      endApiCall('success', 'Registration successful!')
    }
  }, [isLoading, isError, error, isSuccess])

  useEffect(() => {
    if (!isLoading && !isError && !isSuccess) {
      updateApiCallProgress(0, '')
      backdrop.hide()
    }
  }, [isLoading, isError, isSuccess])

  return {
    register,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
