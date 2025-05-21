import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          minWidth: '160px',
          '& .MuiOutlinedInput-root': {
            height: '40px',
            '&:hover fieldset': {
              borderColor: '#90caf9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, -8px) scale(0.75)',
            '&[data-shrink="false"]': {
              transform: 'translate(14px, 8px) scale(1)',
            },
          },
          '&.MuiTextField-sizeSmall .MuiOutlinedInput-root': {
            height: '32px',
            minWidth: '140px',
          },
          '&.MuiTextField-sizeMedium .MuiOutlinedInput-root': {
            height: '40px',
            minWidth: '160px',
          },
          '&.MuiTextField-sizeLarge .MuiOutlinedInput-root': {
            height: '48px',
            minWidth: '180px',
          },
          '& .MuiFormHelperText-root': {
            marginTop: '4px',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: '160px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          '&.MuiButton-sizeSmall': {
            minWidth: '128px',
            height: '36px',
          },
          '&.MuiButton-sizeLarge': {
            minWidth: '192px',
            height: '52px',
          },
        },
      },
    },
  MuiBackdrop: {
    defaultProps: {
      invisible: false,
    },
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjusted opacity from 0.7 to 0.5
        backdropFilter: 'blur(2px)',
        transition: 'opacity 0.3s ease-in-out',
      },
    },
  },
    MuiCircularProgress: {
      defaultProps: {
        size: 40,
        thickness: 4,
      },
    },
  },
})

export default theme
