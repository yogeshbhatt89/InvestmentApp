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
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#90caf9',
            },
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
        },
      },
    },
  },
})

export default theme
