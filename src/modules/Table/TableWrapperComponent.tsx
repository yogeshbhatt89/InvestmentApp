/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Table, { TableProps } from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useTable } from './useTable'

export interface TableWrapperComponentProps extends TableProps {
  containerSx?: object
  className?: string
  renderRow: (row: any) => React.ReactNode
  data?: any[]
}

const TableWrapperComponent: React.FC<TableWrapperComponentProps> = ({
  containerSx,
  className,
  renderRow,
  data: overrideData, // check if data is passed from parent
  ...tableProps
}) => {
  // Use provided data if available, otherwise use Redux state.
  const { data } = useTable()
  const rows = overrideData ?? data

  return (
    <TableContainer className={className} sx={{ ...containerSx }}>
      <Table {...tableProps}>
        <tbody>
          {rows && rows.length > 0 ? (
            rows.map((row: any) => renderRow(row))
          ) : (
            <tr>
              <td colSpan={100} style={{ textAlign: 'center', padding: '1rem' }}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default TableWrapperComponent
