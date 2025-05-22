import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { setTableData, clearTableData, selectTableData } from './TableSlice'

export const useTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => selectTableData(state))

  const updateData = (newData: any[]) => {
    dispatch(setTableData(newData))
  }

  const clearData = () => {
    dispatch(clearTableData())
  }

  return { data, updateData, clearData }
}
