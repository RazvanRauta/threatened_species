/**
 *  @author: Razvan Rauta
 *  Date: Oct 15 2021
 *  Time: 10:17
 */

import { ISpecimen } from '@/types'
import {
  Card,
  CardHeader,
  Box,
  useMediaQuery,
  IconButton,
  CircularProgress,
  Theme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import VisibilityIcon from '@mui/icons-material/Visibility'

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
  const [isLoadingName, setIsLoadingName] = useState(false)

  const [measurers, setMeasurers] = useLocalStorage<string>(
    `ConservationMeasurers`,
    '{}'
  )
  const [commonNames, setCommonNames] = useLocalStorage<string>(
    `CommonNames`,
    '{}'
  )

  const measurersData = JSON.parse(measurers)
  const commonNamesData = JSON.parse(commonNames)

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
    if (specimen && !commonNamesData[specimen.taxonid]) {
      loadCommonName(source.token)
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

  const loadCommonName = async (cancelToken: CancelToken) => {
    const defaultName = 'Scientific name only'
    if (specimen) {
      setIsLoadingName(true)
      const redListApi = new RedListApi()
      try {
        const { data } = await redListApi.getCommonNameByName(
          specimen.scientific_name,
          cancelToken
        )
        if (data) {
          const { result } = data
          const nameData = isEmpty(result) ? defaultName : result[0]?.taxonname

          setCommonNames(
            JSON.stringify({
              ...commonNamesData,
              [specimen.taxonid]: nameData,
            })
          )
        } else {
          setCommonNames(
            JSON.stringify({
              ...commonNamesData,
              [specimen.taxonid]: defaultName,
            })
          )
        }
      } catch (err: any) {
        console.log(err.message)
        setCommonNames(
          JSON.stringify({
            ...commonNamesData,
            [specimen.taxonid]: defaultName,
          })
        )
      } finally {
        setIsLoadingName(false)
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
          height: '100%',
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
            height: '100%',
            '@media screen and (max-width: 480px)': {
              width: 320,
            },
          }}
        >
          <CardHeader
            title={specimen.scientific_name}
            subheader={
              isLoadingName ? (
                <CircularProgress
                  size='20px'
                  color='secondary'
                  sx={{
                    marginLeft: '10px',
                    marginTop: '5px',
                  }}
                />
              ) : (
                commonNamesData[specimen.taxonid]
              )
            }
            sx={{
              padding: isMobile ? '15px 5px 0 15px' : '16px',
            }}
            action={
              <IconButton
                aria-label='settings'
                title='See More Details'
                color='secondary'
                target='_blank'
                href={`${process.env.REACT_APP_API_URL}/taxonredirect/${specimen.taxonid}`}
              >
                <VisibilityIcon />
              </IconButton>
            }
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
