import { useDispatch, useSelector } from 'react-redux'
import {
  setSingleValue,
  setMultipleValues,
  selectSingleValue,
  selectMultipleValues,
} from './DropdownSlice'
import { RootState } from '@/app/store'

export const useDropdown = (dropdownId: string, isMultiple: boolean = false) => {
  if (!dropdownId) {
    throw new Error('useDropdown hook requires a dropdownId parameter')
  }

  const dispatch = useDispatch()

  const selectedValue = isMultiple
    ? useSelector((state: RootState) => selectMultipleValues(state, dropdownId))
    : useSelector((state: RootState) => selectSingleValue(state, dropdownId))

  const setValue = (value: string | number | (string | number)[] | null) => {
    if (isMultiple) {
      dispatch(
        setMultipleValues({
          dropdownId,
          values: Array.isArray(value) ? value : [],
        }),
      )
    } else {
      dispatch(
        setSingleValue({
          dropdownId,
          value: value as string | number | null,
        }),
      )
    }
  }

  return {
    selectedValue,
    setValue,
  }
}
