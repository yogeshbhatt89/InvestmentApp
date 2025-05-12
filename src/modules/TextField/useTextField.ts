import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { updateInputValue } from './InputFieldSlice'

export const useTextField = (field: string) => {
  const dispatch = useDispatch()
  const getTextFieldValue = useSelector((state: RootState) => state.textField[field] || '')

  const setTextFieldValue = (val: string) => {
    dispatch(updateInputValue({ field, value: val }))
  }

  return { getTextFieldValue, setTextFieldValue }
}
