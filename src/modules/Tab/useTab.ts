import { useSelector, useDispatch } from 'react-redux'
import { setActiveTab, setTabDisabled, selectTabState } from './TabSlice'
import { RootState } from '@/app/store'

export const useTab = (tabGroupId: string) => {
  if (!tabGroupId) {
    throw new Error('useTab hook requires a tabGroupId parameter')
  }

  const dispatch = useDispatch()
  const tabState = useSelector((state: RootState) => selectTabState(state, tabGroupId))

  const setTab = (index: number) => {
    dispatch(setActiveTab({ tabGroupId, activeTab: index }))
  }

  const setDisabled = (disabled: boolean) => {
    dispatch(setTabDisabled({ tabGroupId, disabled }))
  }

  return {
    activeTab: tabState.activeTab,
    disabled: tabState.disabled,
    setTab,
    setDisabled,
  }
}
