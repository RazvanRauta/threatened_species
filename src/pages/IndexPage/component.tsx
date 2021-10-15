import Loader from '@/components/Loader'
import RegionCard from '@/components/RegionCard'
import Snackbar from '@/components/Snackbar'
import { useAppSelector } from '@/hooks'
import { Grid } from '@mui/material'
import sortBy from 'lodash/sortBy'
import { useEffect, useState } from 'react'

interface Props {}

const IndexPageComponent = (props: Props) => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  const { status, error, regions } = useAppSelector((state) => state.regions)

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
              sortBy(regions, 'name').map(({ identifier, name }) => (
                <Grid key={identifier} item>
                  <RegionCard identifier={identifier} name={name} />
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
