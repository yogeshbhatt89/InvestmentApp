import React from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import useDialog from './useDialog'

const DialogComponent = () => {
  const { isOpen, title, content, closeDialog } = useDialog()

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  )
}

export default DialogComponent
