import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { TableProps } from '@mui/material/Table'
import { useTable } from './useTable'

export type RenderRow = (_row: any) => React.ReactNode

export interface TableWrapperComponentProps extends TableProps {
  containerSx?: object
  className?: string
  renderRow: RenderRow
  data?: any[]
  enablePagination?: boolean
  rowsPerPage?: number
  /** When true, gridlines will be added to each cell */
  gridlines?: boolean
  /** When true, rows will highlight on hover */
  hoverHighlight?: boolean
}

const TableWrapperComponent: React.FC<TableWrapperComponentProps> = ({
  containerSx,
  className,
  renderRow,
  data: overrideData,
  enablePagination = false,
  rowsPerPage = 10,
  gridlines = false,
  hoverHighlight = true,
  ...tableProps
}) => {
  // Get data from redux or override.
  const { data } = useTable()
  const rows = overrideData ?? data

  // Local pagination state (0-indexed for TablePagination).
  const [page, setPage] = React.useState(0)
  const [localRowsPerPage, setLocalRowsPerPage] = React.useState(rowsPerPage)

  const totalRows = rows.length
  const displayedRows = enablePagination
    ? rows.slice(page * localRowsPerPage, page * localRowsPerPage + localRowsPerPage)
    : rows

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Optionally add gridlines to each cell by merging in a border style.
  const renderRowWithGridlines = (row: any) => {
    const cells = renderRow(row)
    return gridlines
      ? React.Children.map(cells, child => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<any>
          return React.cloneElement(element, {
            sx: { ...(element.props.sx || {}), border: '1px solid #ccc' },
          })
        }
        return child
      })
      : cells
  }


  return (
    <>
      <TableContainer className={className} sx={containerSx}>
        <Table {...tableProps}>
          <TableBody>
            {displayedRows && displayedRows.length > 0 ? (
              displayedRows.map((row: any, index: number) => (
                <TableRow key={index} hover={hoverHighlight}>
                  {renderRowWithGridlines(row)}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={100}
                  align="center"
                  sx={{
                    padding: '1rem',
                    ...(gridlines ? { border: '1px solid #ccc' } : {}),
                  }}
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {enablePagination && totalRows > 0 && (
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={localRowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </>
  )
}

export default TableWrapperComponent
