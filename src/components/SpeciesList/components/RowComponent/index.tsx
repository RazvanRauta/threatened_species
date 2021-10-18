/**
 *  @author: Razvan Rauta
 *  Date: Oct 15 2021
 *  Time: 10:17
 */

import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import React, { useEffect } from 'react'
import {
  fetchCommonNameAsync,
  fetchConservationMeasurersAsync,
} from '@/store/red-list/species/actions'

import { ISpecimen } from '@/types'
import ListLoader from '../ListLoader'
import SpecimenDetails from '../SpecimenDetails'
import VisibilityIcon from '@mui/icons-material/Visibility'
import axios from 'axios'
import { useAppDispatch } from '@/hooks'

interface RowComponentProps {
  style: React.CSSProperties
  specimen: ISpecimen
  loading: boolean
  region?: string
  isEndangered?: boolean
}

const RowComponent = ({
  style,
  specimen,
  loading,
  region,
  isEndangered,
}: RowComponentProps) => {
  const dispatch = useAppDispatch()

  const isMobile = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    if (specimen && isEndangered && !specimen.conservation_measures && region) {
      dispatch(
        fetchConservationMeasurersAsync({
          taxonid: specimen.taxonid,
          region,
          cancelToken: source.token,
        })
      )
    }
    if (specimen && !specimen.common_name && region) {
      dispatch(
        fetchCommonNameAsync({
          scientificName: specimen.scientific_name,
          region,
          taxonid: specimen.taxonid,
          cancelToken: source.token,
        })
      )
    }
    return () => {
      source.cancel(
        `Item ${
          specimen ? specimen.taxonid : 'N/A'
        } is unmounting. Requests to fetch extra details were canceled was canceled`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              specimen.common_name_status === 'loading' ? (
                <CircularProgress
                  size='20px'
                  color='secondary'
                  sx={{
                    marginLeft: '10px',
                    marginTop: '5px',
                  }}
                />
              ) : (
                specimen.common_name
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
            loadingMeasurers={
              specimen.conservation_measures_status === 'loading'
            }
            specimen={specimen}
            isMobile={isMobile}
          />
        </Card>
      </Box>
    </div>
  )
}

export default RowComponent
