/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:15
 */

import { Box, Typography } from '@mui/material'
import { ListChildComponentProps, areEqual } from 'react-window'

import RowComponent from '../RowComponent'
import { memo } from 'react'

const Row = memo(({ data, index, style }: ListChildComponentProps) => {
  const { species, region, showCriticalEndangered } = data
  return species.length ? (
    <RowComponent
      specimen={species[index]}
      style={style}
      loading={species.length && index === species.length}
      region={region}
      isEndangered={showCriticalEndangered}
    />
  ) : (
    <Box
      style={style}
      sx={{
        width: '100%',
        height: '100%',
        p: '20px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>No results in this category 😓</Typography>
    </Box>
  )
}, areEqual)

export default Row
