/**
 *  @author: Razvan Rauta
 *  Date: Oct 15 2021
 *  Time: 10:17
 */

import { ISpecimen } from '@/types'
import { Card, CardHeader, Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

import RedListApi from '@/api/red-list-api'
import axios, { CancelToken } from 'axios'
import { useLocalStorage } from '@/hooks'
import ListLoader from '../ListLoader'
import SpecimenDetails from '../SpecimenDetails'

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

  const isMobile = useMediaQuery('(max-width:600px)')

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
    <ListLoader style={style} />
  ) : (
    <div style={style}>
      <Box
        sx={{
          maxWidth: 1000,
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
          <CardHeader
            title={specimen.scientific_name}
            subheader='Scientific Name'
            sx={{
              padding: isMobile ? '10px 10px 0' : '16px',
            }}
          />
          <SpecimenDetails
            isEndangered={isEndangered}
            loadingMeasurers={loadingMeasurers}
            specimen={specimen}
            conservationMeasurers={measurersData[specimen.taxonid]}
            isMobile={isMobile}
          />
        </Card>
      </Box>
    </div>
  )
}

export default RowComponent
