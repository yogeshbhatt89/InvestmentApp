// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from '@/app/store'
// import { useLinearProgress } from '@/modules/LinearProgress'
// import { apiCallTrackerActions } from './apiCallTrackerSlice'

// interface ApiCallTrackerProps {
//   apiCallId: string
// }

// interface ApiCall {
//   status: 'pending' | 'success' | 'error' | 'idle'
//   progress: number
// }

// interface ApiCalls {
//   [apiCallId: string]: ApiCall
// }

// export const useApiCallTracker = (props: ApiCallTrackerProps) => {
//   const { apiCallId } = props
//   const dispatch = useDispatch()
//   const { setProgress, linearProgress } = useLinearProgress('global-progress')

//   // Select the API calls from Redux state.
//   const apiCalls = useSelector((state: RootState) => state.apiCallTracker.apiCalls)

//   // Initialize the API call if it doesn't exist.
//   useEffect(() => {
//     if (!apiCalls[apiCallId]) {
//       dispatch(apiCallTrackerActions.initializeApiCall({ apiCallId }))
//     }
//   }, [apiCallId, apiCalls, dispatch])

//   // Only recalculate global progress if the current call is still pending,
//   // and only update message if there's not already one set.
//   useEffect(() => {
//     const currentCall = apiCalls[apiCallId]
//     if (currentCall && currentCall.status === 'pending') {
//       const totalProgress = calculateTotalProgress(apiCalls)
//       // Only override if there's no message already.
//       setProgress(totalProgress, linearProgress.message || '')
//     }
//   }, [apiCalls, apiCallId, linearProgress.message])

//   const startApiCall = () => {
//     dispatch(apiCallTrackerActions.startApiCall({ apiCallId }))
//   }

//   const updateApiCallProgress = (progress: number, message: string) => {
//     // Update the progress for this specific API call.
//     dispatch(apiCallTrackerActions.updateApiCallProgress({ apiCallId, progress }))

//     const currentCall = apiCalls[apiCallId] || { progress: 0, status: 'pending' }
//     const updatedApiCalls: ApiCalls = {
//       ...apiCalls,
//       [apiCallId]: { ...currentCall, progress },
//     }
//     const updatedTotalProgress = calculateTotalProgress(updatedApiCalls)
//     setProgress(updatedTotalProgress, message)
//   }

//   const endApiCall = (status: 'success' | 'error', message: string) => {
//     dispatch(apiCallTrackerActions.updateApiCallStatus({ apiCallId, status }))

//     if (status === 'success') {
//       // Update progress to 100%
//       dispatch(apiCallTrackerActions.updateApiCallProgress({ apiCallId, progress: 100 }))
//       setProgress(100, message)

//       // After a short delay, reset the API call to idle and reset progress to 0.
//       setTimeout(() => {
//         dispatch(apiCallTrackerActions.resetApiCallProgress({ apiCallId }))
//         setProgress(0, '')
//       }, 1500)
//     } else {
//       // For error state, immediately reset.
//       dispatch(apiCallTrackerActions.resetApiCallProgress({ apiCallId }))
//       const updatedApiCalls: ApiCalls = {
//         ...apiCalls,
//         [apiCallId]: { progress: 0, status: 'idle' },
//       }
//       const updatedTotalProgress = calculateTotalProgress(updatedApiCalls)
//       setProgress(updatedTotalProgress, message)
//     }
//   }

//   // Aggregator: only averages "pending" calls and resets to 0 if none are active.
//   const calculateTotalProgress = (apiCalls: ApiCalls): number => {
//     const apiCallList = Object.values(apiCalls)
//     if (apiCallList.length === 0) return 0

//     // Filter only the active (pending) API calls.
//     const pendingCalls = apiCallList.filter(call => call.status === 'pending')
//     if (pendingCalls.length === 0) return 0

//     const total = pendingCalls.reduce((acc, call) => acc + call.progress, 0)
//     return total / pendingCalls.length
//   }

//   return { startApiCall, updateApiCallProgress, endApiCall }
// }
