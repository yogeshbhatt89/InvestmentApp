import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

// Styled component for Grid items
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary, // Removed theme.vars
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', // Dark mode background
}))

interface GridComponentProps {
  data: string[] // Data to be displayed in the grid
}

const GridComponent: React.FC<GridComponentProps> = ({ data }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Ensure Grid container and item props are used correctly */}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((item, index) => (
          <Grid size={{ xs: 2, sm: 4, md: 7 }} key={index} component="div">
            <Item>{item}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default GridComponent
