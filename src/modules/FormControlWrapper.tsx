import React from 'react'
import { FormControl, FormControlProps } from '@mui/material'

interface FormControlWrapperProps extends FormControlProps {
  children: React.ReactNode
}

const FormControlWrapper: React.FC<FormControlWrapperProps> = ({ children, ...props }) => (
  <FormControl fullWidth margin="normal" {...props}>
    {children}
  </FormControl>
)

export default FormControlWrapper