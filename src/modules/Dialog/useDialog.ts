import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { openDialog, closeDialog } from './DialogSlice'

export interface DialogState {
  [reduxId: string]: {
    isOpen: boolean
    title: string
    content: React.ReactNode
  }
}

export const useDialog = (reduxId: string) => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.dialog[reduxId]?.isOpen ?? false)
  const title = useSelector((state: RootState) => state.dialog[reduxId]?.title ?? '')
  const content = useSelector((state: RootState) => state.dialog[reduxId]?.content ?? null)

  const handleOpenDialog = () => {
    dispatch(openDialog({ reduxId }))
  }

  const handleCloseDialog = () => {
    dispatch(closeDialog({ reduxId }))
  }

  return {
    isOpen,
    title,
    content,
    openDialog: handleOpenDialog,
    closeDialog: handleCloseDialog,
  }
}
