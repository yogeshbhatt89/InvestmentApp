import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { updateButtonDisabled /*, updateButtonLoading */ } from './ButtonSlice'

const useButton = (buttonId: string) => {
  const dispatch = useDispatch()
  const buttonState = useSelector((state: RootState) => state.button[buttonId]) || {
    disabled: false,
    loading: false,
  }

  const handleDisabledChange = (disabled: boolean) => {
    dispatch(updateButtonDisabled({ buttonId, disabled }))
  }

  // const handleLoadingChange = (loading: boolean) => {
  //   dispatch(updateButtonLoading({ buttonId, loading }))
  // }

  return { buttonState, handleDisabledChange /*, handleLoadingChange */ }
}

export default useButton
