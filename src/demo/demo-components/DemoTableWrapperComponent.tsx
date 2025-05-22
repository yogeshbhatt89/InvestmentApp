import React, { useState } from 'react'
import TableWrapperComponent, { useTable } from '@/modules/Table'
import ButtonComponent from '@/modules/Button'
import BoxComponent from '@/modules/BoxComponent'
import TypographyComponent from '@/modules/TypographyComponent'
import Pagination from '@mui/material/Pagination'

// Define a type for a demo row.
interface DemoRow {
  id: number
  name: string
  value: string
}

const DemoTableWrapperComponent: React.FC = () => {
  const { data, updateData, clearData } = useTable()
  const [page, setPage] = useState(1)
  const rowsPerPage = 5

  // Calculate the data to display on the current page.
  const paginatedData: DemoRow[] = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)

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
    setPage(1) // reset to first page if needed
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

      {/* The generic table wrapper; pass in paginated data */}
      <TableWrapperComponent
        data={paginatedData}
        containerSx={{ border: '1px solid #ccc', borderRadius: 1 }}
        renderRow={(row: DemoRow) => (
          <tr key={row.id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.id}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.name}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.value}</td>
          </tr>
        )}
      />

      {/* Pagination component (shown only if there's more than one page) */}
      {data.length > rowsPerPage && (
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={(_event, newPage) => setPage(newPage)}
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </BoxComponent>
  )
}

export default DemoTableWrapperComponent
