import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

interface DropdownState {
  single: {
    [dropdownId: string]: string | number | null
  }
  multiple: {
    [dropdownId: string]: (string | number)[]
  }
}

const initialState: DropdownState = {
  single: {},
  multiple: {},
}

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    setSingleValue: (
      state,
      action: PayloadAction<{
        dropdownId: string
        value: string | number | null
      }>,
    ) => {
      const { dropdownId, value } = action.payload
      state.single[dropdownId] = value
    },
    setMultipleValues: (
      state,
      action: PayloadAction<{
        dropdownId: string
        values: (string | number)[]
      }>,
    ) => {
      const { dropdownId, values } = action.payload
      state.multiple[dropdownId] = values
    },
  },
})

export const { setSingleValue, setMultipleValues } = dropdownSlice.actions

// Base selectors
const selectSingleDropdowns = (state: RootState) => state.dropdown.single
const selectMultipleDropdowns = (state: RootState) => state.dropdown.multiple

// Memoized selectors
export const selectSingleValue = createSelector(
  [selectSingleDropdowns, (_state: RootState, dropdownId: string) => dropdownId],
  (singleDropdowns, dropdownId) => singleDropdowns[dropdownId] || null,
)

export const selectMultipleValues = createSelector(
  [selectMultipleDropdowns, (_state: RootState, dropdownId: string) => dropdownId],
  (multipleDropdowns, dropdownId) => multipleDropdowns[dropdownId] || [],
)

export const dropdownReducer = dropdownSlice.reducer
