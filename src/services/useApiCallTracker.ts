import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { useLinearProgress } from '@/modules/LinearProgress'
import { apiCallTrackerActions } from './apiCallTrackerSlice'

interface ApiCallTrackerProps {
  apiCallId: string
  totalApiCalls: number
}
interface ApiCall {
  status: 'pending' | 'success' | 'error' | 'idle'
  progress: number
}

interface ApiCalls {
  [apiCallId: string]: ApiCall
}
export const useApiCallTracker = (props: ApiCallTrackerProps) => {
  const { apiCallId, totalApiCalls } = props
  const dispatch = useDispatch()
  const { setProgress } = useLinearProgress('global-progress')
  const apiCalls = useSelector(
    (state: RootState) =>
      state.apiCallTracker.apiCalls || { [apiCallId]: { status: 'pending', progress: 0 } },
  )

  useEffect(() => {
    if (!apiCalls[apiCallId]) {
      dispatch(apiCallTrackerActions.initializeApiCall({ apiCallId }))
    }
  }, [apiCallId, apiCalls, dispatch])

  const startApiCall = () => {
    dispatch(apiCallTrackerActions.startApiCall({ apiCallId }))
  }

  const updateApiCallProgress = (progress: number, message: string) => {
    dispatch(apiCallTrackerActions.updateApiCallProgress({ apiCallId, progress }))
    const totalProgress = calculateTotalProgress(apiCalls, totalApiCalls)
    setProgress(totalProgress, message)
  }

  const endApiCall = (status: 'success' | 'error', message: string) => {
    dispatch(apiCallTrackerActions.updateApiCallStatus({ apiCallId, status }))
    if (status === 'success') {
      dispatch(apiCallTrackerActions.updateApiCallProgress({ apiCallId, progress: 100 }))
    } else {
      dispatch(apiCallTrackerActions.resetApiCallProgress(apiCallId))
    }
    const totalProgress = calculateTotalProgress(apiCalls, totalApiCalls)
    setProgress(totalProgress, message)
  }

  const calculateTotalProgress = (apiCalls: ApiCalls, totalApiCalls: number) => {
    if (Object.keys(apiCalls).length === 1) {
      const apiCall = Object.values(apiCalls)[0]
      if (apiCall.status === 'success') {
        console.log('apiCall.status', apiCall.status)
        return 100
      } else if (apiCall.status === 'pending') {
        console.log('apiCall.status', apiCall.status)
        return apiCall.progress
      } else if (apiCall.status === 'idle') {
        console.log('apiCall.status', apiCall.status)
        return apiCall.progress
      } else {
        return 0
      }
    } else {
      const totalProgress =
        Object.values(apiCalls).reduce((acc, call: ApiCall) => {
          if (call.status === 'success') {
            return acc + 100
          } else if (call.status === 'pending') {
            return acc + call.progress
          } else if (call.status === 'idle') {
            return acc
          } else {
            return acc
          }
        }, 0) / totalApiCalls
      return totalProgress
    }
  }

  return { startApiCall, updateApiCallProgress, endApiCall }
}
