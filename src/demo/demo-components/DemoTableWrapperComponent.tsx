import React from 'react'
import TableWrapperComponent, { useTable } from '@/modules/Table'
import ButtonComponent from '@/modules/Button'
import BoxComponent from '@/modules/BoxComponent'
import TypographyComponent from '@/modules/TypographyComponent'
import TableCell from '@mui/material/TableCell'

// Define a type for a demo row.
interface DemoRow {
  id: number
  name: string
  value: string
}

const DemoTableWrapperComponent: React.FC = () => {
  const { data, updateData, clearData } = useTable()

  // Handler that adds a new row to the table.
  const handleAddRow = () => {
    const newRow: DemoRow = {
      id: data.length + 1,
      name: `Row ${data.length + 1}`,
      value: `Value ${Math.floor(Math.random() * 100)}`,
    }
    updateData([...data, newRow])
  }

  // Handler to clear the table data.
  const handleClearTable = () => {
    clearData()
    // Any internal pagination state within TableWrapperComponent should reset accordingly.
  }

  return (
    <BoxComponent sx={{ p: 2 }}>
      <TypographyComponent variant="h5" gutterBottom>
        Demo Table Wrapper
      </TypographyComponent>

      {/* Buttons to add and clear rows */}
      <BoxComponent sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <ButtonComponent
          reduxId="add-row"
          label="Add Row"
          onClick={handleAddRow}
          variant="contained"
          color="primary"
        />
        <ButtonComponent
          reduxId="clear-table"
          label="Clear Table"
          onClick={handleClearTable}
          variant="outlined"
          color="secondary"
        />
      </BoxComponent>

      {/* Generic table wrapper that now handles pagination internally. */}
      <TableWrapperComponent
        hoverHighlight={true}
        gridlines={false}
        enablePagination={true}
        rowsPerPage={5}
        data={data} // pass complete data; TableWrapperComponent will paginate it.
        containerSx={{ border: '1px solid #ccc', borderRadius: 1 }}
        renderRow={(row: DemoRow) => (
          <>
            <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>{row.id}</TableCell>
            <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>{row.name}</TableCell>
            <TableCell sx={{ border: '1px solid #ccc', padding: '8px' }}>{row.value}</TableCell>
          </>
        )}
      />
    </BoxComponent>
  )
}

export default DemoTableWrapperComponent
