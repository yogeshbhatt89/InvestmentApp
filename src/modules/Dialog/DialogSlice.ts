import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
interface DialogState {
  isOpen: boolean
  title: string
  content: React.ReactNode
}

const initialState: DialogState = {
  isOpen: false,
  title: '',
  content: null,
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog(state, action) {
      state.isOpen = true
      state.title = action.payload.title
      state.content = action.payload.content
    },
    closeDialog(state) {
      state.isOpen = false
    },
  },
})

export const { openDialog, closeDialog } = dialogSlice.actions
export const dialogReducer = dialogSlice.reducer
