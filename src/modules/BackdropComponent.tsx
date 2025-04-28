/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const useBackdrop = () => {
  const [open, setOpen] = useState(false);

  const showBackdrop = () => setOpen(true);
  const hideBackdrop = () => setOpen(false);

  return { open, showBackdrop, hideBackdrop };
};

interface BackdropComponentProps {
  open: boolean;
}

const BackdropComponent: React.FC<BackdropComponentProps> = ({ open }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropComponent;
