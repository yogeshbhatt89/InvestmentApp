import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

interface TabState {
  [tabGroupId: string]: {
    activeTab: number
    disabled: boolean
  }
}

const initialState: TabState = {}

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<{ tabGroupId: string; activeTab: number }>) => {
      const { tabGroupId, activeTab } = action.payload
      if (!state[tabGroupId]) {
        state[tabGroupId] = { activeTab: 0, disabled: false }
      }
      state[tabGroupId].activeTab = activeTab
    },
    setTabDisabled: (state, action: PayloadAction<{ tabGroupId: string; disabled: boolean }>) => {
      const { tabGroupId, disabled } = action.payload
      if (!state[tabGroupId]) {
        state[tabGroupId] = { activeTab: 0, disabled: false }
      }
      state[tabGroupId].disabled = disabled
    },
  },
})

export const { setActiveTab, setTabDisabled } = tabSlice.actions

// Base selector
const selectTabGroups = (state: RootState) => state.tab

// Memoized selector
export const selectTabState = createSelector(
  [selectTabGroups, (_state: RootState, tabGroupId: string) => tabGroupId],
  (tabGroups, tabGroupId) => {
    if (!tabGroups[tabGroupId]) {
      return { activeTab: 0, disabled: false }
    }
    return tabGroups[tabGroupId]
  },
)

export const tabReducer = tabSlice.reducer
