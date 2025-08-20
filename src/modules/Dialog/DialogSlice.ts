import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

interface DialogState {
  [reduxId: string]: {
    isOpen: boolean
    title: string
    content: React.ReactNode
  }
}

const initialState: DialogState = {}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog(state, action) {
      const { reduxId } = action.payload
      if (!state[reduxId]) {
        state[reduxId] = {
          isOpen: true,
          title: '',
          content: null,
        }
      } else {
        state[reduxId].isOpen = true
      }
    },
    closeDialog(state, action) {
      const { reduxId } = action.payload
      if (!state[reduxId]) {
        state[reduxId] = {
          isOpen: false,
          title: '',
          content: null,
        }
      } else {
        state[reduxId].isOpen = false
      }
    },
  },
})

export const { openDialog, closeDialog } = dialogSlice.actions
export const dialogReducer = dialogSlice.reducer
