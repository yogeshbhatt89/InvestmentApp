/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Button } from "@mui/material";

// Custom hook to handle button clicks
export const useButton = () => {
  const handleClick = (callback?: () => void) => () => {
    if (callback) {
      callback();
    }
  };

  return { handleClick };
};

// Define the props for the ButtonComponent
interface ButtonProps {
  label: string; // The label for the button
  onClick?: () => void; // The click handler
  type?: "button" | "submit" | "reset"; // Type for the button
  variant?: "text" | "outlined" | "contained"; // Variant type for the button
  fullWidth?: boolean; // Option to make the button full wi
  className: string;
  disabled?: boolean; // Disabled state for the button
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "contained",
  fullWidth = true,
  disabled = false,
  className // Default to false
}) => {
  const { handleClick } = useButton();

  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={handleClick(onClick)}
      disabled={disabled}
      className={className}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
