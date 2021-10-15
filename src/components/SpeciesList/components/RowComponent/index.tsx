/**
 *  @author: Razvan Rauta
 *  Date: Oct 15 2021
 *  Time: 10:17
 */

import { ISpecimen } from '@/types'
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

import RedListApi from '@/api/red-list-api'
import axios, { CancelToken } from 'axios'
import { useLocalStorage } from '@/hooks'

const Loader = ({ style }: { style: React.CSSProperties }) => (
  <div style={style}>
    <Box
      sx={{
        maxWidth: 400,
        marginRight: 'auto',
        marginLeft: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size='50px' />
    </Box>
  </div>
)

interface RowComponentProps {
  style: React.CSSProperties
  specimen: ISpecimen
  loading: boolean
  region?: string
  isEndangered: boolean
}

const RowComponent = ({
  style,
  specimen,
  loading,
  region,
  isEndangered,
}: RowComponentProps) => {
  const [loadingMeasurers, setLoadingMeasurers] = useState(false)
  const [measurers, setMeasurers] = useLocalStorage<string>(
    `ConservationMeasurers`,
    '{}'
  )
  const measurersData = JSON.parse(measurers)

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    if (
      specimen &&
      isEndangered &&
      !measurersData[specimen.taxonid] &&
      region
    ) {
      loadConservationMeasurers(source.token)
    }
    return () => {
      source.cancel(
        `Item ${
          specimen ? specimen.taxonid : 'N/A'
        } is unmounting. Request to fetch Conservation Measurers was canceled`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specimen])

  const loadConservationMeasurers = async (cancelToken: CancelToken) => {
    const defaultMeasures = 'No data available'
    if (region && specimen) {
      setLoadingMeasurers(true)
      const redListApi = new RedListApi()
      try {
        const { data } = await redListApi.getConservationMeasuresByIdAndRegion(
          specimen.taxonid,
          region,
          cancelToken
        )
        if (data) {
          const { result } = data
          const measurersDatum = isEmpty(result)
            ? defaultMeasures
            : result.map((mes) => mes.title).join(', ')

          setMeasurers(
            JSON.stringify({
              ...measurersData,
              [specimen.taxonid]: measurersDatum,
            })
          )
        } else {
          setMeasurers(
            JSON.stringify({
              ...measurersData,
              [specimen.taxonid]: defaultMeasures,
            })
          )
        }
      } catch (err: any) {
        console.log(err.message)
        setMeasurers(
          JSON.stringify({
            ...measurersData,
            [specimen.taxonid]: defaultMeasures,
          })
        )
      } finally {
        setLoadingMeasurers(false)
      }
    }
  }

  return loading ? (
    <Loader style={style} />
  ) : (
    <div style={style}>
      <Box
        sx={{
          maxWidth: 1100,
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          variant='elevation'
          elevation={5}
          sx={{
            width: '100%',
            '@media screen and (max-width: 480px)': {
              width: 300,
            },
          }}
        >
          <CardHeader title={specimen.scientific_name} />
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'>Taxonid</TableCell>
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
                    <TableCell align='right'>{specimen.taxonid}</TableCell>
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
                    {measurersData[specimen.taxonid]}
                  </Typography>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default RowComponent
