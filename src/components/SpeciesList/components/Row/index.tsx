/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:15
 */

import { Box, Typography } from '@mui/material'
import { ListChildComponentProps, areEqual } from 'react-window'

import type { ISpecimen } from '@/types'
import RowComponent from '../RowComponent'
import { memo } from 'react'

const Row = memo(
  ({
    data,
    index,
    style,
  }: ListChildComponentProps<{
    species: ISpecimen[]
    region: string | undefined
    showCriticalEndangered?: boolean
    hasMoreResults: boolean
  }>) => {
    const { species, region, showCriticalEndangered, hasMoreResults } = data
    return species.length ? (
      <RowComponent
        specimen={species[index]}
        style={style}
        loading={
          hasMoreResults && species.length ? index === species.length : false
        }
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
  },
  areEqual
)

export default Row
