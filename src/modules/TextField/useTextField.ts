import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { updateInputValue, clearInputValue, selectInputValue } from './InputFieldSlice'

export const useTextField = (field: string) => {
  if (!field) {
    throw new Error('useTextField hook requires a field parameter')
  }

  const dispatch = useDispatch()

  const getTextFieldValue = useSelector((state: RootState) => selectInputValue(state, field))

  const setTextFieldValue = (value: string | number) => {
    dispatch(updateInputValue({ field, value }))
  }

  const clearValue = () => {
    dispatch(clearInputValue(field))
  }

  const isEmpty = getTextFieldValue.trim() === ''

  return {
    getTextFieldValue,
    setTextFieldValue,
    clearValue,
    isEmpty,
  }
}

// Type for the hook return value
export type UseTextFieldReturn = ReturnType<typeof useTextField>
