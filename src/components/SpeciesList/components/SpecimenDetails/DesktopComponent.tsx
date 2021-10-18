/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 19:20
 */

import { Box, CardContent, CircularProgress, Typography } from '@mui/material'

import Paper from '@mui/material/Paper'
import type { SpecimenDetailsProps } from './index'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

interface Props extends SpecimenDetailsProps {}

const DesktopComponent = ({
  isEndangered,
  loadingMeasurers,
  specimen,
}: Props) => {
  return (
    <CardContent>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>Kingdom</TableCell>
              <TableCell align='right'>Phylum</TableCell>
              <TableCell align='right'>Class</TableCell>
              <TableCell align='right'>Order</TableCell>
              <TableCell align='right'>Category</TableCell>
              <TableCell align='right'>Family</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='right'>{specimen.kingdom_name}</TableCell>
              <TableCell align='right'>{specimen.phylum_name}</TableCell>
              <TableCell align='right'>{specimen.class_name}</TableCell>
              <TableCell align='right'>{specimen.order_name}</TableCell>
              <TableCell align='right'>{specimen.category}</TableCell>
              <TableCell align='right'>{specimen.family_name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {isEndangered && (
        <Box py='5px'>
          <Typography variant='h6' gutterBottom>
            Conservation Measures:
          </Typography>
          {loadingMeasurers ? (
            <CircularProgress />
          ) : (
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {specimen.conservation_measures}
            </Typography>
          )}
        </Box>
      )}
    </CardContent>
  )
}

export default DesktopComponent
