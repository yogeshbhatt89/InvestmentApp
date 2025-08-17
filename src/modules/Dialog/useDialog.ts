import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { openDialog, closeDialog } from './DialogSlice'

const useDialog = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.dialog.isOpen)
  const title = useSelector((state: RootState) => state.dialog.title)
  const content = useSelector((state: RootState) => state.dialog.content)

  const handleOpenDialog = (title: string, content: React.ReactNode) => {
    dispatch(openDialog({ title, content }))
  }

  const handleCloseDialog = () => {
    dispatch(closeDialog())
  }

  return {
    isOpen,
    title,
    content,
    openDialog: handleOpenDialog,
    closeDialog: handleCloseDialog,
  }
}

export default useDialog
