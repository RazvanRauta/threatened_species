/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import { useAppDispatch, useAppSelector } from '@/hooks'
import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import Loader from '@/components/Loader'
import Region from '@/models/region'
import RegionCard from '@/components/RegionCard'
import Snackbar from '@/components/Snackbar'
import { fetchRegionsAsync } from '@/store/red-list/regions/actions'
import sortBy from 'lodash/sortBy'

interface Props {}

const IndexPageComponent = (props: Props) => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  const { status, error, regions } = useAppSelector((state) => state.regions)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(fetchRegionsAsync())
    return () => {
      promise.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if ((status === 'failed' && error) || !!error) {
      setShowSnackbar(true)
    }
  }, [status, error])

  if (status === 'loading') {
    return <Loader />
  }

  return (
    <>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent='center' spacing={2}>
            {regions &&
              sortBy(regions, 'name').map((region: Region) => (
                <Grid key={region.identifier} item>
                  <RegionCard region={region} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        message={error ?? 'Unknown error occurred'}
        open={showSnackbar}
        setOpen={setShowSnackbar}
        severity='error'
      />
    </>
  )
}

export default IndexPageComponent
