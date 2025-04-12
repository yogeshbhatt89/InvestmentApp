import { Button } from '@mui/material';
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  fullWidth?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'contained',
  fullWidth = true,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
