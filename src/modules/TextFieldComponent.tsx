// src/modules/TextFieldComponent.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface TextFieldComponentProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  error?: boolean;
  helperText?: string;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  label,
  value,
  onChange,
  name,
  type = 'text',
  error = false,
  helperText = '',
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      error={error}
      helperText={helperText}
      fullWidth
    />
  );
};

export default TextFieldComponent;
