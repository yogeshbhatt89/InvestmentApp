import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

export interface TableState<T = any> {
  data: T[]
}

const initialState: TableState = {
  data: [],
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload
    },
    clearTableData: state => {
      state.data = []
    },
  },
})

export const { setTableData, clearTableData } = tableSlice.actions

// Selector to access the table data from the store.
export const selectTableData = (state: RootState) => state.table.data
export const tableReducer = tableSlice.reducer
