import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { updateButtonDisabled } from './ButtonSlice'
import { createSelector } from '@reduxjs/toolkit'

const selectButtonData = (state: RootState, buttonId: string) => state.button[buttonId]

const selectButtonState = createSelector([selectButtonData], buttonData => ({
  disabled: buttonData?.disabled ?? false,
  loading: buttonData?.loading ?? false,
}))

const useButton = (buttonId: string) => {
  const dispatch = useDispatch()
  const buttonState = useSelector((state: RootState) => selectButtonState(state, buttonId))

  const handleDisabledChange = (disabled: boolean) => {
    dispatch(updateButtonDisabled({ buttonId, disabled }))
  }

  return { buttonState, handleDisabledChange }
}

export default useButton
